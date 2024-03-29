"use client"

import type { Tweet } from '@/app/models/Tweet';
import Image from "next/image";
import imageMe from "@/public/images/me.png";
import Link from 'next/link';
import { TweetImage } from '@/app/models/TweetImage';
import { uploadImage } from '@/app/services/TweetService';

interface TweetDetailProps {
    tweet: Tweet;
}

const TweetDetail = ({ tweet }: TweetDetailProps) => {
    const UPLOAD_IMAGE_URL = process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL;
    const dateFormat = (dateString: string) => {
        return new Date(dateString).toLocaleString('ja-JP');
    }

    const imageURL = (image: TweetImage) => {
        if (!image) return "";
        const url = UPLOAD_IMAGE_URL + image.file;
        return url;
    }

    return (
        <div className="mt-3 flex border-b">
            <div>
                <Image
                    className="inline-block rounded-full h-[40px] w-[40px] me-3"
                    src={imageMe}
                    alt="" />
            </div>
            <div className="tweet-body">
                <div className="tweet-user">
                    <Link href={`/user/${tweet.user.id}`}>
                        <span className="font-bold">
                            {tweet.user.name}
                        </span>
                    </Link>
                    <span className="ps-3 text-gray-500">
                        {dateFormat(tweet.created_at)}
                    </span>
                </div>
                <div className="whitespace-pre-wrap mt-2 mb-2">
                    {tweet.message}
                </div>
                <div className="flex">
                    {
                        tweet.image && tweet.image?.map((image) => (
                            <Image
                                className="max-h-64 m-2"
                                key={image.id}
                                src={imageURL(image)}
                                width={200}
                                height={200}
                                alt="" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default TweetDetail;