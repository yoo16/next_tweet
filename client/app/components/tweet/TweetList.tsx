"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import type { Tweet } from '@/app/models/Tweet';
import type { User } from '@/app/models/User';

interface TweetListProps {
    user: User;
}

const TweetList = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        const getTweets = async () => {
            console.debug("getTweets")
            const TWEET_GET_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/get";
            try {
                const response = await fetch(TWEET_GET_URL);
                if (response.ok) {
                    const data = await response.json();
                    setTweets(data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        getTweets();
    }, []);

    return (
        <div>
            {
                tweets.map((tweet) => (
                    <TweetDetail key={tweet.id} tweet={tweet} />
                ))
            }
        </div >
    );
}

export default TweetList;