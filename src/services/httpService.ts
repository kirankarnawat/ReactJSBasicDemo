import AppConsts from './../lib/appconst';
import { Modal } from 'antd';
import axios from 'axios';

import{ getAccessToken } from '../stores/authenticationStore'

const qs = require('qs');

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function(config) {
    var token = getAccessToken();
    if (!!token) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
      Modal.error({
        title: error.response.data.error.message,
        content: error.response.data.error.details,
      });
    } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
      Modal.error({
        title: 'LoginFailed',
        content: error.response.data.error.message,
      });
    } else if (!error.response) {
      Modal.error({ content: 'UnknownError' });
    }

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
