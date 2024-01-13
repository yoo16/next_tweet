"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { User } from '@/app/models/User';
import { getTweets } from '@/app/services/TweetService';
import { useSession } from 'next-auth/react';

interface TweetListProps {
    newTweet: Tweet;
}

const TweetList = ({ newTweet }: TweetListProps) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        (async () => {
            const tweets = await getTweets(session?.user as User);
            setTweets(tweets);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (newTweet && newTweet.id > 0) {
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