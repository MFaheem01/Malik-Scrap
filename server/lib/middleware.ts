import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractBearerToken } from './auth';

/** Rate-limiter: simple in-memory store (suitable for single-process) */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Rate-limit helper: returns a 429 response if the caller exceeds `maxRequests`
 * within `windowMs` ms. Returns null if the request is allowed.
 */
export function rateLimit(
  req: NextRequest,
  maxRequests: number = 20,
  windowMs: number = 60_000
): NextResponse | null {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
  const key = `${req.nextUrl.pathname}:${ip}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count += 1;

  if (entry.count > maxRequests) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } }
    );
  }

  return null;
}

/**
 * Auth middleware: verifies the JWT Bearer token from the Authorization header.
 * Returns a 401 response if the token is missing or invalid.
 */
export function requireAuth(req: NextRequest): NextResponse | null {
  const token = extractBearerToken(req.headers.get('authorization'));
  if (!token) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'Invalid or expired session.' }, { status: 401 });
  }
  return null;
}

/** Standard CORS/security headers for API responses */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
};

/**
 * Sanitize a string by trimming and stripping HTML tags to prevent XSS.
 * Not a full XSS solution — use a proper library for rich text if needed.
 */
export function sanitizeString(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/<[^>]*>/g, '');
}

