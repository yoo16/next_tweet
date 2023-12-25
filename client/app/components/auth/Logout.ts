import { redirect } from "next/navigation";

const Logout = async () => {
    redirect(`/login`);
};

export default Logout;