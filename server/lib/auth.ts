import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'Malik-jwt-secret-change-in-production-2026';
const JWT_EXPIRY = '8h';
const BCRYPT_ROUNDS = 12;

/** Hash a plain-text password */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

/** Verify a plain password against a bcrypt hash */
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  // Support legacy plain-text passwords during migration
  if (!hash.startsWith('$2')) {
    return plain === hash;
  }
  return bcrypt.compare(plain, hash);
}

/** Sign a JWT for the admin session */
export function signToken(username: string): string {
  return jwt.sign({ sub: username, role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

/** Verify and decode a JWT; returns null if invalid */
export function verifyToken(token: string): { sub: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
  } catch {
    return null;
  }
}

/** Extract Bearer token from Authorization header */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

/** Validate that a password meets minimum requirements */
export function validatePasswordStrength(password: string): string | null {
  if (!password || password.trim().length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return null;
}

