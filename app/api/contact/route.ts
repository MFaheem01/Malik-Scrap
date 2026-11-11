import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders } from '@/server/lib/middleware';

export const dynamic = 'force-dynamic';

/** GET /api/contact — public */
export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.contact, { headers: securityHeaders });
}

/** PUT /api/contact — protected */
export async function PUT(req: NextRequest) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const db = await readDb();

    // Allow partial updates — merge allowed fields
    const allowedFields = [
      'companyName', 'tagline', 'phone', 'dispatchPhone',
      'email', 'secondaryEmail', 'address', 'city', 'state',
      'zip', 'country', 'hoursWeekday', 'hoursSaturday',
      'hoursSunday', 'googleMapsUrl', 'emergencyHotline', 'social',
    ] as const;

    const update: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in body) update[field] = body[field];
    }

    db.contact = { ...db.contact, ...update } as typeof db.contact;
    await writeDb(db);

    return NextResponse.json({ success: true, contact: db.contact }, { headers: securityHeaders });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400, headers: securityHeaders }
    );
  }
}
