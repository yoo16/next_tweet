export const setCookie = (name: string, value: string, daysToExpire: number): void => {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + daysToExpire);
    const cookieValue = encodeURIComponent(name) + "="
        + encodeURIComponent(value)
        + "; expires="
        + expireDate.toUTCString()
        + "; path=/";
    document.cookie = cookieValue;
}

export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.indexOf(name + "=") === 0) {
            return decodeURIComponent(trimmedCookie.substring(name.length + 1));
        }
    }
    return null;
}

export const deleteCookie = (name: string): void => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}