"use client"

import { useEffect, useState, Suspense, lazy } from 'react';
import { useRouter, redirect } from 'next/navigation';
import type { User } from '@/app/models/User';
import TweetList from '@/app/components/tweet/TweetList';
import TweetForm from '@/app/components/tweet/TweetForm';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const checkUser = async () => {
      const USER_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "user";
      const token = localStorage.getItem('access_token');
      console.log("checkUser():", token)
      if (!token) {
        return router.push('/login');
      }
      try {
        const response = await fetch(USER_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUser(user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log(error)
      }
    };
    checkUser();
  }, [router]);

  return (
    <div>
      <Suspense fallback={<p className='bg-red-500'>Loading...</p>}>
        {user &&
          <div>
            <TweetForm user={user} />
            <TweetList />
          </div>
        }
      </Suspense>
    </div>
  )

}