import * as React from 'react';

import { Redirect, Route } from 'react-router-dom';

import Cookies from 'js-cookie'

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {
    let data = Cookies.get('access_token');
    //let userdata = sessionStorage.getItem('loginuser');
    return (
        <Route
            {...rest}
            render={props => {

                const isauth = (!data) ? false : true;
                //const issession = (!userdata) ? false : true;

                if (!isauth)
                    return (
                        <Redirect
                            to={{
                                pathname: '/user/login',
                                state: { from: props.location },
                            }}
                        />
                    );

                //if (!issession) {
                //    return (
                //        <Redirect to="/user/login" />
                //    );
                //}

                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;
