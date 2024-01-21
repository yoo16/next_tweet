"use client"

import { useEffect, useState, useContext, } from 'react';
import TweetDetail from '@/app/components/tweet/TweetDetail';
import { Tweet } from '@/app/models/Tweet';
import { getTweets, getTweetsByUserId } from '@/app/services/TweetService';
import UserContext from '@/app/context/UserContext';
// import { useSession } from 'next-auth/react';

interface UserTweetListProps {
    tweets: Tweet[];
}

const UserTweetList = ({ tweets }: UserTweetListProps) => {
    const { user } = useContext(UserContext);
    // const [tweets, setTweets] = useState<Tweet[]>([]);

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

export default UserTweetList;