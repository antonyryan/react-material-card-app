import React from 'react';
import {Redirect} from 'react-router-dom';

const Board = React.lazy(() => import('./board/Board'));

export const ScrumboardAppConfig = {
    settings: {
        layout: {}
    },
    lists: [
        'new', 'info', 'prov', 'tech', 'sell', 'warehouse', 'suspended', 'ready', 'sent'
    ],
    routes  : [
        {
            // path     : '/apps/scrumboard/boards/:boardId/:boardUri?',
            path     : '/board',
            component: Board
        }
        /*
        {
            path     : '/apps/scrumboard/boards',
            component: React.lazy(() => import('./boards/Boards'))
        },
        {
            path     : '/apps/scrumboard',
            component: () => <Redirect to="/apps/scrumboard/boards"/>
        }
        */
    ]
};
