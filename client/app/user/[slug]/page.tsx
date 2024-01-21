"use client"

import UserInfo from "@/app/components/tweet/UserInfo";
import UserTweetList from "@/app/components/tweet/UserTweetList";
import UserContext from "@/app/context/UserContext";
import { Tweet } from "@/app/models/Tweet";
import { User, initialUser } from "@/app/models/User";
import { getTweetsByUserId } from "@/app/services/TweetService";
import { getAccessToken } from "@/app/services/UserService";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const UserTweetPage = () => {
    const params = useParams();
    const userId = params.slug;
    const { user } = useContext(UserContext);
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [tweetUser, setTweetUser] = useState<User>(initialUser);

    useEffect(() => {
        const fetchTweets = async () => {
            if (user?.accessToken) {
                const result = await getTweetsByUserId(user.accessToken, userId);
                setTweets(result.tweets);
                setTweetUser(result.user);
            }
        };
        fetchTweets();
    }, [user, userId]);

    return (
        <div>
            {
                <>
                    <UserInfo tweetUser={tweetUser} tweets={tweets} />
                    <UserTweetList tweets={tweets} />
                </>
            }
        </div>
    );
}

export default UserTweetPage;