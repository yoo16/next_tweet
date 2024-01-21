import { PostUser } from '@/app/models/User';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAccessToken = () => {
    return Cookies.get('access_token');
}

export const getUser = async (token: string) => {
    const url = BASE_URL + "user";
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

export const getUserById = async (id: number) => {
    const url = BASE_URL + "user/" + id;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
}

export const signIn = async (credentials: any) => {
    const url = BASE_URL + "auth";
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
    const url = BASE_URL + "regist/store";
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(postUser),
    });
    if (response.ok) {
        return await response.json();
    }
}