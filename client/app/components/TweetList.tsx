"use client"

import type { Tweet } from '../models/Tweet';

interface TweetListProps {
    tweets: Tweet[];
}

const TweetList = ({ tweets }: TweetListProps) => {
    // console.log("TweetList:", tweets)
    return (
        <div>
            {Array.isArray(tweets) && tweets.map((tweet, index) => (
                <p key={tweet.id}>{tweet.message}</p>
            ))}
        </div>
    );
}

export default TweetList;