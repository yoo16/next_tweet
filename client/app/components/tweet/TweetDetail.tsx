"use client"

import type { Tweet } from '@/app/models/Tweet';
import Image from "next/image";
import imageMe from "@/public/images/me.png";

interface TweetDetailProps {
    tweet: Tweet;
}

const TweetDetail = ({ tweet }: TweetDetailProps) => {
    const locale = 'ja-JP';
    const dateFormat = (dateString:string) => {
        var date = new Date(dateString);
        return date.toLocaleString(locale);
    }

    return (
        <div>
            <div className="tweet d-flex">

                <div className="profile-image">
                    <Image src={imageMe} className="profile-image" alt="" />
                </div>

                <div className="tweet-body">
                    <div className="tweet-user">
                        <span className="fw-bold">@Tokyo Taro</span>
                        <span className="ms-1 text-secondary">{dateFormat(tweet.created_at)}</span>
                    </div>
                    <div className="tweet-text mt-2 mb-2">
                        {tweet.message}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TweetDetail;