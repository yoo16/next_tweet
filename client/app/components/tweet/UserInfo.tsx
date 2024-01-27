import { Tweet } from "@/app/models/Tweet";
import { User } from "@/app/models/User";
import Image from "next/image";
import imageMe from "@/public/images/me.png";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Link from "next/link";

interface UserInfoProps {
    tweetUser: User;
    tweets: Tweet[];
}

const UserInfo = ({ tweetUser, tweets }: UserInfoProps) => {
    if (!tweetUser) return <></>
    return (
        <div className="my-5">
            <div className="flex items-center my-3">
                <Link href="/">
                    <FaCircleArrowLeft className="me-3 mt-1 h-[30px] w-[30px]" />
                </Link>
                <span className="text-xl me-3">
                    {tweetUser.name}
                </span>
                <span>{tweets.length} posted.</span>
            </div>
            <div className="my-5">
                <Image src={imageMe} className="my-3 rounded-full h-[100px] w-[100px]" alt="" />
                <span className="text-2xl">
                    {tweetUser.name}
                </span>
            </div>
        </div>
    );
}

export default UserInfo;