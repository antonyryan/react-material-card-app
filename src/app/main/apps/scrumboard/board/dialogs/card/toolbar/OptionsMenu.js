import React, {useState} from 'react';
import {Icon, IconButton, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToolbarMenu from './ToolbarMenu';

function OptionsMenu(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleMenuOpen(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose()
    {
        setAnchorEl(null);
    }

    function handleRemoveCard()
    {
        handleMenuClose();
        setConfirmDelete(true);
    }

    function handleDeleteClick()
    {
        setConfirmDelete(false);
        props.onRemoveCard();
    }

    function handleClose()
    {
        setConfirmDelete(false);
    }

    return (
        <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <Icon>more_horiz</Icon>
            </IconButton>
            {anchorEl && (
                <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
                    <MenuItem onClick={handleRemoveCard}>
                        Remove Card
                    </MenuItem>
                </ToolbarMenu>
            )}

            <Dialog
                open={confirmDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you going to delete this card?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClick} color="primary">
                    Yes
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default OptionsMenu;
