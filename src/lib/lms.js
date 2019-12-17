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

    lms.APIType = {
        USERLOGIN: 'USERLOGIN',
        USERSALT: 'USERSALT',
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

    //Get API Path of the variable
    lms.toAPIPath = function (type) {
        var path = '';
        switch (type) {
            case lms.APIType.USERLOGIN:
                path = '/user/login';
                break;
            case lms.APIType.USERSALT:
                path = '/user/getsalt';
                break;
            case lms.APIType.USERLIST:
                path = '/user/userlist';
                break;
            case lms.APIType.USERENTITYLIST:
                path = '/entity/entitylist';
                break;
            case lms.APIType.USERJOBCODES:
                path = '/user/getlookups';
                break;
            case lms.APIType.ADDEDITUSER:
                path = '/user/addedituser';
                break;
            case lms.APIType.CHECKOIG:
                path = '/user/checkoig';
                break;
            case lms.APIType.USERDATABYID:
                path = '/user/getuserdata';
                break;
            case lms.APIType.USEREMAILCHECK:
                path = '/user/isemailinuse';
                break;
            case lms.APIType.USERLOGINIDCHECK:
                path = '/user/isloginidinuse';
                break;
            case lms.APIType.USEREXCELTEMPLATE:
                path = '/user/getusertemplateexcel'
                break;
            case lms.APIType.USERBULKUPLOAD:
                path = '/user/uploaduserimport'
                break;
            case lms.APIType.USERBULKIMPORTLOGRESPONSE:
                path = '/user/bulkimportlogs'
                break;
            case lms.APIType.SAVEOIGUSERS:
                path = '/user/saveoigusers'
                break;
            case lms.APIType.USERBULKIMPORTSTATUS:
                path = '/lookup/getlookupbytype';
                break;
            case lms.APIType.USERBULKIMPORTLSTALL:
                path = '/user/bulkimportlistall';
                break;
            case lms.APIType.GETBULKIMPORTUPLOADEDFILE :
                path = '/user/getbulkimportuploadedfile';
                break;
            case lms.APIType.EXPORTUSERDATA :
                path = '/user/exportuserdata';
                break;
            case lms.APIType.USERCHANGEPWD:
                path = '/user/changepassword';
                break;
        }
        return path;
    };



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