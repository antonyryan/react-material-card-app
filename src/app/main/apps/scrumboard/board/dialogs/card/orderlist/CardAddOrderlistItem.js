import React from 'react';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { useForm } from '@fuse/hooks';
import OrderlistItemModel from 'app/main/apps/scrumboard/model/OrderlistItemModel';

function CardAddChecklistItem(props)
{
    const {form, handleChange, resetForm} = useForm(
        {
            name: '',
            qty: '',
            price: '',
            tot: ''
        }
    );

    function isFormInValid()
    {
        return form.name === '' ||
            form.qty === '' ||
            form.price === '' ||
            form.tot === '' ||
            parseFloat(form.qty) < 0 ||
            parseFloat(form.price) < 0 ||
            parseFloat(form.tot) < 0 ||
            !Number.isInteger(parseFloat(form.qty))
    }

    function handleSubmit()
    {
        if ( isFormInValid() )
        {
            return;
        }
        props.onOrderItemAdd(new OrderlistItemModel(form));
        resetForm();
    }

    return (
        <tr>
            <td></td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="name"
                    margin="dense"
                    value={form.name}
                    onKeyUp={e => e.which === 13 && handleSubmit()}
                    onChange={handleChange}
                    variant="outlined"
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="qty"
                    margin="dense"
                    value={form.qty}
                    onChange={handleChange}
                    onKeyUp={e => e.which === 13 && handleSubmit()}
                    inputProps={{type: 'number'}}
                    variant="outlined"
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="price"
                    margin="dense"
                    value={form.price}
                    onChange={handleChange}
                    onKeyUp={e => e.which === 13 && handleSubmit()}
                    inputProps={{type: 'number'}}
                    variant="outlined"
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="tot"
                    margin="dense"
                    value={form.tot}
                    onChange={handleChange}
                    inputProps={{type: 'number'}}
                    onKeyUp={e => e.which === 13 && handleSubmit()}
                    variant="outlined"
                />
            </td>
            <td className='text-center'>
                <Fab
                    aria-label="Add"
                    size="small"
                    color="secondary"
                    onClick={handleSubmit}
                    disabled={isFormInValid()}
                >
                    <Icon>add</Icon>
                </Fab>
            </td>
        </tr>
    );
}

export default CardAddChecklistItem;
