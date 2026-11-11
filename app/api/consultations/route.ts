import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders, sanitizeString } from '@/server/lib/middleware';
import { sendLeadNotifications } from '@/server/lib/email';

export const dynamic = 'force-dynamic';

/** GET /api/consultations — protected (admin only) */
export async function GET(req: NextRequest) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  const db = await readDb();
  return NextResponse.json(db.consultations ?? [], { headers: securityHeaders });
}

/** POST /api/consultations — public (form submission) */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 10, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email);
    const phone = sanitizeString(body.phone ?? '');
    const subject = sanitizeString(body.subject ?? 'Sell Scrap Metal Inquiry');
    const message = sanitizeString(body.message ?? '');

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const db = await readDb();
    const newLead = {
      id: 'lead-' + Date.now(),
      name,
      email,
      phone,
      subject,
      message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New' as const,
    };

    if (!db.consultations) db.consultations = [];
    db.consultations.unshift(newLead);
    await writeDb(db);

    // Send NodeMailer notifications to oyit8t@gmail.com and the client
    sendLeadNotifications(newLead).catch((err) => {
      console.warn('[NodeMailer] Background email notification failed:', err);
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201, headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: securityHeaders });
  }
}
