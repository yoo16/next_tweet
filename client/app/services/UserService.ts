import { PostUser } from '@/app/models/User';
import Cookies from 'js-cookie';

const URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const REGIST_URL = URL_BASE + "regist/store";
const AUTH_URL = URL_BASE + "auth";
const USER_URL = URL_BASE + "user";

export const GetUser = async () => {
    try {
        const token = getAccessToken()
        const response = await fetch(USER_URL, {
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

export const getAccessToken = () => {
    var data = Cookies.get('access_token');
    return (data) ? data : "";
}

export const setAccessToken = (value:string) => {
    Cookies.set('access_token', value, { expires: 100, path: '/' });
}

export const AuthUser = async (email: string, password: string) => {
    try {
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email: email, password: password, }),
        });
        if (response.ok) {
            const result = await response.json();
            if (result.access_token) setAccessToken(result.access_token);
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const signOut = () => {
    Cookies.remove('access_token');
}

export const RegistUser = async (postUser: PostUser) => {
    try {
        const response = await fetch(REGIST_URL, {
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