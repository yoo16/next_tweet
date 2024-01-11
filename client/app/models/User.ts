export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
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
};
