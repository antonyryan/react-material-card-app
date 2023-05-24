export function getUserId()
{
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
            return auth.id_user;
        }
    } catch (e) { }

    return undefined;
}
