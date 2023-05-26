import React, {useState} from 'react';
import {Icon, Typography, Paper, Button, Menu, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none'
    },
    linkContent: {
        color: 'lightgray',
        fontSize: '2em'
    }
}));

function CardAttachment(props)
{
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    function handleMenuOpen(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose()
    {
        setAnchorEl(null);
    }

    if (props.item.type.indexOf('image') >= 0) {
        return (
            <div className="flex w-full sm:w-1/2 mb-16" key={props.item.id}>
                <div className="flex items-center justify-center w-128 h-128 mr-16">
                    <Paper className="rounded-4 overflow-hidden" elevation={1}>
                        <a href={props.item.src} target={'_blank'}>
                            <img className="block max-h-full max-h-full" src={props.item.thumbnail} alt="attachment"/>
                        </a>
                    </Paper>
                </div>
                <div className="flex flex-auto flex-col justify-center items-start min-w-0">
                    <div className="flex items-center w-full">
                        <Typography className="text-16 font-600 truncate flex-shrink">{props.item.name}</Typography>
                        {props.cover === props.item.id && (
                            <Icon className="text-orange-light text-20 ml-4">star</Icon>
                        )}
                    </div>
                    <Typography className="truncate w-full mb-12" color="textSecondary">
                        {props.item.time.slice(0, 10)}
                    </Typography>
                    <Button
                        aria-owns={anchorEl ? 'actions-menu' : null}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        variant="outlined"
                        size="small"
                    >
                        Actions
                        <Icon className="text-20">arrow_drop_down</Icon>
                    </Button>
                    <Menu
                        id="actions-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {props.cover !== props.item.id ? (
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose();
                                    props.makeCover(props.item.id);
                                }}
                            >
                                Make Cover
                            </MenuItem>
                        ) : (
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose();
                                    props.removeCover();
                                }}
                            >
                                Remove Cover
                            </MenuItem>
                        )}
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                props.removeAttachment(props.item.id);
                            }}
                        >
                            Remove Attachment
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex w-full sm:w-1/2 mb-16" key={props.item.id}>
                <a href={props.item.src} target={'_blank'} className={classes.link}>
                    <Paper className="min-w-128 w-128 h-128 mr-16 flex items-center justify-center rounded-4 overflow-hidden" elevation={1}>
                        <Typography className={clsx("font-600", classes.linkContent)}>
                            {props.item.type.slice(props.item.type.indexOf('/') + 1).toUpperCase()}
                        </Typography>
                    </Paper>
                </a>
                <div className="flex flex-auto flex-col justify-center items-start min-w-0">
                    <Typography className="text-16 font-600 truncate w-full">{props.item.url}</Typography>
                    <Typography className="truncate w-full mb-12" color="textSecondary">
                        {props.item.time.slice(0, 10)}
                    </Typography>
                    <Button
                        aria-owns={anchorEl ? 'actions-menu' : null}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        variant="outlined"
                        size="small"
                    >
                        Actions
                        <Icon className="text-20">arrow_drop_down</Icon>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                props.removeAttachment(props.item.id);
                            }}
                        >
                            Remove Attachment
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        )
    }
}

export default CardAttachment;
