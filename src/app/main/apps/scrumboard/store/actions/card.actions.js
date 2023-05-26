import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const OPEN_CARD_DIALOG = '[SCRUMBOARD APP] OPEN CARD DIALOG';
export const CLOSE_CARD_DIALOG = '[SCRUMBOARD APP] CLOSE CARD DIALOG';
export const UPDATE_CARD = '[SCRUMBOARD APP] UPDATE CARD';
export const REMOVE_CARD = '[SCRUMBOARD APP] REMOVE CARD';

export function openCardDialog(data)
{
    return {
        type   : OPEN_CARD_DIALOG,
        payload: data
    }
}

export function closeCardDialog()
{
    return {
        type: CLOSE_CARD_DIALOG
    }
}

export function updateCard(card)
{
    return (dispatch) => {
        const detail = {};
        const fields = ['idMembers', 'idLabels', 'attachments', 'activities', 'idAttachmentCover'];

        fields.forEach(field => {
            if (card[field]) {
                detail[field] = card[field];
            }   
        });

        detail['orderlists'] = card['orderlists']
        detail['checklists'] = card['checklists']

        const request = axios.post('/api/card/add', {
            id_card: card.id,
            title: card.name,
            description: card.description,
            due_date: card.due,
            detail
        });

        dispatch({
            type: CLOSE_CARD_DIALOG
        });

        return request.then(
            (response) => {
                dispatch(showMessage({
                    message         : 'Card Saved',
                    autoHideDuration: 2000,
                    anchorOrigin    : {
                        vertical  : 'top',
                        horizontal: 'right'
                    }
                }));

                return dispatch({
                    type   : UPDATE_CARD,
                    payload: card
                })
            });
    }
}

export function removeCard(cardId)
{
    return (dispatch) => {
        dispatch({
            type: CLOSE_CARD_DIALOG
        });
        
        const request = axios.post('/api/card/del', {
            id_card: cardId
        });

        return request.then((response) =>
            dispatch({
                type: REMOVE_CARD,
                payload: cardId
            })
        );
    };
}
