"use client"

import { useEffect, useState, useContext, } from 'react';
import { Tweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

import { getTweets, postTweet } from '@/app/services/TweetService';
import { getAccessToken } from '@/app/services/UserService';
import { User } from '@/app/models/User'
import { useRouter } from 'next/navigation';
import UserContext from './context/UserContext';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();

  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      if (!user?.accessToken) return;
      const data = await getTweets(user.accessToken);
      setTweets(data);
    })();
  }, [user]);

  const onPostTweet = async (message: string) => {
    if (user?.accessToken != getAccessToken()) return;
    const newTweet = await postTweet(user, message);
    newTweet?.id && setTweets(currentTweets => [newTweet, ...currentTweets]);
  }

  return (
    <div>
      {
        user?.id > 0 &&
        <>
          <TweetForm onPostTweet={onPostTweet} />
          <TweetList tweets={tweets} />
        </>
      }
    </div>
  )
}