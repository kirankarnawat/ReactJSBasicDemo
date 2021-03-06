var lms = lms || {};

(function () {

    /* Application paths *****************************************/

    //Current application root path (including virtual directory if exists).
    lms.appPath = lms.appPath || '/';
    lms.pageLoadTime = new Date();

    //Converts given path to absolute path using lms.appPath variable.
    lms.toAbsAppPath = function (path) {
        if (path.indexOf('/') == 0) {
            path = path.substring(1);
        }
        return lms.appPath + path;
    };


    /* API MODULE ***************************************************/

    // #region LOGIN MODULE API

    //API Namespace
    lms.login = lms.login || {};

    //API ENUM
    lms.login.APIType = {

        USERLOGIN: 'USERLOGIN',
        USERSALT: 'USERSALT',
    };

    //API Path
    lms.login.toAPIPath = function (type) {
        var path = '';
        switch (type) {
            case lms.login.APIType.USERLOGIN:
                path = '/user/login';
                break;
            case lms.login.APIType.USERSALT:
                path = '/user/getsalt';
                break;
        }
        return path;
    };

    // #endregion


    // #region USER MODULE API

    //API Namespace
    lms.user = lms.user || {};

    //API ENUM
    lms.user.APIType = {

        USERLIST: 'USERLIST',
        USERENTITYLIST: 'USERENTITYLIST',
        USERJOBCODES: 'USERJOBCODES',
        ADDEDITUSER: 'ADDEDITUSER',
        CHECKOIG: 'CHECKOIG',
        USERDATABYID: 'USERDATABYID',
        USEREMAILCHECK: 'USEREMAILCHECK',
        USERLOGINIDCHECK: 'USERLOGINIDCHECK',
        USERBULKIMPORTMASTER: 'USERBULKIMPORTMASTER',
        USEREXCELTEMPLATE: 'USEREXCELTEMPLATE',
        USERBULKUPLOAD: 'USERBULKUPLOAD',
        USERBULKIMPORTLOGRESPONSE: 'USERBULKIMPORTLOGRESPONSE',
        SAVEOIGUSERS: 'SAVEOIGUSERS',
        USERBULKIMPORTSTATUS: 'USERBULKIMPORTSTATUS',
        USERBULKIMPORTLSTALL: 'USERBULKIMPORTLSTALL',
        GETBULKIMPORTUPLOADEDFILE: 'GETBULKIMPORTUPLOADEDFILE',
        EXPORTUSERDATA: 'EXPORTUSERDATA',
        USERCHANGEPWD: 'USERCHANGEPWD',
    };

    //API Path
    lms.user.toAPIPath = function (type) {
        var path = '';
        switch (type) {
            case lms.user.APIType.USERLIST:
                path = '/user/userlist';
                break;
            case lms.user.APIType.USERENTITYLIST:
                path = '/entity/entitylist';
                break;
            case lms.user.APIType.USERJOBCODES:
                path = '/user/getlookups';
                break;
            case lms.user.APIType.ADDEDITUSER:
                path = '/user/addedituser';
                break;
            case lms.user.APIType.CHECKOIG:
                path = '/user/checkoig';
                break;
            case lms.user.APIType.USERDATABYID:
                path = '/user/getuserdata';
                break;
            case lms.user.APIType.USEREMAILCHECK:
                path = '/user/isemailinuse';
                break;
            case lms.user.APIType.USERLOGINIDCHECK:
                path = '/user/isloginidinuse';
                break;
            case lms.user.APIType.USEREXCELTEMPLATE:
                path = '/user/getusertemplateexcel'
                break;
            case lms.user.APIType.USERBULKUPLOAD:
                path = '/user/uploaduserimport'
                break;
            case lms.user.APIType.USERBULKIMPORTLOGRESPONSE:
                path = '/user/bulkimportlogs'
                break;
            case lms.user.APIType.SAVEOIGUSERS:
                path = '/user/saveoigusers'
                break;
            case lms.user.APIType.USERBULKIMPORTSTATUS:
                path = '/lookup/getlookupbytype';
                break;
            case lms.user.APIType.USERBULKIMPORTLSTALL:
                path = '/user/bulkimportlistall';
                break;
            case lms.user.APIType.GETBULKIMPORTUPLOADEDFILE:
                path = '/user/getbulkimportuploadedfile';
                break;
            case lms.user.APIType.EXPORTUSERDATA:
                path = '/user/exportuserdata';
                break;
            case lms.user.APIType.USERCHANGEPWD:
                path = '/user/changepassword';
                break;
        }
        return path;
    };

    // #endregion


    // #region CONTENT REPOSITORY COURSE MODULE API

    //API Namespace
    lms.course = lms.course || {};

    //API ENUM
    lms.course.APIType = {

        CONTENTREPOSITORYCOUNT: 'CONTENTREPOSITORYCOUNT',
        GETALLCOURSES: 'GETALLCOURSES',
        GETCOURSELOOKUPS: 'GETCOURSELOOKUPS',
        ADDEDITCOURSE: 'ADDEDITCOURSE',
        UPLOADCOURSE: 'UPLOADCOURSE',
        GETCOURSE: 'GETCOURSE',
        ISCOURSENAMEINUSE: 'ISCOURSENAMEINUSE',
        ISCOURSEKEYWORDINUSE: 'ISCOURSEKEYWORDINUSE',
        ADDCOURSEKEYWORD: 'ADDCOURSEKEYWORD',
        DELCOURSEKEYWORD: 'DELCOURSEKEYWORD',

    };

    //API Path
    lms.course.toAPIPath = function (type) {
        var path = '';
        switch (type) {
            case lms.course.APIType.CONTENTREPOSITORYCOUNT:
                path = '/course/contentrepositorycount';
                break;
            case lms.course.APIType.GETALLCOURSES:
                path = '/course/getallcourse';
                break;
            case lms.course.APIType.GETCOURSELOOKUPS:
                path = '/course/getlookups';
                break;
            case lms.course.APIType.ADDEDITCOURSE:
                path = '/course/addeditcourse';
                break;
            case lms.course.APIType.UPLOADCOURSE:
                path = '/course/uploadcourse';
                break;
            case lms.course.APIType.GETCOURSE:
                path = '/course/getcourse';
                break;
            case lms.course.APIType.ISCOURSENAMEINUSE:
                path = '/course/iscoursenameinuse';
                break;
            case lms.course.APIType.ISCOURSEKEYWORDINUSE:
                path = '/course/iscoursekeywordused';
                break;
            case lms.course.APIType.ADDCOURSEKEYWORD:
                path = '/course/addcoursekeyword';
                break;
            case lms.course.APIType.DELCOURSEKEYWORD:
                path = '/course/deletecoursekeyword';
                break;
        }
        return path;
    };

    // #endregion


    // #region GROUP MODULE API

    //API Namespace
    lms.group = lms.group || {};

    //API ENUM
    lms.group.APIType = {

        GETALLGR1: 'GETALLGR1', GETALLGR2: 'GETALLGR2', GETALLGR3: 'GETALLGR3', GETALLGR4: 'GETALLGR4', GETALLGR5: 'GETALLGR5',
        SAVEGR1: 'SAVEGR1', SAVEGR2: 'SAVEGR2', SAVEGR3: 'SAVEGR3', SAVEGR4: 'SAVEGR4', SAVEGR5: 'SAVEGR5',
        GETGR1: 'GETGR1', GETGR2: 'GETGR2', GETGR3: 'GETGR3', GETGR4: 'GETGR4', GETGR5: 'GETGR5',
        NAMEEXISTSGR1: 'NAMEEXISTSGR1', NAMEEXISTSGR2: 'NAMEEXISTSGR2', NAMEEXISTSGR3: 'NAMEEXISTSGR3', NAMEEXISTSGR4: 'NAMEEXISTSGR4', NAMEEXISTSGR5: 'NAMEEXISTSGR5',
        LEVELMASTER: 'LEVELMASTER', GROUPLOOKUPS: 'GROUPLOOKUPS',

        GETALLROLES: 'GETALLROLES', SEARCHASSIGNMENT: 'SEARCHASSIGNMENT', GRADMINUSERS: 'GRADMINUSERS',
        ACTIVEINACTIVEROLE: 'ACTIVEINACTIVEROLE', ASSIGNROLE: 'ASSIGNROLE', DELROLE: 'DELROLE', SYSTEMUSERLIST: 'SYSTEMUSERLIST',
        SYSTEMSEARCHENTITYLIST: 'SYSTEMSEARCHENTITYLIST', ENTITYLISTFORHIERARCHYANDROLE: 'ENTITYLISTFORHIERARCHYANDROLE'
    };

    //API Path
    lms.group.toAPIPath = function (type) {
        var path = '';
        switch (type) {
            case lms.group.APIType.GETALLGR1:
                path = '/hierarchy/getallgroup1';
                break;
            case lms.group.APIType.GETALLGR2:
                path = '/hierarchy/getallgroup2';
                break;
            case lms.group.APIType.GETALLGR3:
                path = '/hierarchy/getallgroup3';
                break;
            case lms.group.APIType.GETALLGR4:
                path = '/hierarchy/getallgroup4';
                break;
            case lms.group.APIType.GETALLGR5:
                path = '/hierarchy/getallgroup5';
                break;
            case lms.group.APIType.SAVEGR1:
                path = '/hierarchy/savegroup1';
                break;
            case lms.group.APIType.SAVEGR2:
                path = '/hierarchy/savegroup2';
                break;
            case lms.group.APIType.SAVEGR3:
                path = '/hierarchy/savegroup3';
                break;
            case lms.group.APIType.SAVEGR4:
                path = '/hierarchy/savegroup4';
                break;
            case lms.group.APIType.SAVEGR5:
                path = '/hierarchy/savegroup5';
                break;
            case lms.group.APIType.GETGR1:
                path = '/hierarchy/getgroup1';
                break;
            case lms.group.APIType.GETGR2:
                path = '/hierarchy/getgroup2';
                break;
            case lms.group.APIType.GETGR3:
                path = '/hierarchy/getgroup3';
                break;
            case lms.group.APIType.GETGR4:
                path = '/hierarchy/getgroup4';
                break;
            case lms.group.APIType.GETGR5:
                path = '/hierarchy/getgroup5';
                break;
            case lms.group.APIType.NAMEEXISTSGR1:
                path = '/hierarchy/isgroup1nameexists';
                break;
            case lms.group.APIType.NAMEEXISTSGR2:
                path = '/hierarchy/isgroup2nameexists';
                break;
            case lms.group.APIType.NAMEEXISTSGR3:
                path = '/hierarchy/isgroup3nameexists';
                break;
            case lms.group.APIType.NAMEEXISTSGR4:
                path = '/hierarchy/isgroup4nameexists';
                break;
            case lms.group.APIType.NAMEEXISTSGR5:
                path = '/hierarchy/isgroup5nameexists';
                break;
            case lms.group.APIType.LEVELMASTER:
                path = '/lookup/getlookupbytype';
                break;
            case lms.group.APIType.GROUPLOOKUPS:
                path = '/user/getlookups';
                break;

            case lms.group.APIType.GETALLROLES:
                path = '/systemrole/getallroles';
                break;
            case lms.group.APIType.SEARCHASSIGNMENT:
                path = '/systemrole/searchforassignment';
                break;
            case lms.group.APIType.GRADMINUSERS:
                path = '/systemrole/groupadminusers';
                break;
            case lms.group.APIType.ACTIVEINACTIVEROLE:
                path = '/systemrole/activeinactiveuserrole';
                break;
            case lms.group.APIType.ASSIGNROLE:
                path = '/systemrole/assignrole';
                break;
            case lms.group.APIType.DELROLE:
                path = '/systemrole/deleteusersystemrole';
                break;
            case lms.group.APIType.SYSTEMUSERLIST:
                path = '/user/userlist';
                break;
            case lms.group.APIType.SYSTEMSEARCHENTITYLIST:
                path = '/entity/entitylist';
                break;
            case lms.group.APIType.ENTITYLISTFORHIERARCHYANDROLE :
                path = '/entity/entitylistforhierarchyandrole';
                break;

        }
        return path;
    };

    // #endregion




    /****************************************************************/



    /* UTILS ***************************************************/

    lms.utils = lms.utils || {};

    /* Creates a name namespace.
     *  Example:
     *  var taskService = lms.utils.createNamespace(lms, 'services.task');
     *  taskService will be equal to lms.services.task
     *  first argument (root) must be defined first
     ************************************************************/
    lms.utils.createNamespace = function (root, ns) {
        var parts = ns.split('.');
        for (var i = 0; i < parts.length; i++) {
            if (typeof root[parts[i]] == 'undefined') {
                root[parts[i]] = {};
            }

            root = root[parts[i]];
        }

        return root;
    };

    /* Find and replaces a string (search) to another string (replacement) in
     *  given string (str).
     *  Example:
     *  lms.utils.replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
     ************************************************************/
    lms.utils.replaceAll = function (str, search, replacement) {
        var fix = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(fix, 'g'), replacement);
    };

    /* Formats a string just like string.format in C#.
     *  Example:
     *  lms.utils.formatString('Hello {0}','Tuana') = 'Hello Tuana'
     ************************************************************/
    lms.utils.formatString = function () {
        if (arguments.length < 1) {
            return null;
        }

        var str = arguments[0];

        for (var i = 1; i < arguments.length; i++) {
            var placeHolder = '{' + (i - 1) + '}';
            str = lms.utils.replaceAll(str, placeHolder, arguments[i]);
        }

        return str;
    };

    lms.utils.toPascalCase = function (str) {
        if (!str || !str.length) {
            return str;
        }

        if (str.length === 1) {
            return str.charAt(0).toUpperCase();
        }

        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    lms.utils.toCamelCase = function (str) {
        if (!str || !str.length) {
            return str;
        }

        if (str.length === 1) {
            return str.charAt(0).toLowerCase();
        }

        return str.charAt(0).toLowerCase() + str.substr(1);
    }

    lms.utils.truncateString = function (str, maxLength) {
        if (!str || !str.length || str.length <= maxLength) {
            return str;
        }

        return str.substr(0, maxLength);
    };

    lms.utils.truncateStringWithPostfix = function (str, maxLength, postfix) {
        postfix = postfix || '...';

        if (!str || !str.length || str.length <= maxLength) {
            return str;
        }

        if (maxLength <= postfix.length) {
            return postfix.substr(0, maxLength);
        }

        return str.substr(0, maxLength - postfix.length) + postfix;
    };

    lms.utils.buildUriString = function (category, action) {
        var uri = '';
        uri = '/' + category + '/' + action;
        return uri;
    }


    /**
     * parameterInfos should be an array of { name, value } objects
     * where name is query string parameter name and value is it's value.
     * includeQuestionMark is true by default.
     */
    lms.utils.buildQueryString = function (parameterInfos, includeQuestionMark) {
        if (includeQuestionMark === undefined) {
            includeQuestionMark = true;
        }


        var qs = '';

        function addSeperator() {
            if (!qs.length) {
                if (includeQuestionMark) {
                    qs = qs + '?';
                }
            } else {
                qs = qs + '&';
            }
        }

        for (var i = 0; i < parameterInfos.length; ++i) {
            var parameterInfo = parameterInfos[i];
            if (parameterInfo.value === undefined) {
                continue;
            }

            if (parameterInfo.value === null) {
                parameterInfo.value = '';
            }

            addSeperator();

            if (parameterInfo.value.toJSON && typeof parameterInfo.value.toJSON === "function") {
                qs = qs + parameterInfo.name + '=' + encodeURIComponent(parameterInfo.value.toJSON());
            } else if (Array.isArray(parameterInfo.value) && parameterInfo.value.length) {
                for (var j = 0; j < parameterInfo.value.length; j++) {
                    if (j > 0) {
                        addSeperator();
                    }

                    qs = qs + parameterInfo.name + '[' + j + ']=' + encodeURIComponent(parameterInfo.value[j]);
                }
            } else {
                qs = qs + parameterInfo.name + '=' + encodeURIComponent(parameterInfo.value);
            }
        }

        return qs;
    }

    /**
     * Gets the domain of given url
     * @param {string} url 
     * @returns {string} 
     */
    lms.utils.getDomain = function (url) {
        var domainRegex = /(https?:){0,1}\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
        var matches = domainRegex.exec(url);
        return (matches && matches[2]) ? matches[2] : '';
    }


    /* SECURITY ***************************************/
    lms.security = lms.security || {};
    lms.security.antiForgery = lms.security.antiForgery || {};

    lms.security.antiForgery.tokenCookieName = 'XSRF-TOKEN';
    lms.security.antiForgery.tokenHeaderName = 'X-XSRF-TOKEN';

    lms.security.antiForgery.getToken = function () {
        return lms.utils.getCookieValue(lms.security.antiForgery.tokenCookieName);
    };

    lms.security.antiForgery.shouldSendToken = function (settings) {
        if (settings.crossDomain === undefined || settings.crossDomain === null) {
            return lms.utils.getDomain(location.href) === lms.utils.getDomain(settings.url);
        }

        return !settings.crossDomain;
    };

})();