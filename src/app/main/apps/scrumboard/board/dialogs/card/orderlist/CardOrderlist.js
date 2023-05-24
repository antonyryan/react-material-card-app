import React, {useState, useCallback} from 'react';

import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';

import CardOrderlistItem from './CardOrderlistItem';
import CardAddOrderlistItem from './CardAddOrderlistItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useForm, useUpdateEffect} from '@fuse/hooks';
import _ from '@lodash';


const useStyles = makeStyles({
    orderListContainer: {
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',

        '&>div:first-child': {
            order: 1
        }
    },

    nameColumn: {
        width: '40%'
    },

    otherColumn: {
        minWidth: '50px'
    },

    actionIcon: {
        color: 'rgba(0, 0, 0, 0.54)'
    }
})

function CardOrderlist(props)
{
    const {onOrderListChange, orderlist} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const {form, setForm, setInForm} = useForm(orderlist);
    const classes = useStyles();

    useUpdateEffect(() => {
        onOrderListChange(form);
    }, [form, onOrderListChange]);


    function handleMenuOpen(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose()
    {
        setAnchorEl(null);
    }

    const handleOrderItemChange = useCallback((item, index) => {
        setInForm(`[${index}]`, item);
    }, [setInForm]);

    function handleOrderItemRemove(id)
    {
        setForm(_.reject(form, {id}));
    }

    function handleOrderItemAdd(item)
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
                    <Icon className="text-20 mr-8">shopping_cart</Icon>
                    <Typography className="font-600 text-16">Items in order</Typography>
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
                        <MenuItem onClick={() => setForm(null)}>
                            <ListItemIcon className="min-w-40">
                                <Icon>delete</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Remove Items in order"/>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className={classes.otherColumn}>Code</th>
                            <th className={classes.nameColumn}>Name</th>
                            <th className={classes.otherColumn}>Qty</th>
                            <th className={classes.otherColumn}>Price</th>
                            <th className={classes.otherColumn}>Tot</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {form.map((item, key) => (
                            <CardOrderlistItem
                                key={item.id}
                                item={item}
                                index={key}
                                onOrderItemChange={handleOrderItemChange}
                                onOrderItemRemove={() => handleOrderItemRemove(item.id)}
                            />
                        ))}
                        <CardAddOrderlistItem
                            onOrderItemAdd={handleOrderItemAdd}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CardOrderlist;
