export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    accessToken: string;
}

export interface PostUser {
    name: string;
    email: string;
    password: string;
};

export const initialUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    created_at: '',
    updated_at: '',
    accessToken: '',
};

export const testUser: User = {
    accessToken: process.env.NEXT_PUBLIC_TEST_USER_ACCESS_TOKEN || '',
    id: Number(process.env.NEXT_PUBLIC_TTEST_USER_ID) || 1,
    name: '',
    email: '',
    password: '',
    created_at: '',
    updated_at: '',
}