// import {authRoles} from 'app/auth';

const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'scrumboard',
                'title': 'Scrumboard',
                'type' : 'item',
                'icon' : 'assessment',
                'url'  : '/apps/scrumboard'
            }
        ]
    }
];

export default navigationConfig;
