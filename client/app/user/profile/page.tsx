"use client"

import { User } from '@/app/models/User';
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import Image from 'next/image';

import imageMe from "@/public/images/me.png";

const ProfilePage = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<User>(session?.user as User);

    return (
        <div className="mx-auto w-1/2">
            <h1 className="text-3xl text-center font-bold">Profile</h1>
            <div className="flex justify-center p-3">
                <Image className="rounded-full h-36 w-36" src={imageMe} alt="" />
            </div>
            <div className="flex justify-center p-3">
                {user.name}
            </div>
        </div>
    )
}

export default ProfilePage;