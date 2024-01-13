import { PostUser } from '@/app/models/User';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const tokenUser = async (token: string) => {
    try {
        const url = BASE_URL + "user";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async (id: number) => {
    try {
        const url = BASE_URL + "user/" + id;
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAccessToken = () => {
    var value = Cookies.get('access_token');
    console.log("getAccessToken:", value)
    return value;
}

export const setAccessToken = (value: string) => {
    Cookies.set('access_token', value, { expires: 100 });
}

export const authUser = async (credentials: any) => {
    try {
        const url = BASE_URL + "auth";
        var email: string = credentials.email
        var password: string = credentials.password;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const signOut = () => {
    Cookies.remove('access_token');
}

export const registUser = async (postUser: PostUser) => {
    try {
        const url = BASE_URL + "regist/store";
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(postUser),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}