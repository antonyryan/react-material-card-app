import React, {useEffect, useRef, useState} from 'react';
import {Divider, Icon, IconButton, Input, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography} from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import {makeStyles} from '@material-ui/styles';
import * as UserActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {FuseUtils, FuseAnimateGroup} from '@fuse';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import amber from '@material-ui/core/colors/amber';
import clsx from 'clsx';

const useStyles = makeStyles({
    root   : {
        '&.horizontal': {},
        '&.vertical'  : {
            flexDirection: 'column'
        }
    },
    item   : {
        textDecoration: 'none!important',
        color         : 'inherit'
    },
    addIcon: {
        color: amber[600]
    },
    innerFilter: {
        minWidth: '150px',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    filter: {
        marginRight: '1em'
    }
});

function FuseShortcuts(props)
{
    const dispatch = useDispatch();
    const shortcuts = useSelector(({auth}) => auth.user.data.shortcuts);
    const navigationData = useSelector(({fuse}) => fuse.navigation);

    const classes = useStyles(props);
    const searchInputRef = useRef(null);
    const [addMenu, setAddMenu] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [navigation, setNavigation] = useState(null);
    const shortcutItems = shortcuts ? shortcuts.map(id => FuseUtils.findById(navigationData, id)) : [];

    const filterType = ['kinds', 'departments', 'users', 'customer'];
    const [filter, setFilter] = useState({});
    const [filterSelected, setFilterSelected]
        = useState(Object.assign(
            {},
            ...filterType.map(type => ({
                [type]: 0
            }))
        ));

    useEffect(
        () => setNavigation(FuseUtils.getFlatNavigation(navigationData)),
        [props.location, navigationData]
    );

    useEffect(() => {
        dispatch(() => {
            Promise.all(filterType.map(type => {
                const request = type === 'customer'
                    ? axios.get('/api/board/users', { params: { department: 'customer' } })
                    : axios.get(`/api/board/${type}`);
                return new Promise((resolve, reject) =>
                    request.then(({ data }) =>
                        resolve( type === 'users' || type === 'customer'
                            ? { [type]: data.users.map(({ id_user, name, lastname }) =>
                                ({ code: id_user, label: `${name} ${lastname}` })) }
                            : data )));
            })).then(data => setFilter(Object.assign({}, ...data)));
        });
    }, []);

    function handleFilterChange(type)
    {
        return e => {
            const newFilterSelected = { ...filterSelected, [type]: e.target.value };

            if (e.target.value !== filterSelected[type]) {
                const param = {};
                for (let p in newFilterSelected) {
                    if (newFilterSelected[p] !== 0) {
                        param[p] = newFilterSelected[p];
                    }
                }
                props.onFilterSelected(param);
            }
            
            setFilterSelected(newFilterSelected);
        };
    }

    function addMenuClick(event)
    {
        setAddMenu(event.currentTarget);
    }

    function addMenuClose()
    {
        setAddMenu(null);
    }

    function search(ev)
    {
        const searchText = ev.target.value;
        setSearchText(searchText);

        if ( searchText.length !== 0 && navigation )
        {
            setSearchResults(navigation.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
            return;
        }
        setSearchResults(null);
    }

    function toggleInShortcuts(id)
    {
        let newShortcuts = [...shortcuts];
        newShortcuts = newShortcuts.includes(id) ? newShortcuts.filter(_id => id !== _id) : [...newShortcuts, id];
        dispatch(UserActions.updateUserShortcuts(newShortcuts));
    }

    function ShortcutMenuItem({item, onToggle})
    {
        return (
            <Link to={item.url} className={classes.item}>
                <MenuItem key={item.id}>
                    <ListItemIcon className="min-w-40">
                        {item.icon ?
                            (
                                <Icon>{item.icon}</Icon>
                            ) :
                            (
                                <span className="text-20 font-bold uppercase text-center">{item.title[0]}</span>
                            )
                        }
                    </ListItemIcon>
                    <ListItemText className="pl-0" primary={item.title}/>
                    <IconButton
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            onToggle(item.id);
                        }}
                    >
                        <Icon color="action">{shortcuts.includes(item.id) ? 'star' : 'star_border'}</Icon>
                    </IconButton>
                </MenuItem>
            </Link>
        );
    }

    return (
        <div className={clsx(classes.root, props.variant, "flex flex-1", props.variant === "vertical" && "flex-grow-0 flex-shrink", props.className)}>

            <FuseAnimateGroup
                enter={{
                    animation: "transition.expandIn"
                }}
                className={clsx("flex flex-1", props.variant === "vertical" && "flex-col")}
            >
                {shortcutItems.map(item => item && (
                    <Link to={item.url} key={item.id} className={classes.item}>
                        <Tooltip title={item.title} placement={props.variant === "horizontal" ? "bottom" : "left"}>
                            <IconButton className="w-40 h-40 p-0">
                                {item.icon ?
                                    (
                                        <Icon>{item.icon}</Icon>
                                    ) :
                                    (
                                        <span className="text-20 font-bold uppercase">{item.title[0]}</span>
                                    )
                                }
                            </IconButton>
                        </Tooltip>
                    </Link>
                ))}

                {filterType.map(type => (
                    <Select
                        key={type}
                        value={filterSelected[type]}
                        onChange={handleFilterChange(type)}
                        classes={{select: classes.innerFilter}}
                        className={classes.filter}
                        input={
                            <OutlinedInput
                                labelWidth={0}
                                name="age"
                                id="outlined-age-simple"
                            />
                        }
                    >
                        <MenuItem value={0}>
                            All
                        </MenuItem>

                        {filter[type] && filter[type].map(({ code, label }) => (
                            <MenuItem key={ code } value={ code }>
                                { label }
                            </MenuItem>
                        ))}
                    </Select>
                ))}

                {/* <Tooltip title="Click to add/remove shortcut" placement={props.variant === "horizontal" ? "bottom" : "left"}>
                    <IconButton
                        className="w-40 h-40 p-0"
                        aria-owns={addMenu ? 'add-menu' : null}
                        aria-haspopup="true"
                        onClick={addMenuClick}
                    >
                        <Icon className={classes.addIcon}>star</Icon>
                    </IconButton>
                </Tooltip> */}
            </FuseAnimateGroup>

            <Menu
                id="add-menu"
                anchorEl={addMenu}
                open={Boolean(addMenu)}
                onClose={addMenuClose}
                classes={{
                    paper: 'mt-48'
                }}
                onEntered={() => {
                    searchInputRef.current.focus();
                }}
                onExited={() => {
                    setSearchText('');
                }}>
                <div className="p-16 pt-8">
                    <Input
                        inputRef={searchInputRef}
                        value={searchText}
                        onChange={search}
                        placeholder="Search for an app or page"
                        className=""
                        fullWidth
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                    />
                </div>

                <Divider/>

                {searchText.length !== 0 && searchResults && searchResults.map(item => (
                    <ShortcutMenuItem
                        key={item.id}
                        item={item}
                        onToggle={() => toggleInShortcuts(item.id)}
                    />
                ))}

                {searchText.length !== 0 && searchResults.length === 0 && (
                    <Typography color="textSecondary" className="p-16 pb-8">No results..</Typography>
                )}

                {searchText.length === 0 && shortcutItems.map(item => item && (
                    <ShortcutMenuItem
                        key={item.id}
                        item={item}
                        onToggle={() => toggleInShortcuts(item.id)}
                    />
                ))}
            </Menu>
        </div>
    );
}

FuseShortcuts.propTypes = {};
FuseShortcuts.defaultProps = {
    variant: "horizontal"
};

export default React.memo(FuseShortcuts);
