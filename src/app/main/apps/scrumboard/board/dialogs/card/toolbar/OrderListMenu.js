import React, {useState} from 'react';
import {Icon, IconButton, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';

function OrderListMenu(props)
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

    return (
        <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <Icon>shopping_cart</Icon>
            </IconButton>
            {anchorEl && 
                <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
                    <MenuItem onClick={e => {
                        handleMenuClose();
                        props.onToggleOrderlist(!props.orderlist);
                    }}>
                        {props.orderlist ? 'Remove Items in Order' : 'Add Items in Order'}
                    </MenuItem>
                </ToolbarMenu>
            }
        </div>
    );
}

export default OrderListMenu;
