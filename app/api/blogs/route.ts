import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/server/lib/db';
import { requireAuth, rateLimit, securityHeaders, sanitizeString } from '@/server/lib/middleware';

export const dynamic = 'force-dynamic';

/** GET /api/blogs — public */
export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.blogs, { headers: securityHeaders });
}

/** POST /api/blogs — protected */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 30, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const title = sanitizeString(body.title) || 'Untitled Scrap Guide';

    const newBlog = {
      id: 'blog-' + Date.now(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      excerpt: sanitizeString(body.excerpt) || '',
      content: sanitizeString(body.content) || '',
      author: sanitizeString(body.author) || 'Malik Scrap Appraiser',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      commentsCount: 0,
      image: sanitizeString(body.image) || '/assets/images/copper_wire_brass_1793892530421.jpg',
      category: sanitizeString(body.category) || 'Scrap Selling Guide',
    };

    const db = await readDb();
    db.blogs.unshift(newBlog);
    await writeDb(db);

    return NextResponse.json(newBlog, { status: 201, headers: securityHeaders });
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400, headers: securityHeaders });
  }
}
