import { User, initialUser } from './User'
export interface Tweet {
    id: number;
    message: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}

export const initialTweet: Tweet = {
    id: 0,
    message: '',
    user_id: 0,
    created_at: '',
    updated_at: '',
    user: initialUser,
  };