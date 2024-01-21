"use client"

import { useEffect, useState, useContext, } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { getTweets } from '@/app/services/TweetService';
import UserContext from '@/app/context/UserContext';
// import { useSession } from 'next-auth/react';

interface TweetListProps {
    newTweet: Tweet;
}

const TweetList = ({ newTweet }: TweetListProps) => {
    const { user } = useContext(UserContext);
    const [tweets, setTweets] = useState<Tweet[]>([]);
    // const { data: session } = useSession();

    useEffect(() => {
        const fetchTweets = async () => {
            if (user?.accessToken) {
                const tweets = await getTweets(user.accessToken);
                // const tweets = await getTweets(session?.user.accessToken as User);
                setTweets(tweets);
            }
        };
        fetchTweets();
    }, [user]);

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