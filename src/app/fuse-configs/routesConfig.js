import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {appsConfigs} from 'app/main/apps/appsConfigs';
// import {UserInterfaceConfig} from 'app/main/user-interface/UserInterfaceConfig';
import {CallbackConfig} from 'app/main/callback/CallbackConfig';

const routeConfigs = [
    ...appsConfigs,
    // UserInterfaceConfig,
    CallbackConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/apps/scrumboard/boards"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;
