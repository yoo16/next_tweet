"use client"

import { useEffect, useState } from 'react';
import { User, initialUser } from '@/app/models/User';
import { Tweet, initialTweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

import { postTweet } from '@/app/services/TweetService';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [tweet, setTweet] = useState<Tweet>(initialTweet);
  const [user, setUser] = useState<User>(session?.user as User);

  console.log("page:" , user)

  const onPostTweet = async (message: string) => {
    console.log(message, user.id)
    const data = await postTweet(user, message);
    setTweet(data);
  }

  return (
    <div>
      <TweetForm onPostTweet={onPostTweet} />
      <TweetList newTweet={tweet} />
    </div>
  )
}