"use client"

import type { Tweet } from '@/app/models/Tweet';
import Image from "next/image";
import imageMe from "@/public/images/me.png";

interface TweetDetailProps {
    tweet: Tweet;
}

const TweetDetail = ({ tweet }: TweetDetailProps) => {
    const dateFormat = (dateString: string) => {
        return new Date(dateString).toLocaleString('ja-JP');
    }

    return (
        <div className="mt-3 flex border-b">
            <div>
                <Image className="inline-block rounded-full h-[40px] w-[40px] me-3" src={imageMe} alt="" />
            </div>
            <div className="tweet-body">
                <div className="tweet-user">
                    <span className="font-bold">{tweet.user.name}</span>
                    <span className="ps-3 text-gray-500">{dateFormat(tweet.created_at)}</span>
                </div>
                <div className="tweet-text mt-2 mb-2">
                    {tweet.message}
                </div>
            </div>
        </div>
    );
}

export default TweetDetail;