import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';

import storageService from '../../services/storageService';

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {

    var data = storageService.getToken();
    var userdata = storageService.getUserCookie();

    return (
        <Route
            {...rest}
            render={props => {
                
                const isauth = (!data) ? false : true;
                const issession = (!userdata) ? false : true;

                if (!isauth)
                    return (
                        <Redirect
                            to={{
                                pathname: '/user/login',
                                state: { from: props.location },
                            }}
                        />
                    );

                if (!issession) {
                    return (
                        <Redirect to="/user/login" />
                    );
                }

                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;
