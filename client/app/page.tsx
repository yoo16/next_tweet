"use client"

// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tweet } from './models/Tweet';
import TweetList from './components/TweetList';
// import useLocalStorage from "@/useLocalStorage";


export default function Home() {
  const TWEET_GET_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/get";
  const TWEET_ADD_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/add";

  const [message, setMessage] = useState("");
  const [tweet, setTweet] = useState<Tweet>();
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
      }
    };
    checkLoginStatus();
  }, [router]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    try {
      const data = {
        message: message,
        user_id: 1
      };
      const json = JSON.stringify(data);
      const response = await fetch(TWEET_ADD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: json,
      });

      if (response.ok) {
        const data = await response.json();
        setTweet(data);
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
        console.error('Failed to fetch data:', error);
      }
    };

    getTweets();
  }, []);

  return (
    <div>
      <textarea onChange={handleMessageChange} className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
      <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-lg">Send</button>

      <TweetList tweets={tweets} />
    </div>
  )

}

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   const cookies = nookies.get(context);
//   const accessToken = cookies.session;

//   if (!accessToken) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },

//       props: {} as never,
//     };
//   }

//   return {
//     props: {
//     },
//   };
// }