const AppConsts = {
    userManagement: {
        defaultAdminUserName: 'admin',
    },
    localization: {
        defaultLocalizationSourceName: 'cardinallms',
    },
    authorization: {
        encrptedAuthTokenName: 'enc_auth_token',
    },
    appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
    remoteServiceBaseUrl: process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
    userCookieName: 'Lms.LoginUser',
    tokenCookieName: 'Lms.AuthToken',
    usercookieExpDays: 1,
    encdecSecretKey: "P%T1<-:1$n!O189r^e",
    pagesize: 50,
    dateFormat: 'YYYY/MM/DD',
    datetimeFormat: 'YYYY-MM-DD hh:mm A',
    oigCheckURL: 'https://google.com'
};
export default AppConsts;
