const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

import { User } from '@/app/models/User'

export const getTweets = async (accessToken: string) => {
    console.log(accessToken)
    const url = LARAVEL_API_URL + "tweet/get";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        return await response.json();
    }
}

export const getTweetsByUserId = async (accessToken: string, userId: any) => {
    console.log(accessToken)
    const url = LARAVEL_API_URL + "tweet/get/" + userId;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        return await response.json();
    }
}

export const postTweet = async (user: User, message: string) => {
    if (!user || !message) return;
    const url = LARAVEL_API_URL + "tweet/add";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message, user_id: user.id }),
    });
    if (response.ok) {
        return await response.json();
    }
};