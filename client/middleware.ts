// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './app/services/UserService';
import { User } from './app/models/User';

export async function middleware() {
    // const getCookie = (key: string) => {
    //     return req.cookies
    //         .getAll()
    //         .find((cookie: { name: string; }) => cookie.name == key);
    // }

    // const cookie = getCookie('access_token')
    // console.log ('middleware:', req.user);
    // req.user = await getUser(cookie.value);
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!auth|api).*)"],
};