import LoadableComponent from './../Loadable/index';

export const userRouter: any = [
    {
        path: '/user',
        name: 'user',
        title: 'User',
        component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
        isLayout: true,
        showInMenu: false,
    },
    {
        path: '/user/login',
        name: 'login',
        title: 'LogIn',
        component: LoadableComponent(() => import('../../scenes/Login')),
        showInMenu: false,
    },
];

export const appRouters: any = [
    {
        path: '/',
        exact: true,
        name: 'home',
        title: 'Home',
        icon: 'home',
        component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
        isLayout: true,
        showInMenu: false,
        parentFeatureId : ''
    },

    {
        featureId: 'Dashboard',
        title: 'Dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        parentFeatureId: '',
        icon: 'home',
        showInMenu: true,
        displayOrder: 0,
        component: LoadableComponent(() => import('../../scenes/Dashboard')),
    },

    {
        featureId: 'UserManagement',
        title: 'User Management',
        name: 'User Management',
        path: '#',
        parentFeatureId: '',
        icon: 'user',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },

    {
        featureId: 'ManageUsers',
        title: 'Manage Users',
        name: 'Manage Users',
        path: '/users',
        parentFeatureId: 'UserManagement',
        icon: 'user',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },
    {
        featureId: 'RoleManagement',
        title: 'Role Management',
        name: 'Role Management',
        path: '#',
        parentFeatureId: '',
        icon: 'tag',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },

    {
        path: '/logout',
        title: 'Logout',
        name: 'logout',
        icon: 'info-circle',
        showInMenu: false,
        component: LoadableComponent(() => import('../../components/Logout')),
    },
    {
        path: '/exception',
        title: 'exception',
        name: 'exception',
        icon: 'info-circle',
        showInMenu: false,
        component: LoadableComponent(() => import('../../scenes/Exception')),
    },
];

export const routers = [...userRouter, ...appRouters];
