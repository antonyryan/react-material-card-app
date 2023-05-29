import axios from 'axios';

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
                localStorage.setItem('auth', JSON.stringify(response.data));
                axios.defaults.headers.Authorization = `Token ${response.data.token}`;
                resolve(response.data);
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