"use client"

import { useContext, useEffect, useState } from 'react';
import { User } from '@/app/models/User';
import { Tweet, initialTweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

import { postTweet } from '@/app/services/TweetService';
import { getUser, getAccessToken } from '@/app/services/UserService';
import AuthContext from './context/UserContext';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const [tweet, setTweet] = useState<Tweet>(initialTweet);
  // const [user, setUser] = useState<User>();
  // const [user, setUser] = useState<User>(session?.user as User);
  const { user } = useContext(AuthContext);
  console.log('Home', user)

  const onPostTweet = async (message: string) => {
    if (user) {
      const data = await postTweet(user, message);
      setTweet(data);
    }
  }

  return (
    <div>
      <TweetForm onPostTweet={onPostTweet} />
      <TweetList newTweet={tweet} />
    </div>
  )
}