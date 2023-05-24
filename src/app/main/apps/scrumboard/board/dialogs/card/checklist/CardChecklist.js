import React, {useState, useCallback} from 'react';
import {Icon, Typography, Menu, MenuItem, LinearProgress, List, ListItemText, ListItemIcon, IconButton} from '@material-ui/core';
import CardChecklistItem from './CardChecklistItem';
import CardAddChecklistItem from './CardAddChecklistItem';
import _ from '@lodash';
import {useForm, useUpdateEffect} from '@fuse/hooks';

function CardChecklist(props)
{
    const {onCheckListChange, checklist} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const {form, setForm, setInForm} = useForm(checklist);

    useUpdateEffect(() => {
        onCheckListChange(form);
    }, [form, onCheckListChange]);

    function handleMenuOpen(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose()
    {
        setAnchorEl(null);
    }

    const handleListItemChange = useCallback((item, index) => {
        setInForm(`[${index}]`, item);
    }, [setInForm]);

    function handleListItemRemove(id)
    {
        setForm(_.reject(form, {id}));
    }

    function checkItemsChecked()
    {
        return form.filter(({ checked }) => checked).length;
    }

    function handleListItemAdd(item)
    {
        setForm([...form, item]);
    }

    if ( !form )
    {
        return null;
    }

    return (
        <div className="mb-24">

            <div className="flex items-center justify-between mt-16 mb-12">
                <div className="flex items-center">
                    <Icon className="text-20 mr-8">check_box</Icon>
                    <Typography className="text-16 font-600">Checklist</Typography>
                </div>
                <div className="">
                    <IconButton
                        aria-owns={anchorEl ? 'actions-menu' : null}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        variant="outlined"
                        size="small"
                    >
                        <Icon className="text-20">more_vert</Icon>
                    </IconButton>
                    <Menu
                        id="actions-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => props.onRemoveCheckList()}>
                            <ListItemIcon className="min-w-40">
                                <Icon>delete</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Remove Checklist"/>
                        </MenuItem>
                        {/* <MenuItem onClick={handleOpenNameForm}>
                            <ListItemIcon className="min-w-40">
                                <Icon>edit</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Rename Checklist"/>
                        </MenuItem> */}
                    </Menu>
                </div>
            </div>

            <div className="">
                <div className="flex items-center pl-16">
                    <Typography className="flex font-600 mr-12">
                        {checkItemsChecked() + ' / ' + form.length}
                    </Typography>
                    <LinearProgress
                        className="flex flex-1"
                        variant="determinate"
                        color="secondary"
                        value={100 * checkItemsChecked() / form.length}
                    />
                </div>
                <List className="">
                    {form.map((checkItem, index) => (
                        <CardChecklistItem
                            item={checkItem}
                            key={checkItem.id}
                            index={index}
                            onListItemChange={handleListItemChange}
                            onListItemRemove={() => handleListItemRemove(checkItem.id)}
                        />
                    ))}
                    <CardAddChecklistItem
                        onListItemAdd={handleListItemAdd}
                    />
                </List>
            </div>
        </div>
    )
}

export default CardChecklist;
