import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders } from '@/server/lib/middleware';

type Params = { params: Promise<{ id: string }> };

const VALID_STATUSES = ['New', 'In Progress', 'Scheduled', 'Completed'] as const;

/** PUT /api/consultations/[id] — protected (update status) */
export async function PUT(req: NextRequest, { params }: Params) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body ?? {};

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${VALID_STATUSES.join(', ')}.` },
        { status: 400, headers: securityHeaders }
      );
    }

    const db = await readDb();
    if (!db.consultations) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404, headers: securityHeaders });
    }

    const lead = db.consultations.find((c) => c.id === id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404, headers: securityHeaders });
    }

    lead.status = status;
    await writeDb(db);

    return NextResponse.json({ success: true, lead }, { headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400, headers: securityHeaders });
  }
}
