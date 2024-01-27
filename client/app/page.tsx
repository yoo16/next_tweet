"use client"

import { useEffect, useState, useContext, } from 'react';
import { Tweet } from '@/app/models/Tweet';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

import { getTweets, postTweet } from '@/app/services/TweetService';
import { getAccessToken } from '@/app/services/UserService';
import UserContext from './context/UserContext';
import Loading from './components/Loading';
// import { useSession } from 'next-auth/react';

export default function Home() {
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTweets(user.accessToken);
      setTweets(data);
      setIsLoading(false)
    })();
  }, [user]);

  const onPostTweet = async (message: string) => {
    const newTweet = await postTweet(user, message);
    newTweet?.id && setTweets(currentTweets => [newTweet, ...currentTweets]);
  }

  return (
    <div>
      <TweetForm onPostTweet={onPostTweet} />
      {
        (isLoading) ? (
          <Loading />
        ) : (
          <TweetList tweets={tweets} />
        )
      }
    </div>
  )
}