import axios from 'axios';
import * as Actions from 'app/auth/store/actions';

export function activate(params)
{
    // const request = axios.post('/api/auth/login', {
    //     email: 'info@example.com',
    //     password: 'ciao',
    //     full_user: true
    // });
    
    const request = axios.get(`/api/rfq/auth/${params}`);

    return (dispatch) =>
        new Promise((resolve, reject) => {
            request.then((response) => {
                // response.data.email = 'alison@rocha.com';
                // response.data.name = 'Alison';
                // response.data.lastname = 'Rocha';

                const auth = { ...response.data.auth, ...response.data.user };

                localStorage.setItem('auth', JSON.stringify(auth));
                axios.defaults.headers.Authorization = `Token ${auth.token}`;

                resolve(auth);

                const { email, name, lastname } = auth;

                dispatch(Actions.setUserData({
                    data: { email, name, lastname, displayName: `${name} ${lastname}` }
                }));
            })
            .catch(() => {
                reject();
            });
        });
}