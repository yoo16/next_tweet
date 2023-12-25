"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import type { Tweet } from '@/app/models/Tweet';
import type { User } from '@/app/models/User';

interface TweetListProps {
    user: User;
}

const TweetList = ({ user, }: TweetListProps) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (!user || user.id == undefined) return;
        const TWEET_ADD_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/add";
        const data = {
            message: message,
            user_id: user?.id
        };
        const json = JSON.stringify(data);
        try {
            const response = await fetch(TWEET_ADD_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: json,
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                if (!data.error) {
                    setTweets([data, ...tweets]);
                    setMessage("");
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

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
            {user &&
                <div>
                    <textarea onChange={(e) => { setMessage(e.target.value); }} className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
                    <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-lg">Send</button>
                </div>
            }
            {
                tweets.map((tweet) => (
                    <TweetDetail key={tweet.id} tweet={tweet} />
                ))
            }
        </div >
    );
}

export default TweetList;