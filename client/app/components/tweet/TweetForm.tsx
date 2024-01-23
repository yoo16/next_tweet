"use client"

import { useState } from 'react';
import ClickButton from '../ClickButton';

interface TweetFormProps {
    onPostTweet: (message: string) => void;
}

const TweetForm = ({ onPostTweet }: TweetFormProps) => {
    const [message, setMessage] = useState("");

    const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const onPost = () => {
        onPostTweet(message);
        setMessage("");
    }

    const isDisabled = () => !message;

    return (
        <div>
            <textarea
                value={message}
                onChange={messageHandler}
                className="resize-none w-full h-24 border rounded-md p-2"
                placeholder="今なにしてる？"></textarea>
            <ClickButton label="Post" onClick={onPost} disabled={isDisabled()} />
        </div>
    );
}

export default TweetForm;