"use client"

import { useState } from "react";
import UploadImageContext from "../context/UploadIMageContext";

export default function UploadImageProvider({
    children,
}: {
    children: React.ReactNode,
}): React.ReactNode {
    const [createObjectURL, setCreateObjectURL] = useState<string>("");
    const [uploadImage, setUploadImage] = useState<File>();

    return (
        <UploadImageContext.Provider value={
            { 
                createObjectURL, setCreateObjectURL, 
                uploadImage, setUploadImage,
            }
            }>
            {children}
        </UploadImageContext.Provider>
    );
};
