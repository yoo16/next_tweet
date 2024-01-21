"use client"

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { getTweets } from '@/app/services/TweetService';
import { FaSpinner } from 'react-icons/fa';
import UserContext from '@/app/context/UserContext';
// import { useSession } from 'next-auth/react';

interface TweetListProps {
    newTweet: Tweet;
}

const TweetList = ({ newTweet }: TweetListProps) => {
    const { user } = useContext(UserContext);
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { data: session } = useSession();

    useEffect(() => {
        const fetchTweets = async () => {
            setIsLoading(true);
            try {
                if (user?.accessToken) {
                    const tweets = await getTweets(user.accessToken);
                    // const tweets = await getTweets(session?.user.accessToken as User);
                    setTweets(tweets);
                }
            } catch (error) {

            } finally {
                setIsLoading(false);
            }
        };
        fetchTweets();
    }, [user]);

    useEffect(() => {
        setTweets(currentTweets => [newTweet, ...currentTweets]);
    }, [newTweet]);

    if (isLoading) return (
        <div>
            <FaSpinner />
        </div>
    )

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