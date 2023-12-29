
export const RegistUser = async (name: string, email: string, password: string) => {
    var token = "";
    try {
        const AUTH_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "regist/store";
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

export default RegistUser;