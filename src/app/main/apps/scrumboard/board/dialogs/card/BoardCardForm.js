import React, {useCallback} from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';

import {FuseChipSelect} from '@fuse';
import {useForm, useDebounce} from '@fuse/hooks';
import _ from '@lodash';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/main/apps/scrumboard/store/actions/index';
import LabelModel from 'app/main/apps/scrumboard/model/LabelModel';
import CardAttachment from './attachment/CardAttachment';
import DueMenu from './toolbar/DueMenu';
import LabelsMenu from './toolbar/LabelsMenu';
import MembersMenu from './toolbar/MembersMenu';
import OrderListMenu from './toolbar/OrderListMenu';
import CheckListMenu from './toolbar/CheckListMenu';
import OptionsMenu from './toolbar/OptionsMenu';
import CardOrderlist from './orderlist/CardOrderlist';
import CardChecklist from './checklist/CardChecklist';
import CardActivity from './activity/CardActivity';
import CardComment from './comment/CardComment';


const useStyles = makeStyles(theme => ({
    saveButton: {
        margin: '1em',
        marginLeft: 0
    }
}));

function BoardCardForm(props)
{
    const dispatch = useDispatch();
    const card = useSelector(({scrumboardApp}) => scrumboardApp.card.data);
    const board = useSelector(({scrumboardApp}) => scrumboardApp.board);

    const {form: cardForm, handleChange, setForm, setInForm} = useForm(card);
    const updateCard = useDebounce(newCard => {
        dispatch(Actions.updateCard({...newCard}));
    }, 0);

    const dueDate = cardForm && cardForm.due ? moment(cardForm.due).format(moment.HTML5_FMT.DATE) : "";
    const classes = useStyles();

    function handleSaveClick()
    {
        updateCard(cardForm);
    }

    function removeDue()
    {
        setInForm('due', null);
    }

    function toggleLabel(labelId)
    {
        setInForm('idLabels', _.xor(cardForm.idLabels, [labelId]));
    }

    function toggleMember(memberId)
    {
        setInForm('idMembers', _.xor(cardForm.idMembers, [memberId]));
    }

    function setCheckList()
    {
        setInForm('checklists', []);
    }

    function toggleOrderList(show)
    {
        setInForm('orderlists', show ? [] : null);
    }

    function chipChange(name, value)
    {
        setInForm(name, value.map(item => item.value));
    }

    function addNewChip(name, value)
    {
        setInForm(name, [...cardForm[name], value]);
    }

    function makeCover(attachmentId)
    {
        setInForm('idAttachmentCover', attachmentId);
    }

    function removeCover()
    {
        setInForm('idAttachmentCover', '');
    }

    function removeAttachment(attachmentId)
    {
        setForm(
            {
                ...cardForm,
                attachments      : _.reject(cardForm.attachments, {id: attachmentId}),
                idAttachmentCover: cardForm.idAttachmentCover === attachmentId ? '' : cardForm.idAttachmentCover
            }
        );
    }

    const handleCheckListChange = useCallback(checklists => {
        setInForm('checklists', checklists);
    }, [setInForm]);

    const handleOrderListChange = useCallback(orderlists => {
        setInForm('orderlists', orderlists);
    }, [setInForm]);

    function removeCheckList(id)
    {
        if (id) {
            setInForm('checklists', _.reject(cardForm.checklists, { id }));
        } else {
            setInForm('checklists', null);
        }
    }

    function commentAdd(comment)
    {
        return setInForm('activities', [comment, ...cardForm.activities]);
    }

    return (
        <>
            <DialogTitle component="div" className="p-0">
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
                        <div className="flex flex-1 items-center">
                            <Button
                                variant='contained'
                                onClick={handleSaveClick}
                                className={classes.saveButton}    
                            >
                                Save
                            </Button>
                            <DueMenu
                                onDueChange={handleChange}
                                onRemoveDue={removeDue}
                                due={dueDate}
                            />

                            {board.labels && board.labels.length > 0 && (
                                <LabelsMenu
                                    onToggleLabel={toggleLabel}
                                    labels={board.labels}
                                    idLabels={cardForm.idLabels}
                                />
                            )}

                            <MembersMenu
                                onToggleMember={toggleMember}
                                members={board.members}
                                idMembers={cardForm.idMembers}
                            />
    
                            <OrderListMenu
                                orderlist={cardForm.orderlists}
                                onToggleOrderlist={toggleOrderList}
                            />

                            <IconButton color="inherit">
                                <Icon>attachment</Icon>
                            </IconButton>

                            <CheckListMenu
                                checklistAdded={!!cardForm.checklists}
                                onSetCheckList={setCheckList}
                                onRemoveCheckList={removeCheckList}
                            />

                            <OptionsMenu
                                onRemoveCard={() => dispatch(Actions.removeCard(cardForm.id))}
                            />

                        </div>
                        <IconButton color="inherit" onClick={ev => dispatch(Actions.closeCardDialog())}>
                            <Icon>close</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </DialogTitle>

            <DialogContent className="p-16 sm:p-24">
                <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
                    <div className="mb-16 sm:mb-0 flex items-center">
                        <Typography>{board.name}</Typography>
                        <Icon className="text-20" color="inherit">chevron_right</Icon>
                        {React.useMemo(() => {
                            const list = card ? _.find(board.lists, (_list) => _list.idCards.includes(card.id)) : null;

                            return (
                                <Typography>{list && list.name}</Typography>
                            )
                        }, [board, card])}
                    </div>

                    {cardForm.due && (
                        <TextField
                            label="Due date"
                            type="date"
                            name="due"
                            value={dueDate}
                            onChange={handleChange}
                            placeholder=" Choose a due date"
                            className="w-full sm:w-auto"
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
                        />
                    )}
                </div>

                <div className="flex items-center mb-24">
                    <TextField
                        label="Title"
                        type="text"
                        name="name"
                        value={cardForm.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {cardForm.subscribed && (
                                        <Icon className="text-20" color="action">remove_red_eye</Icon>
                                    )}
                                </InputAdornment>
                            )
                        }}
                    />
                </div>

                <div className="w-full mb-24">
                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows="4"
                        value={cardForm.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </div>

                <div className="flex flex-col sm:flex-row">
                    {cardForm.idLabels.length > 0 && (
                        <div className="flex-1 mb-24">
                            <div className="flex items-center mt-16 mb-12">
                                <Icon className="text-20 mr-8" color="inherit">label</Icon>
                                <Typography className="font-600 text-16">Labels</Typography>
                            </div>
                            <FuseChipSelect
                                className={cardForm.idMembers.length > 0 && 'sm:mr-8'}
                                value={
                                    cardForm.idLabels.map(labelId => {
                                        const label = _.find(board.labels, {id: labelId});
                                        return label && {
                                            value: labelId,
                                            label: label.name,
                                            class: label.class
                                        }
                                    })
                                }
                                onChange={(value) => chipChange('idLabels', value)}
                                placeholder="Select multiple Labels"
                                isMulti
                                textFieldProps={{
                                    variant: "outlined"
                                }}
                                options={board.labels.map((label) => (
                                    {
                                        value: label.id,
                                        label: label.name,
                                        class: label.class
                                    }
                                ))}
                                onCreateOption={(name) => {
                                    // Create New Label
                                    const newLabel = new LabelModel({name});

                                    // Ad new Label to board(redux store and server)
                                    dispatch(Actions.addLabel(newLabel));

                                    // Trigger handle chip change
                                    addNewChip('idLabels', newLabel.id);

                                    return newLabel.id;
                                }}
                            />
                        </div>
                    )}

                    {cardForm.idMembers.length > 0 && (
                        <div className="flex-1 mb-24">
                            <div className="flex items-center mt-16 mb-12">
                                <Icon className="text-20 mr-8" color="inherit">supervisor_account</Icon>
                                <Typography className="font-600 text-16">Members</Typography>
                            </div>
                            <FuseChipSelect
                                className={cardForm.idLabels.length > 0 && 'sm:ml-8'}
                                value={
                                    cardForm.idMembers.map(memberId => {
                                        const member = _.find(board.members, {id: memberId});
                                        return member && {
                                            value: member.id,
                                            label: (<Tooltip title={member.name}><Avatar className="-ml-12 w-32 h-32" src={member.avatar}/></Tooltip>)
                                        }
                                    })
                                }
                                onChange={(value) => chipChange('idMembers', value)}
                                placeholder="Select multiple Members"
                                isMulti
                                textFieldProps={{
                                    variant: "outlined"
                                }}
                                options={board.members.map((member) => (
                                    {
                                        value: member.id,
                                        label: (<span className="flex items-center"><Avatar className="w-32 h-32 mr-8" src={member.avatar}/>{member.name}</span>)
                                    }
                                ))}
                                variant="fixed"
                            />
                        </div>
                    )}
                </div>

                {!!cardForm.orderlists && (
                    <CardOrderlist
                        orderlist={cardForm.orderlists}
                        onOrderListChange={handleOrderListChange}
                    />
                )}

                {cardForm.attachments.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center mt-16 mb-12">
                            <Icon className="text-20 mr-8" color="inherit">attachment</Icon>
                            <Typography className="font-600 text-16">Attachments</Typography>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap">
                            {cardForm.attachments.map(item => (
                                <CardAttachment
                                    item={item}
                                    card={cardForm}
                                    makeCover={makeCover}
                                    removeCover={removeCover}
                                    removeAttachment={removeAttachment}
                                    key={item.id}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {!!cardForm.checklists && (
                    <CardChecklist
                        checklist={cardForm.checklists}
                        onCheckListChange={handleCheckListChange}
                        onRemoveCheckList={removeCheckList}
                    />
                )}

                <div className="mb-24">
                    <div className="flex items-center mt-16 mb-12">
                        <Icon className="text-20 mr-8" color="inherit">comment</Icon>
                        <Typography className="font-600 text-16">Comment</Typography>
                    </div>
                    <div>
                        <CardComment
                            members={board.members}
                            onCommentAdd={commentAdd}
                        />
                    </div>
                </div>

                {cardForm.activities.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center mt-16">
                            <Icon className="text-20 mr-8" color="inherit">list</Icon>
                            <Typography className="font-600 text-16">Activity</Typography>
                        </div>
                        <List className="">
                            {cardForm.activities.map(item => (
                                    <CardActivity
                                        item={item}
                                        key={item.id}
                                        members={board.members}
                                    />
                                )
                            )}
                        </List>
                    </div>
                )}
            </DialogContent>
        </>
    );
}

export default BoardCardForm;
