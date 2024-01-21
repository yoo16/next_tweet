"use client"

import { useContext, useEffect, useState } from 'react';
import { User } from '@/app/models/User';
import { Tweet, initialTweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

import { postTweet } from '@/app/services/TweetService';
import UserContext from './context/UserContext';
import { getUser, getAccessToken } from '@/app/services/UserService';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const { user } = useContext(UserContext);
  const [tweet, setTweet] = useState<Tweet>(initialTweet);
  const router = useRouter();

  console.log("Home:", user)
  useEffect(() => {
    (async () => {
      if (!user.accessToken) {
        router.replace('/auth/login');
      }
    })();
  }, [router, user]);

  const onPostTweet = async (message: string) => {
    if (user) {
      const data = await postTweet(user, message);
      setTweet(data);
    }
  }

  return (
    <div>
      {
        (user && user?.id > 0) &&
        <>
          <TweetForm onPostTweet={onPostTweet} />
          <TweetList newTweet={tweet} />
        </>
      }
    </div>
  )
}