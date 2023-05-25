import React, {useState} from 'react';
import {Icon, IconButton, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';

function OptionsMenu(props)
{
    const [anchorEl, setAnchorEl] = useState(null);

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
        props.onRemoveCard();
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
        </div>
    );
}

export default OptionsMenu;
