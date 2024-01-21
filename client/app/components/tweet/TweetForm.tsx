"use client"

import { useState } from 'react';

interface TweetFormProps {
    onPostTweet: (message: string) => void;
}

const TweetForm = ({ onPostTweet }: TweetFormProps) => {
    const [message, setMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const enableButtonClassName = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg";
    const disableButtonClassName = "bg-blue-200 text-white font-bold py-2 px-4 rounded-lg";

    const messageHandler = (e: any) => {
        setMessage(e.target.value);
        setIsButtonDisabled((e.target.value) ? false : true);
    }
    const onPost = () => {
        onPostTweet(message);
        setMessage("");
    }

    return (
        <div>
            <textarea value={message} onChange={messageHandler} className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
            <button
                onClick={onPost}
                className={isButtonDisabled ? disableButtonClassName : enableButtonClassName }
                disabled={isButtonDisabled}>
                Send</button>
        </div>
    );
}

export default TweetForm;