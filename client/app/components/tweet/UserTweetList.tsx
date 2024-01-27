"use client"

import { useContext, useEffect, useState, } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { getTweets, getTweetsByUserId } from '@/app/services/TweetService';
import UserContext from '@/app/context/UserContext';
import Loading from '../Loading';
// import { useSession } from 'next-auth/react';

interface UserTweetListProps {
    tweets: Tweet[];
}

const UserTweetList = ({ tweets }: UserTweetListProps) => {
    const [isLoading, setIsLoading] = useState(true);
    // const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        setIsLoading(false)
    }, [tweets])

    return (
        <div>
            {
                (isLoading) ? 
                <Loading />
                : 
                tweets?.map((tweet) => (
                    <TweetDetail key={tweet.id} tweet={tweet} />
                ))
            }
        </div>
    );
}

export default UserTweetList;