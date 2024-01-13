"use client"

import { User } from '@/app/models/User';
import { getUser } from '@/app/services/UserService';
import { useState, useEffect } from 'react'

const ProfilePage = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        (async () => {
            // var user: User = await GetUser();
            // setUser(user);
        })();
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-center">Profile</h1>
            {user && user.name}
        </div>
    )
}

export default ProfilePage;