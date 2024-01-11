import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GetUser, getAccessToken } from '@/app/services/UserService'
import { User } from '@/app/models/User'

export async function middleware(request: NextRequest) {
    var access_token = await getAccessToken();
    console.log("Cookie:", access_token)
    var user: User;
    if (access_token) {
        user = await GetUser(access_token);
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}

export const config = {
    matcher: ["/", '/user/:path*'],
}

// export { default } from "next-auth/middleware";

// export const config = {
//     matcher: ["/", "/user/:path*",],
// };

