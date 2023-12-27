"use client"

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { User, getUser } from '@/app/models/User';
import { Tweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [tweet, setTweet] = useState<Tweet>();

  const handleNewTweet = async (data: Tweet) => {
    setTweet(data);
  }

  useEffect(() => {
    const checkUser = async () => {
      const data = await getUser();
      (data == undefined) ? router.push('/login') : setUser(data);
    }
    checkUser();
  }, [router]);

  return (
    <Suspense>
      {user &&
        <div>
          <TweetForm user={user} handleNewTweet={handleNewTweet} />
          <TweetList newTweet={tweet} />
        </div>
      }
    </Suspense>
  )
}