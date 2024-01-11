"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { GetTweets, PostTweet } from '@/app/services/TweetService';

interface TweetListProps {
    newTweet: Tweet;
}

const TweetList = ({ newTweet }: TweetListProps) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        (async () => {
            const tweets = await GetTweets();
            setTweets(tweets);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (newTweet.id > 0) {
                setTweets(tweets => [newTweet, ...tweets]);
            }
        })();
    }, [newTweet]);

    return (
        <div>
            {
                tweets &&
                tweets.map((tweet) => (
                    <TweetDetail key={tweet.id} tweet={tweet} />
                ))
            }
        </div >
    );
}

export default TweetList;