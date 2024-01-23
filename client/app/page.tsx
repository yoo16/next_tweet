"use client"

import { useContext, useEffect, useState } from 'react';
import { Tweet, initialTweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

import { getTweets, postTweet } from '@/app/services/TweetService';
import { getAccessToken } from '@/app/services/UserService';
import { User } from '@/app/models/User'
import { useRouter } from 'next/navigation';
import UserContext from './context/UserContext';
import ClickButton from './components/ClickButton';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();

  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweet, setNewTweet] = useState<Tweet>(initialTweet);

  useEffect(() => {
    (async () => {
      if (!user.accessToken) {
        router.replace('/auth/login');
      }
    })();
  }, [router, user]);

  useEffect(() => {
    (async () => {
      if (user?.accessToken) {
        const data = await getTweets(user.accessToken);
        setTweets(data);
        console.log(data);
      }
    })();
  }, [user]);

  const onPostTweet = async (message: string) => {
    if (user?.accessToken == getAccessToken()) {
      const data = await postTweet(user, message);
      setNewTweet(data);
    }
  }

  return (
    <div>
      {
        user?.id > 0 &&
        <>
          <TweetForm onPostTweet={onPostTweet} />
          <TweetList initialTweets={tweets} newTweet={newTweet} />
        </>
      }
    </div>
  )
}