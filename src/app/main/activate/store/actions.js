import axios from 'axios';
import * as Actions from 'app/auth/store/actions';

export function activate(params)
{
    const request = axios.post('/api/auth/login', {
        email: 'info@example.com',
        password: 'ciao',
        full_user: true
    });

    return (dispatch) =>
        new Promise((resolve, reject) => {
            request.then((response) => {
                response.data.email = 'alison@rocha.com';
                response.data.name = 'Alison';
                response.data.lastname = 'Rocha';

                localStorage.setItem('auth', JSON.stringify(response.data));
                axios.defaults.headers.Authorization = `Token ${response.data.token}`;

                resolve(response.data);

                const { email, name, lastname } = response.data;

                dispatch(Actions.setUserData({
                    data: { email, name, lastname, displayName: `${name} ${lastname}` }
                }));
            })
            .catch(() => {
                reject();
            });
        });

    // const request = axios.get(`/api/rfq/auth/${params}`);

    // return (dispatch) =>
    //     new Promise((resolve, reject) => {
    //         request.then((response) => {
    //             localStorage.setItem('auth', JSON.stringify(response.data.auth));
    //             axios.defaults.headers.Authorization = `Token ${response.data.auth.token}`;
    //             resolve(response.data);
    //         })
    //         .catch(() => {
    //             reject();
    //         });
    //     });
}