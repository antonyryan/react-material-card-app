import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {FuseSplashScreen} from '@fuse';
import * as Actions from './store/actions';
import {useDispatch} from 'react-redux';

function Activate(props)
{
    const dispatch = useDispatch();
    const { history, match } = props;
    const { activationCode } = match.params;

    useEffect(() => {
        dispatch(Actions.activate(activationCode))
            .then(() => {
                history.push('/board');
            });
    }, [dispatch, history, activationCode]);
    

    return (
        <FuseSplashScreen/>
    );
}

export default withRouter(Activate);
