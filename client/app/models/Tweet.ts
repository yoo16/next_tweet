import { User } from './User'
export interface Tweet {
    id: number;
    message: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}