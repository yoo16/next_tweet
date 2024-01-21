"use client"

import Link from 'next/link';
import NavbarLink from './NavbarLink';
import Image from 'next/image'

import { SiLoopback } from "react-icons/si";
import imageMe from "@/public/images/me.png";
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { initialUser } from '../models/User';

// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react"

const Navbar = () => {
  const router = useRouter();
  var { user } = useContext(UserContext);
  // const { data: session } = useSession();

  const signOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    router.push('/api/auth/logout');
    e.preventDefault();
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
          user?.id ? (
            <>
              <NavbarLink href="/user/profile" label="Profile" />
              <NavbarLink href="#" label="Sign out" onClick={signOut} />
            </>
          ) : (
            <>
              <NavbarLink href="/auth/regist" label="Register" />
              <NavbarLink href="/auth/login" label="Sign in" />
            </>
          )
        }
      </div>
      {user?.id &&
        <div className="hidden md:block">
          <div className="flex justify-end text-xs">
            <div className="flex mt-1">
              <Image src={imageMe} className="rounded-full h-8 w-8" alt="" />
              <span className="p-2">{user.name}</span>
            </div>
          </div>
        </div>
      }
      <div className="block md:hidden">
        <button className="flex items-center px-1 py-2">
          <div className="p-1 space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>
    </nav>
  )
}

export default Navbar