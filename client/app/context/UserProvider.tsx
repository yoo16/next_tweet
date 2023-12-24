import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/app/models/User';

type UserContextType = {
    user: User | null;
    fetchUserData: (token: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "tweet/get";
    const [user, setUser] = useState<User | null>(null);

    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch(AUTH_URL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        const token = 'YOUR_BEARER_TOKEN';
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const contextValue: UserContextType = {
        user,
        fetchUserData,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
