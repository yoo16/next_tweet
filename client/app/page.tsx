"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/app/models/User';
import { Tweet, initialTweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';
import { PostTweet } from '@/app/services/TweetService';
import { GetUser } from '@/app/services/UserService';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [tweet, setTweet] = useState<Tweet>(initialTweet);

  const onPostTweet = async (message: string) => {
    if (user) {
      const data = await PostTweet(user, message);
      setTweet(data);
    }
  }

  useEffect(() => {
    (async () => {
      var data = await GetUser();
      (data) ? setUser(data) : router.push('/login');
    })();
  }, [router]);

  return (
    <div>
      {user &&
        <div>
          <TweetForm onPostTweet={onPostTweet} />
          <TweetList newTweet={tweet} />
        </div>
      }
    </div>
  )
}