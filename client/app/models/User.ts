export interface User {
    id: number;
    name: string;
    email: string;
    password: number;
    created_at: string;
    updated_at: string;
}

export const getUser = async () => {
    const USER_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "user";
    const token = localStorage.getItem('access_token');
    try {
        const response = await fetch(USER_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const user: User = await response.json();
            return user;
        }
    } catch (error) {

    }
}
