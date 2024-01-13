"use client"

import { User } from '@/app/models/User';
import { useState, useEffect } from 'react'

const ProfilePage = () => {
    const [user, setUser] = useState<User>();

    return (
        <div>
            <h1 className="text-2xl text-center">Profile</h1>
            {user && user.name}
        </div>
    )
}

export default ProfilePage;