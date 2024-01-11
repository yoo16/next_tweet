"use client"

import { useRouter } from 'next/navigation';
import { signOut } from '@/app/services/UserService';
// import { signIn, signOut } from "next-auth/react";

const LogoutPage = () => {
    const router = useRouter();
    signOut();
    router.push('/login');
}

export default LogoutPage;