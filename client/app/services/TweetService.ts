const URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

import { User } from '@/app/models/User'

const bearerHeader = (token:string) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export const postTweet = async (user: User, message: string) => {
    if (!user.accessToken) return;
    try {
        var url = URL_BASE + "tweet/add";
        const response = await fetch(url, {
            method: 'POST',
            headers: bearerHeader(user.accessToken),
            body: JSON.stringify({ message: message, user_id: user.id }),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error)
    }
};

export const getTweets = async (user: User) => {
    try {
        const url = URL_BASE + "tweet/get";
        const response = await fetch(url, {
            method: 'GET',
            headers: bearerHeader(user.accessToken),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
