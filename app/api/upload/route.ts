import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';
import { requireAuth, rateLimit, securityHeaders } from '@/server/lib/middleware';

export const dynamic = 'force-dynamic';

const token = process.env.UPLOADTHING_TOKEN || 'eyJhcGlLZXkiOiJza19saXZlX2VlZjRiYmY3YTM5NjRjNjU1NjM3YWE0M2EyODk3NDI0YTNjMDAxYjI2M2JhMTBjZmUzMDhjMTEyMWM2MmZkOWYiLCJhcHBJZCI6Imhsb2hjcGM3aDAiLCJyZWdpb25zIjpbInNlYTEiXX0=';

/**
 * POST /api/upload
 * Protected route for admin image upload using UploadThing
 */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 20, 60_000);
  if (limited) return limited;

  const authError = requireAuth(req);
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded.' },
        { status: 400, headers: securityHeaders }
      );
    }

    // Verify it is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Only image files are allowed.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const utapi = new UTApi({ token });
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      console.error('[UploadThing] Upload error:', response.error);
      return NextResponse.json(
        { success: false, message: response.error.message || 'UploadThing upload failed.' },
        { status: 500, headers: securityHeaders }
      );
    }

    const uploadedUrl = response.data?.url || response.data?.ufsUrl;

    return NextResponse.json(
      {
        success: true,
        url: uploadedUrl,
        name: file.name,
        size: file.size,
      },
      { headers: securityHeaders }
    );
  } catch (err) {
    console.error('[UploadThing] Exception:', err);
    return NextResponse.json(
      { success: false, message: 'Error processing image upload.' },
      { status: 500, headers: securityHeaders }
    );
  }
}

