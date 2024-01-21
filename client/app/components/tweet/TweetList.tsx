"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { getTweets } from '@/app/services/TweetService';

import { getAccessToken } from '@/app/services/UserService';
import { FaSpinner } from 'react-icons/fa';
// import { useSession } from 'next-auth/react';

interface TweetListProps {
    newTweet: Tweet;
}

const TweetList = ({ newTweet }: TweetListProps) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { data: session } = useSession();

    useEffect(() => {

    }, []);

    async function fetchTweets() {
        const accessToken = getAccessToken();
        if (accessToken) {
            setIsLoading(true);
            try {
                const tweets = await getTweets(accessToken);
                // const tweets = await getTweets(session?.user.accessToken as User);
                setTweets(tweets);
            } catch (error) {

            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchTweets();
    }, [newTweet]);

    if (isLoading) return (
        <div>
            <FaSpinner />
        </div>
    )

    return (
        <div>
            {
                tweets.map((tweet) => (
                    <TweetDetail key={tweet.id} tweet={tweet} />
                ))
            }
        </div>
    );
}

export default TweetList;