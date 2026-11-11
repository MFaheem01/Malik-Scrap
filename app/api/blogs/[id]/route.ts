import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders, sanitizeString } from '@/server/lib/middleware';

type Params = { params: Promise<{ id: string }> };

/** PUT /api/blogs/[id] — protected */
export async function PUT(req: NextRequest, { params }: Params) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDb();

    const index = db.blogs.findIndex((b) => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404, headers: securityHeaders });
    }

    const updated = { ...db.blogs[index] };
    if (body.title !== undefined) {
      updated.title = sanitizeString(body.title);
      updated.slug = updated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    if (body.excerpt !== undefined) updated.excerpt = sanitizeString(body.excerpt);
    if (body.content !== undefined) updated.content = sanitizeString(body.content);
    if (body.author !== undefined) updated.author = sanitizeString(body.author);
    if (body.category !== undefined) updated.category = sanitizeString(body.category);
    if (body.image !== undefined) updated.image = sanitizeString(body.image);

    db.blogs[index] = updated;
    await writeDb(db);

    return NextResponse.json(updated, { headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400, headers: securityHeaders });
  }
}

/** DELETE /api/blogs/[id] — protected */
export async function DELETE(req: NextRequest, { params }: Params) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  const { id } = await params;
  const db = await readDb();
  const before = db.blogs.length;
  db.blogs = db.blogs.filter((b) => b.id !== id);

  if (db.blogs.length === before) {
    return NextResponse.json({ error: 'Blog post not found.' }, { status: 404, headers: securityHeaders });
  }

  await writeDb(db);
  return NextResponse.json({ success: true }, { headers: securityHeaders });
}
