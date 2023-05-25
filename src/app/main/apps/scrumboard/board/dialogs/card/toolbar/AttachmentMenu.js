import React, {useState} from 'react';
import {Icon, IconButton, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';

function AttachmentMenu(props)
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
                <Icon>attachment</Icon>
            </IconButton>
            {anchorEl && 
                <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
                    {/* <form onSubmit={handleSubmit} className="p-16 flex flex-col items-end">
                        <TextField
                            label="Checklist title"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            className="mb-12"
                            variant="outlined"
                            required
                            autoFocus
                        />
                        <Button
                            color="secondary"
                            type="submit"
                            disabled={isFormInvalid()}
                            variant="contained"
                        >
                            Add
                        </Button>
                    </form>
                    <MenuItem onClick={e => {
                        handleMenuClose();
                        props.onToggleOrderlist(!props.orderlist);
                    }}>
                        Add New
                    </MenuItem> */}
                </ToolbarMenu>
            }
        </div>
    );
}

export default AttachmentMenu;
