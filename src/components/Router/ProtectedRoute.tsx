import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';

declare var lms: any;

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {

    let data = lms.auth.getToken();
    let userdata = lms.session.getUserCookie();

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
