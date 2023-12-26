"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet, getTweets } from '@/app/models/Tweet';

interface TweetListProps {
    newTweet: Tweet | undefined;
}

const TweetList = ({ newTweet }: TweetListProps) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        const loadTweets = async () => {
            if (newTweet) {
                console.log('TweetList: new tweet')
                setTweets([newTweet, ...tweets]);
            } else {
                console.log('TweetList: getTweets()')
                const tweets = await getTweets();
                setTweets(tweets);
            }
        }
        loadTweets();
    }, [newTweet]);

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