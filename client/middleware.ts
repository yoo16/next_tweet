// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: { cookies: any; }) {
    const cookies = req.cookies;
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!auth|api).*)"],
};