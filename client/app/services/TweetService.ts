const URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

import { User } from '@/app/models/User'

export const postTweet = async (user: User, message: string) => {
    if (!user.accessToken) return;
    try {
        var url = URL_BASE + "tweet/add";
        console.log('--- postTweet ---')
        console.log(url)
        console.log(user)
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
    } catch (error) {
        console.log(error)
    }
};

export const getTweets = async (user: User) => {
    console.log("getTweets:", user)
    if (!user.accessToken) return;
    try {
        const url = URL_BASE + "tweet/get";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
