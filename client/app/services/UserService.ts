import { PostUser } from '@/app/models/User';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const bearerHeader = (token: string) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export const tokenUser = async (token: string) => {
    try {
        const url = BASE_URL + "user";
        const response = await fetch(url, {
            method: 'GET',
            headers: bearerHeader(token),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}

export const createToken = async (token: any) => {
    try {
        const url = BASE_URL + "auth/token";
        const name = token.name;
        const email = token.email;
        console.log(token.name, token.email)
        const response = await fetch(url, {
            method: 'POST',
            headers: bearerHeader(''),
            body: JSON.stringify({ name, email }),
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