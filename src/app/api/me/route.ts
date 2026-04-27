import {NextResponse} from 'next/server';
import {jwtVerify} from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split('; ')
    .find(c => c.startsWith('admin_token='))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({authenticated: false});
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.json({authenticated: true});
  } catch {
    return NextResponse.json({authenticated: false});
  }
}