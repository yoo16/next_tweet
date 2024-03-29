"use client"

import Link from 'next/link';
import NavbarLink from './NavbarLink';
import Image from 'next/image'

import { SiLoopback } from "react-icons/si";
import imageMe from "@/public/images/me.png";
import { User, initialUser } from '../models/User';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Humberger from './Humberger';

// import { useRouter } from 'next/navigation';
// import { useContext } from 'react';
// import UserContext from '../context/UserContext';
// import { removeAccessToken } from '@/app/services/CookieService';

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  // const router = useRouter();
  // const { user, setUser } = useContext(UserContext);

  // const signOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   await setUser(initialUser);
  //   await removeAccessToken();
  //   router.replace('/auth/login');
  //   e.preventDefault();
  //   return;
  // }

  const logout = async () => {
    await signOut();
  }

  return (
    <nav className="px-5 py-3 flex border-b">
      <div className="flex items-center mr-6">
        <SiLoopback className="me-3" size="2em" />
        <Link href="/" className="text-black">
          <span className="font-semibold text-xl">Next Tweet</span>
        </Link>
      </div>

      <div className="text-sm md:flex-grow">
        {
          user?.id > 0 ? (
            <>
              <NavbarLink href="/user/profile" label="Profile" />
              <NavbarLink href="#" label="Sign out" onClick={logout} />
            </>
          ) : (
            <>
              <NavbarLink href="/auth/regist" label="Register" />
              <NavbarLink href="/auth/login" label="Sign in" />
            </>
          )
        }
      </div>
      {user?.id > 0 &&
        <div className="hidden md:block">
          <div className="flex justify-end text-xs">
            <div className="flex mt-1">
              <Image src={imageMe} className="rounded-full h-8 w-8" alt="" />
              <span className="p-2">{user.name}</span>
            </div>
          </div>
        </div>
      }
      <Humberger />
    </nav>
  )
}

export default Navbar