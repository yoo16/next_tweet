"use client"

import { useEffect, useState, useContext, } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { getTweets } from '@/app/services/TweetService';
import UserContext from '@/app/context/UserContext';
// import { useSession } from 'next-auth/react';

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