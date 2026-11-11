import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders, sanitizeString } from '@/server/lib/middleware';

export const dynamic = 'force-dynamic';

/** GET /api/services — public */
export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.services, { headers: securityHeaders });
}

/** POST /api/services — protected */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();

    const newService = {
      id: 'srv-' + Date.now(),
      title: sanitizeString(body.title) || 'Untitled Scrap Service',
      category: sanitizeString(body.category) || 'General Scrap',
      shortDesc: sanitizeString(body.shortDesc) || '',
      description: sanitizeString(body.description) || '',
      icon: sanitizeString(body.icon) || 'Hammer',
      image: sanitizeString(body.image) || '/assets/images/ferrous_steel_re.jpg',
      badge: sanitizeString(body.badge) || 'We Buy',
      highlight: sanitizeString(body.highlight) || '',
    };

    const db = await readDb();
    db.services.push(newService);
    await writeDb(db);

    return NextResponse.json(newService, { status: 201, headers: securityHeaders });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400, headers: securityHeaders }
    );
  }
}
