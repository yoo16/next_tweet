"use client"

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import UploadImageContext from "../context/UploadIMageContext";

export default function UploadImage() {
    const {
        createObjectURL, setCreateObjectURL,
        uploadImage, setUploadImage
    } = useContext(UploadImageContext);

    // const [image, setImage] = useState<File>();
    // const [createObjectURL, setCreateObjectURL] = useState<string>("");

    const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUploadImage(file)
            setCreateObjectURL(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <label htmlFor="file-input" className="bg-primary-900 text-white-900 dark:bg-dark-900 px-4 py-2 rounded mb-2 w-full" >
                <Image
                    width={25}
                    height={25}
                    src="/svg/photo.svg"
                    alt="" />
            </label>

            {
                createObjectURL &&
                <Image
                    className="flex justify-center items-center"
                    src={createObjectURL}
                    width={200}
                    height={200}
                    alt=""
                />
            }

            <input id="file-input"
                className="hidden"
                type="file"
                accept="image/*"
                name="image"
                onChange={uploadToClient} />
        </div>
    );
}