import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders } from '@/server/lib/middleware';

export const dynamic = 'force-dynamic';

/** GET /api/prices — public */
export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.prices, { headers: securityHeaders });
}

/** PUT /api/prices — protected (replaces entire price list) */
export async function PUT(req: NextRequest) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Expected an array of price items.' },
        { status: 400, headers: securityHeaders }
      );
    }

    // Validate each price entry
    const validated = body.map((item: Record<string, unknown>) => ({
      metal: String(item.metal ?? '').trim(),
      price: String(item.price ?? '').trim(),
      unit: String(item.unit ?? '').trim(),
      trend: ['up', 'down', 'stable'].includes(String(item.trend)) ? item.trend : 'stable',
      change: String(item.change ?? '0.00').trim(),
    }));

    const db = await readDb();
    db.prices = validated as typeof db.prices;
    await writeDb(db);

    return NextResponse.json({ success: true, prices: db.prices }, { headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: securityHeaders });
  }
}
