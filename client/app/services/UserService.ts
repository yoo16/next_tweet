const URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const USER_URL = URL_BASE + "user";
const AUTH_URL = URL_BASE + "auth";

export const GetUser = async () => {
    const token = localStorage.getItem('access_token');
    try {
        const response = await fetch(USER_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {

    }
}

export const AuthUser = async (email: string, password: string) => {
    try {
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ email: email, password: password, }),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error('Failed to send data:', error);
    }
}

export const RegistUser = async (name: string, email: string, password: string) => {
    var token = "";
    try {
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            return result;
        }
    } catch (error) {
        console.error('Failed to send data:', error);
    }
}