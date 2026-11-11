import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { verifyPassword, hashPassword, validatePasswordStrength } from '@/server/lib/auth';
import { requireAuth, rateLimit, securityHeaders, sanitizeString } from '@/server/lib/middleware';

/**
 * POST /api/auth/update-credentials
 * Requires Bearer token.
 * Body: { currentPassword: string; newUsername?: string; newPassword?: string }
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 5, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { currentPassword, newUsername, newPassword } = body ?? {};

    if (!currentPassword) {
      return NextResponse.json(
        { success: false, message: 'Current password is required for verification.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const db = await readDb();

    const passwordValid = await verifyPassword(currentPassword, db.admin.password);
    if (!passwordValid) {
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json(
        { success: false, message: 'Current password does not match.' },
        { status: 401, headers: securityHeaders }
      );
    }

    if (newUsername && typeof newUsername === 'string') {
      const clean = sanitizeString(newUsername);
      if (clean.length < 3) {
        return NextResponse.json(
          { success: false, message: 'Username must be at least 3 characters.' },
          { status: 400, headers: securityHeaders }
        );
      }
      db.admin.username = clean;
    }

    if (newPassword && typeof newPassword === 'string') {
      const strengthError = validatePasswordStrength(newPassword);
      if (strengthError) {
        return NextResponse.json(
          { success: false, message: strengthError },
          { status: 400, headers: securityHeaders }
        );
      }
      db.admin.password = await hashPassword(newPassword);
      db.admin.isHashed = true;
    }

    await writeDb(db);

    return NextResponse.json(
      { success: true, message: 'Credentials updated successfully.', username: db.admin.username },
      { headers: securityHeaders }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again.' },
      { status: 500, headers: securityHeaders }
    );
  }
}
