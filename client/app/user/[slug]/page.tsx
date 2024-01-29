"use client"

import UserInfo from "@/app/components/tweet/UserInfo";
import UserTweetList from "@/app/components/tweet/UserTweetList";
import Loading from "@/app/components/Loading";
import { Tweet } from "@/app/models/Tweet";
import { User, initialUser } from "@/app/models/User";
import { getTweetsByUserId } from "@/app/services/TweetService";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
// import UserContext from "@/app/context/UserContext";

const UserTweetPage = () => {
    // const { user } = useContext(UserContext);
    const { data: session } = useSession();
    const user: User = session?.user as User;

    const params = useParams();
    const userId = params.slug;
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [tweetUser, setTweetUser] = useState<User>(initialUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const result = await getTweetsByUserId(user.accessToken, userId);
            setTweets(result?.tweets);
            setTweetUser(result?.user);
            setIsLoading(false)
        })();
    }, [user, userId]);

    return (
        <div>
            <UserInfo tweetUser={tweetUser} tweets={tweets} />
            {
                isLoading ? <Loading /> : <UserTweetList tweets={tweets} />
            }
        </div>
    );
}

export default UserTweetPage;