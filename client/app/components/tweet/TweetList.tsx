"use client"

import { Tweet } from '@/app/models/Tweet';
import TweetDetail from './TweetDetail';

interface TweetListProps {
    tweets: Tweet[];
}

const TweetList = ({ tweets }: TweetListProps) => {
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