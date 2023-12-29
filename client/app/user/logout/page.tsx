"use client";

import { useRouter } from 'next/navigation';

const Logout = () => {
    localStorage.removeItem('access_token');
    useRouter().push('/login');
}

export default Logout;