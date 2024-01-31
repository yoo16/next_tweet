export interface TweetImage {
    id: number;
    file: string;
    tweet_id: number;
    created_at: string;
    updated_at: string;
}

export const initialTweet: TweetImage = {
    id: 0,
    file: '',
    tweet_id: 0,
    created_at: '',
    updated_at: '',
  };