import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdmin } from '@lib/verifyAdmin';

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json() as { folder: string };
    const { folder } = body;

    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generate a signature using your Cloudinary secret
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_SECRET as string
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error('Signature generation error:', error);
    return NextResponse.json({ error: 'Failed to sign' }, { status: 500 });
  }
}