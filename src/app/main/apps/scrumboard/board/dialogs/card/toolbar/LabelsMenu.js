import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import ToolbarMenu from './ToolbarMenu';

function LabelsMenu(props)
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
                <Icon>label</Icon>
            </IconButton>
            <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
                <div className="">
                    {props.labels && props.labels.map(label => {
                        return (
                            <MenuItem
                                className="px-8"
                                key={label.id}
                                onClick={(ev) => {
                                    props.onToggleLabel(label.id)
                                }}
                            >
                                <Checkbox checked={props.idLabels.includes(label.id)}/>
                                <ListItemText>
                                    {label.name}
                                </ListItemText>
                                <ListItemIcon className="min-w-40 ml-5">
                                    <Icon>label</Icon>
                                </ListItemIcon>
                            </MenuItem>
                        );
                    })}
                </div>
            </ToolbarMenu>
        </div>
    );
}

export default LabelsMenu;
