import { PostUser, Credentials } from '@/app/models/User';

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export const registUser = async (postUser: PostUser) => {
    if (!postUser) return;

    const url = LARAVEL_API_URL + "regist/store";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(postUser),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (token: string) => {
    if (!token) return;

    const url = LARAVEL_API_URL + "user";
    try {
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
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (credentials: Credentials) => {
    if (!credentials.email || !credentials.password) return;

    const url = LARAVEL_API_URL + "auth";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.log(error)
    }
}