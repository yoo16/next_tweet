import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { email } = req.body;
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ email }, secret, { expiresIn: '2h' });

    // JWTをCookieにセット
    // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/;`);
    res.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/;`);
    return res;
}