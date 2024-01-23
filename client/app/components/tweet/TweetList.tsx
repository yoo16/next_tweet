"use client"

import { useEffect, useState } from 'react';
import { Tweet } from '@/app/models/Tweet';
import TweetDetail from './TweetDetail';

interface TweetListProps {
    initialTweets: Tweet[];
    newTweet: Tweet;
}

const TweetList = ({ initialTweets, newTweet }: TweetListProps) => {
    const [tweets, setTweets] = useState<Tweet[]>(initialTweets);

    useEffect(() => {
        setTweets(initialTweets);
    }, [initialTweets]);

    useEffect(() => {
        setTweets(currentTweets => [newTweet, ...currentTweets]);
    }, [newTweet]);

    return (
        <div>
            {
                tweets?.map((tweet) => (
                    <TweetDetail key={tweet.id} tweet={tweet} />
                ))
            }
        </div>
    );
}

export default TweetList;