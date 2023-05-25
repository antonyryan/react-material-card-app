import * as Actions from '../actions';
import _ from '@lodash';

const initialState = null;

const boardReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_BOARD:
        {
            return {
                ...action.payload
            };
        }
        case Actions.RESET_BOARD:
        {
            return initialState;
        }
        case Actions.ORDER_LIST:
        {
            return {
                ...state,
                lists: action.payload
            };
        }
        case Actions.ORDER_CARD:
        {
            return {
                ...state,
                lists: action.payload
            };
        }
        case Actions.ADD_LIST:
        {
            return {
                ...state,
                lists: action.payload
            };
        }
        case Actions.ADD_CARD:
        {
            const { listId, card } = action.payload;

            return {
                ...state,
                cards: [...state.cards, { ...card }],
                lists: state.lists.map(list => {
                    if (list.id === listId) {
                        return {...list, idCards: list.idCards.concat(card.id)};
                    } else {
                        return list;
                    }
                })
            }
        }
        case Actions.REMOVE_CARD:
        {
            const cardId = action.payload;

            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.idCards.includes(cardId)) {
                        return {
                            ...list,
                            idCards: list.idCards.filter(id => id !== cardId)
                        }
                    } else {
                        return list;
                    }
                }),
                cards: state.cards.filter(card => card.id !== cardId)
            }
        }
        case Actions.ADD_LABEL:
        {
            return {
                ...state,
                labels: [
                    ...state.labels,
                    action.payload
                ]
            };
        }
        case Actions.UPDATE_CARD:
        {
            return {
                ...state,
                cards: state.cards.map((_card) => {
                    if ( _card.id === action.payload.id )
                    {
                        return action.payload;
                    }
                    return _card;
                })
            };
        }
        case Actions.RENAME_LIST:
        {
            return {
                ...state,
                lists: state.lists.map(list => {
                    if ( list.id === action.listId )
                    {
                        list.name = action.listTitle
                    }
                    return list;
                })
            };
        }
        case Actions.REMOVE_LIST:
        {
            return {
                ...state,
                lists: _.reject(state.lists, {id: action.listId})
            };
        }
        case Actions.CHANGE_BOARD_SETTINGS:
        {
            return {
                ...state,
                settings: action.payload
            };
        }
        case Actions.DELETE_BOARD:
        {
            return initialState;
        }
        case Actions.RENAME_BOARD:
        {
            return {
                ...state,
                name: action.boardTitle
            };
        }
        default:
            return state;
    }
};

export default boardReducer;
