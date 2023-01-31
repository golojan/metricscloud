import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
const middleware = async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: '/api/:path*',
};
