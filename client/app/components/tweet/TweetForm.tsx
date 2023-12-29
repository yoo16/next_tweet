"use client"

import { useState } from 'react';

interface TweetFormProps {
    onPostTweet: (message: string) => void;
}

const TweetForm = ({ onPostTweet }: TweetFormProps) => {
    const [message, setMessage] = useState("");

    const onPost = () => {
        onPostTweet(message);
        setMessage("");
    }

    return (
        <div>
            <textarea value={message} onChange={(e) => { setMessage(e.target.value); }} className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
            <button onClick={(e) => { onPost(); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Send</button>
        </div>
    );
}

export default TweetForm;