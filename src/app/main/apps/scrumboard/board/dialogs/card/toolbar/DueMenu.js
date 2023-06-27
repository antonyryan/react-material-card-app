import React, {useState} from 'react';
import {
    Icon,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField
} from '@material-ui/core';
import {DatePicker} from "@material-ui/pickers";
import ToolbarMenu from './ToolbarMenu';
import moment from 'moment';

function DueMenu(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const [dateOpen, setDateOpen] = useState(false);
    const dueDate = props.due ? props.due : new Date();

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
                <Icon>today</Icon>
            </IconButton>
            {anchorEl && (
                <ToolbarMenu state={anchorEl} onClose={dateOpen ? () => {} : handleMenuClose}>
                    {props.due ? (
                        <MenuItem
                            onClick={(ev) => {
                                props.onRemoveDue();
                                handleMenuClose(ev);
                            }}
                        >
                            Remove Due Date
                        </MenuItem>
                    ) : (
                        <div className="p-16">
                            <DatePicker
                                ampm={false}
                                label="Due date"
                                inputVariant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={v => {
                                    const e = { target: { name: 'due', type: 'date', value: v } };
                                    handleMenuClose();
                                    props.onDueChange(e);
                                }}
                                onOpen={() => setDateOpen(true)}
                                onClose={() => setDateOpen(false)}
                                placeholder="Choose a due date"
                                value={dueDate}
                                fullWidth
                                showTodayButton
                                format="dd/MM/yyyy"
                            />
                            {/* <TextField
                                label="Due date"
                                type="date"
                                name="due"
                                value={dueDate}
                                onChange={(ev) => {
                                    props.onDueChange(ev);
                                    handleMenuClose(ev)
                                }}
                                placeholder=" Choose a due date"
                                className=""
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon color="action">today</Icon>
                                        </InputAdornment>
                                    )
                                }}
                            /> */}
                        </div>
                    )}
                </ToolbarMenu>              
            )}
        </div>
    );
}

export default DueMenu;
