"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, initialUser } from '@/app/models/User';
import { GetUser, getAccessToken } from '@/app/services/UserService';
import { Tweet, initialTweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';
import { PostTweet } from '@/app/services/TweetService';
import { useUserContext } from '@/app/context/UserContext';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  // const user: User = useUserContext();
  // const { data: session } = useSession();
  // console.log(session)

  const [user, setUser] = useState<User>(initialUser);
  const [tweet, setTweet] = useState<Tweet>(initialTweet);

  useEffect(() => {
    (async () => {
      const data = await GetUser();
      if (!data) router.push('/login');
      setUser(data);
    })();
  }, [router]);

  console.log("----Home----", user);

  const onPostTweet = async (message: string) => {
    if (user) {
      const data = await PostTweet(user, message);
      setTweet(data);
    }
  }

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