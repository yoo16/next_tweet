"use client"

import type { Tweet } from '../models/Tweet';

interface TweetListProps {
    tweets: Tweet[];
}

const TweetList = ({ tweets }: TweetListProps) => {
    // console.log("TweetList:", tweets)
    return (
        <div>
            {tweets && tweets.length > 0 ? (
                tweets.map((tweet, index) => (
                    <p key={tweet.id}>{tweet.message}</p>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default TweetList;