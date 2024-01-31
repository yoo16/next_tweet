import { NextRequest, NextResponse } from 'next/server';

export { default } from "next-auth/middleware";

// export async function middleware(req: NextRequest) {
//     console.log("Middleware")
// }

// import { getUser } from '@/app/services/UserService';
// import { User } from '@/app/models/User';

// const authURL = process.env.BASE_URL + "auth/login";

// export async function middleware(req: NextRequest) {
//     console.log('--- middleware ---')
//     const token = req.cookies.get('access_token');
//     console.log(token)
//     if (!token) return NextResponse.redirect(authURL);

//     const user: User = await getUser(token?.value) as User;
//     if (!user?.accessToken) {
//         return NextResponse.redirect(authURL);
//     } else {
//         return NextResponse.next();
//     }
// }

export const config = {
    matcher: ["/", "/user/:path*", "/user/:slug*"]
};