"use client"

import { useEffect, useState } from 'react';
import { Tweet } from './models/Tweet';
import TweetList from './components/TweetList';

export default function Home() {
  const TWEET_GET_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/get";
  const TWEET_ADD_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/add";

  const [message, setMessage] = useState("");
  const [tweet, setTweet] = useState<Tweet>();
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    try {
      const data = {
        message: message,
        user_id: 1
      };
      const response = await fetch(TWEET_ADD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setTweets([data, ...tweets]);
      }
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  };

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await fetch(TWEET_GET_URL);
        if (response.ok) {
          const data = await response.json();
          setTweets(data);
        }
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    }

    getTweets();
  }, [tweet]);

  return (
    <div>
      <textarea onChange={handleMessageChange} className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
      <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-lg">Send</button>

      <TweetList tweets={tweets} />
    </div>
  )

}