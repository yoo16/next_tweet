import { useState } from "react";

export default function UploadImage() {

    const [image, setImage] = useState<File>();
    const [createObjectURL, setCreateObjectURL] = useState<string>("");

    const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setImage(file);
            setCreateObjectURL(imageURL);
            console.log(file);
            console.log(imageURL);
        }
    };

    const postImage = async () => {
        var result = "";
        return result;
    }

    return (
        <div>
            <label htmlFor="file-input" className="bg-primary-900 text-white-900 dark:bg-dark-900 px-4 py-2 rounded mb-2 w-full" >
                <img className="h-[25px] w-[25px]" src="/svg/photo.svg" />
            </label>

            <img
                className="flex justify-center items-center"
                src={createObjectURL} />

            <input id="file-input"
                className="hidden"
                type="file"
                accept="image/*"
                name="image"
                onChange={uploadToClient} />
        </div>
    );
}