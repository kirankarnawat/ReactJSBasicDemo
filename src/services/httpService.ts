import AppConsts from './../lib/appconst';
import { Modal } from 'antd';
import axios from 'axios';

import { getAccessToken } from '../stores/authenticationStore'

const qs = require('qs');

const http = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    timeout: 30000,    
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        });
    },
});

http.interceptors.request.use(
    function (config) {
        var token = getAccessToken();
        if (!!token) {
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status == 400) {
            if (!!error.response && !!error.response.data.errors && !!error.response.data.errors[0].message && error.response.data.errors[0].fieldName) {

                var dtcontent = "";
                var i: number; 

                for (i = 0; i < error.response.data.errors.length; i++) {
                    dtcontent += error.response.data.errors[i].fieldName + ": " + error.response.data.errors[i].message
                }

                Modal.error({
                    title: "Error" ,
                    content: dtcontent
                });

            } else if (!!error.response && !!error.response.data.errors && !!error.response.data.errors[0].message) {
                Modal.error({
                    title: 'LoginFailed',
                    content: error.response.data.errors[0].message,
                });
            } else if (!error.response) {
                Modal.error({ content: 'UnknownError' });
            }
        }
        else if (error.response.status == 401) {
            Modal.error({ content: 'Unauthorized' });
        }

        setTimeout(() => { }, 1000);

        return Promise.reject(error);
    }
);

export default http;
