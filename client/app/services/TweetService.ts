const URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TWEET_ADD_URL = URL_BASE + "tweet/add";
const TWEET_GET_URL = URL_BASE + "tweet/get";

import { User } from '@/app/models/User'

export const PostTweet = async (user: User, message: string) => {
    if (!user || user.id == undefined) return;
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
        const response = await fetch(TWEET_ADD_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
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

export const GetTweets = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    try {
        const response = await fetch(TWEET_GET_URL, {
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
        console.error('Failed to fetch data:', error);
    }
}
