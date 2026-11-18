import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { verifyPassword, signToken } from '@/server/lib/auth';
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

    if (!db.admin?.username || !db.admin?.password) {
      return NextResponse.json(
        { success: false, message: 'Admin account not configured. Please contact support.' },
        { status: 500, headers: securityHeaders }
      );
    }

    const trimmedUser = username.trim().toLowerCase();
    const currentAdminUser = (db.admin.username || 'admin').trim().toLowerCase();

    // Match only against the stored admin username
    const userMatch = trimmedUser === currentAdminUser;

    let passwordMatch = false;

    // Check stored password hash
    if (db.admin.password) {
      try {
        passwordMatch = await verifyPassword(password, db.admin.password);
      } catch {
        passwordMatch = false;
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
