// import { auth } from './auth';

// export default auth ((req) =>  {

// });
export { default } from "next-auth/middleware";

export const config = {
    // matcher: [
    //     "/",
    //     "/((?!non-protected).*)"
    // ],
    matcher: ["/", "/user/profile",],
    // matcher: ["/auth/login", "/auth/register",],
};