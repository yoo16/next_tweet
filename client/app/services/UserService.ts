"use client"

import { PostUser } from '@/app/models/User';
import Cookies from 'js-cookie';

interface Credentials {
    email: string;
    password: string;
}

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
const NEXT_API_URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

export const registUser = async (postUser: PostUser) => {
    const url = LARAVEL_API_URL + "regist/store";
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(postUser),
    });
    if (response.ok) {
        return await response.json();
    }
}

export const getUser = async (token: string) => {
    console.log(token)
    if (!token) return;
    const url = LARAVEL_API_URL + "user";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();
        data.accessToken = token;
        return data;
    }
}

export const signIn = async (credentials: Credentials) => {
    //TODO: Validate
    if (!(credentials.email && credentials.password)) return;

    const url = LARAVEL_API_URL + "auth";
    const email: string = credentials.email
    const password: string = credentials.password;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        const result = await response.json();
        updateAccessToken(result?.access_token);
        return result;
    }
}

export const signOut = async () => {
    await removeAccessToken();
}

export const getAccessToken = () => {
    return Cookies.get('access_token') || "";
}

export const updateAccessToken = async (token: string) => {
    if (!token) return;
    await Cookies.set("access_token", token, { expires: 30 });
}

export const removeAccessToken = async () => {
    await Cookies.remove("access_token");
}