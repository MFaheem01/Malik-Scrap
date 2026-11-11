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
  const limited = rateLimit(req, 10, 60_000);
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

    // Migrate plain-text password to bcrypt on first login
    let storedPassword = db.admin.password;
    if (!db.admin.isHashed) {
      const hashed = await hashPassword(storedPassword);
      db.admin.password = hashed;
      db.admin.isHashed = true;
      await writeDb(db);
      storedPassword = hashed;
    }

    const isValid =
      username.trim() === db.admin.username &&
      (await verifyPassword(password, storedPassword));

    if (!isValid) {
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401, headers: securityHeaders }
      );
    }

    const token = signToken(db.admin.username);
    return NextResponse.json(
      { success: true, token, username: db.admin.username },
      { headers: securityHeaders }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500, headers: securityHeaders }
    );
  }
}
