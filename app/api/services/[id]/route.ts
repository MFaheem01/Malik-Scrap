import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders, sanitizeString } from '@/server/lib/middleware';

type Params = { params: Promise<{ id: string }> };

/** PUT /api/services/[id] — protected */
export async function PUT(req: NextRequest, { params }: Params) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDb();

    const index = db.services.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404, headers: securityHeaders });
    }

    const updated = { ...db.services[index] };
    if (body.title !== undefined) updated.title = sanitizeString(body.title);
    if (body.category !== undefined) updated.category = sanitizeString(body.category);
    if (body.shortDesc !== undefined) updated.shortDesc = sanitizeString(body.shortDesc);
    if (body.description !== undefined) updated.description = sanitizeString(body.description);
    if (body.icon !== undefined) updated.icon = sanitizeString(body.icon);
    if (body.image !== undefined) updated.image = sanitizeString(body.image);
    if (body.badge !== undefined) updated.badge = sanitizeString(body.badge);
    if (body.highlight !== undefined) updated.highlight = sanitizeString(body.highlight);

    db.services[index] = updated;
    await writeDb(db);

    return NextResponse.json(updated, { headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400, headers: securityHeaders });
  }
}

/** DELETE /api/services/[id] — protected */
export async function DELETE(req: NextRequest, { params }: Params) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  const { id } = await params;
  const db = await readDb();
  const before = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);

  if (db.services.length === before) {
    return NextResponse.json({ error: 'Service not found.' }, { status: 404, headers: securityHeaders });
  }

  await writeDb(db);
  return NextResponse.json({ success: true }, { headers: securityHeaders });
}
