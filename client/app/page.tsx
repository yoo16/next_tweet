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

  const handleNewTweet = (tweet:Tweet) => {
    setTweet(tweet);
  }

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      (user == undefined) ? router.push('/login') : setUser(user);
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