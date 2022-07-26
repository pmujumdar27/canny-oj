export default function authHeader() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens?.accessToken) {
        return {
            Authorization: `Bearer ${tokens.accessToken}`
        };
    }
    return {}
}