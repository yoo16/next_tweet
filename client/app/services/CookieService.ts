import Cookies from 'js-cookie';

export const getAccessToken = () => {
    return Cookies.get('access_token') || "";
}

export const updateAccessToken = async (token: string) => {
    if (!token) return;
    await Cookies.set("access_token", token, { expires: 30 });
}

export const removeAccessToken = async () => {
    await Cookies.remove("access_token");
}