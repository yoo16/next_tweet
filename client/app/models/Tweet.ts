import { User } from './User'
export interface Tweet {
    id: number;
    message: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}

export const getTweets = async () => {
    console.debug("getTweets")
    const TWEET_GET_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/get";
    const token = localStorage.getItem('access_token');
    try {
        const response = await fetch(TWEET_GET_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}