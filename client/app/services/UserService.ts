import { PostUser } from '@/app/models/User';
import Cookies from 'js-cookie';

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
const NEXT_API_URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

export const getUser = async (token: string) => {
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

export const signIn = async (credentials: any) => {
    const url = LARAVEL_API_URL + "auth";
    const email: string = credentials.email
    const password: string = credentials.password;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        return await response.json();
    }
}


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

export const getAccessToken = () => {
    return Cookies.get('access_token');
}

export const updateAccessToken = async (token: string) => {
    if (token) {
        Cookies.set("access_token", token, { expires: 30 })
        return token;
    }
    // const url = NEXT_API_URL + "auth/login";
    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //     },
    // });
    // return response;
}