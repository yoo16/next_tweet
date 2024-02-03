"use client"

import { useContext, useState } from 'react';
import ClickButton from '../ClickButton';
import UploadImage from '../UploadImage';
import UploadImageContext from '@/app/context/UploadIMageContext';

interface TweetFormProps {
    onPostTweet: (message: string, image?: File) => void;
}

const TweetForm = ({ onPostTweet }: TweetFormProps) => {
    const {
        createObjectURL, setCreateObjectURL,
        uploadImage, setUploadImage
    } = useContext(UploadImageContext);

    const [message, setMessage] = useState("");

    const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const onPost = async () => {
        await onPostTweet(message, uploadImage);
        setMessage("");
        setCreateObjectURL("");
    }

    const isDisabled = () => !message;

    return (
        <div>
            <textarea
                value={message}
                onChange={messageHandler}
                className="resize-none w-full h-24 border rounded-md p-2"
                placeholder="今なにしてる？"></textarea>

            <UploadImage />

            <ClickButton label="Post" onClick={onPost} disabled={isDisabled()} />
        </div>
    );
}

export default TweetForm;