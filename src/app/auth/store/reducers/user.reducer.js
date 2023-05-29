import * as Actions from '../actions';

let data = null;

try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const { email, name, lastname } = auth;
   
    data = { email, displayName: `${name} ${lastname}`};
} catch (e) {}

const initialState = data ? {
    role: [],
    data: { ...data }
} : {
    role: [],//guest
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : 'johndoe@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
}

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
