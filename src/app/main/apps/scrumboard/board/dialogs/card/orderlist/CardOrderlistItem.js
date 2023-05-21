import {Icon, IconButton, TextField, Checkbox, ListItem} from '@material-ui/core';
import React from 'react';
import {useForm, useUpdateEffect} from '@fuse/hooks';

function CardOrderlistItem(props)
{
    const {item, index, onOrderItemChange} = props;
    const {form, handleChange, handleCustomChange} = useForm(item);

    useUpdateEffect(() => {
        onOrderItemChange(form, index);
    }, [form, onOrderItemChange]);

    if ( !form )
    {
        return null;
    }

    return (
        <tr>
            <td>
                <Checkbox
                    checked={form.checked}
                    name="checked"
                    onChange={handleChange}
                    tabIndex={-1}
                    disableRipple
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="code"
                    margin="dense"
                    value={form.code}
                    onChange={handleChange}
                    variant="outlined"
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="name"
                    margin="dense"
                    value={form.name}
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
                    inputProps={{type: 'number', min: 0}}
                    onChange={handleCustomChange(e => parseInt(e.target.value))}
                    variant="outlined"
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="price"
                    margin="dense"
                    value={form.price}
                    inputProps={{type: 'number', min: 0}}
                    onChange={handleChange}
                    variant="outlined"
                />
            </td>
            <td>
                <TextField
                    className="flex flex-1 mx-8"
                    name="tot"
                    margin="dense"
                    value={Math.round(form.price * form.qty * 100) / 100}
                    variant="outlined"
                />
            </td>
            <td className={'text-center'}>
                <IconButton aria-label="Delete" onClick={props.onOrderItemRemove}>
                    <Icon>delete</Icon>
                </IconButton>
            </td>
        </tr>
    );
}

export default CardOrderlistItem;
