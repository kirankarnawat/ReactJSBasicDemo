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
        parentFeatureId: ''
    },

    {
        featureId: 'Dashboard',
        title: 'Dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        parentFeatureId: '',
        className: 'dashboardmenuicon',
        showInMenu: true,
        displayOrder: 0,
        component: LoadableComponent(() => import('../../scenes/Dashboard')),
    },

    {
        featureId: 'UserManagement',
        title: 'Users',
        name: 'User Management',
        path: '/users',
        parentFeatureId: '',
        className: 'usermenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },
    {
        featureId: 'ContentManagement',
        title: 'Content Repository',
        name: 'Content Repository',
        path: '/ContentRepository',
        parentFeatureId: '',
        className: 'contrepomenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
    {
        featureId: 'AssignmentRules',
        title: 'AssignmentRules',
        name: 'AssignmentRules',
        path: '#',
        parentFeatureId: '',
        className: 'contrepomenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },

    {
        featureId: 'SystemLogs',
        title: 'System Logs',
        name: 'SystemLogs',
        path: '#',
        parentFeatureId: '',
        className: 'contrepomenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },

    {
        featureId: 'ManageUsers',
        title: 'Manage Users',
        name: 'ManageUsers',
        path: '/users',
        parentFeatureId: 'UserManagement',
        className: 'groupmenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },
    {
        featureId: 'ErrorLogs',
        title: 'Error Logs',
        name: 'ErrorLogs',
        path: '#',
        parentFeatureId: 'SystemLogs',
        className: 'groupmenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users')),
    },
    {
        featureId: 'BulkImportHistory',
        title: 'Bulk Import History',
        name: 'BulkImportHistory',
        path: '/bulkImportHistory',
        parentFeatureId: 'UserManagement',
        className: 'contrepomenuicon',
        showInMenu: true,
        displayOrder: 1,
        component: LoadableComponent(() => import('../../scenes/Users/components/bulkImportHistory')),
    },

    {
        featureId: 'EmailLogs',
        title: 'Email Logs',
        name: 'EmailLogs',
        path: '#',
        parentFeatureId: 'SystemLogs',
        className: 'groupmenuicon',
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

    //content repository dashboard items
    {
        featureId: "ManageCourse",
        name: "SCORM 1.2",
        title: "Manage Course",
        path: '/course',
        class: 'scormLi',
        icon: 'SCORM.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository/components/course')),
    },
    {
        featureId: "ManageTemplates",
        name: "Manual Templates",
        title: "Manage Templates",
        path: '/bulkImportHistory',
        class: 'manualTemp',
        icon: 'manual-templates.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
    {
        featureId: "ManageAssessment",
        name: "Quiz/Assessments",
        title: "Manage Assessment",
        path: '/bulkImportHistory',
        class: 'quizAss',
        icon: 'quiz.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
    {
        featureId: "ManageSurveys",
        name: "Surveys",
        title: "Manage Survey",
        path: '/bulkImportHistory',
        class: 'survey',
        icon: 'survey.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
    {
        featureId: "ManageMedia",
        name: "Media",
        title: "Manage Media",
        path: '/bulkImportHistory',
        class: 'mediaBox',
        icon: 'media.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
    {
        featureId: "ManageWebinar",
        name: "Events",
        title: "Manage Events",
        path: '/bulkImportHistory',
        class: 'events',
        icon: 'events.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
    {
        featureId: "ManageNewsLetter",
        name: "NewsLetter",
        title: "Manage Newsletter",
        path: '/bulkImportHistory',
        class: 'newsletter',
        icon: 'newsletter.png',
        showInMenu: false,
        parentFeatureId: 'ContentManagement',
        component: LoadableComponent(() => import('../../scenes/ContentRepository')),
    },
];

export const routers = [...userRouter, ...appRouters];
