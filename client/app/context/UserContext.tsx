"use client"

import React, { createContext, useState, useContext } from 'react';
import { User, initialUser } from '@/app/models/User'

const UserContext = createContext<User>(initialUser);

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserProvider({
    children,
    user,
}: {
    children: React.ReactNode,
    user: User,
}): React.ReactNode {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}