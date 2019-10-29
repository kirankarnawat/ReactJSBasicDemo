//import './index.less';

import * as React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import AuthenticationStore from '../../stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';

import { Redirect } from 'react-router-dom';

import SessionStore from '../../stores/sessionStore';
import Stores from '../../stores/storeIdentifier';

import rules from './index.validation';

const FormItem = Form.Item;

export interface ILoginProps extends FormComponentProps {
    authenticationStore?: AuthenticationStore;
    sessionStore?: SessionStore;
    history: any;
    location: any;
}

@inject(Stores.AuthenticationStore, Stores.SessionStore)

@observer
class Login extends React.Component<ILoginProps> {

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const { loginModel } = this.props.authenticationStore!;
        await this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                await this.props.authenticationStore!.login(values);
                sessionStorage.setItem('rememberMe', loginModel.rememberMe ? '1' : '0');
                const { state } = this.props.location;
                window.location = state ? state.from.pathname : '/';
            }
        });
    };

    public render() {
        let { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;

        const { loginModel } = this.props.authenticationStore!;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form className="" onSubmit={this.handleSubmit}>
                <div className="loginConatiner">
                <div className="loginBox">
                    <div className="loginBoxCon">
                        <div className="colLogLeft">
                            <h4>Welcome</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                        </div>

                        <div className="colLogRight">
                            <div className="loginLogo">
                                <img src={require('../../images/main-logo.png')} alt="logo"/>
                            </div>
                            <div className="loginForm">
                                <div className="form-group">
                                    <label className="lblText">Email Address</label>
                                    <FormItem>
                                        {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(
                                            <Input className="form-control" placeholder={'EmailAddress'} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="form-group mb5">
                                    <label className="lblText">Password</label>
                                    <div className="posRel">
                                        <FormItem>
                                            {getFieldDecorator('password', { rules: rules.password })(
                                                <Input className="form-control"
                                                    placeholder={'Password'}
                                                    type="password"
                                                    size="large"
                                                />
                                            )}
                                        </FormItem>
                                        <button type="button" className="passIcon"><i className="fa fa-eye"></i></button>
                                    </div>
                                </div>

                                <div className="loginFooter">
                                    <div className="float-left">
                                        <div className="form-group form-check">
                                            <Checkbox checked={loginModel.rememberMe} onChange={loginModel.toggleRememberMe} />
                                            <label className="form-check-label ml5">{'Check me out'}</label>
                                        </div>
                                    </div>
                                    <div className="float-right fotPass">
                                        <a href="#">{'ForgotPassword'}</a>
                                    </div>
                                </div>
                            <Button className="btn btn-primary" htmlType={'submit'} type="danger">
                                {'Login'}
                                </Button>
                            </div>
                          
                        </div>
                    </div>
                    <div className="logoutIcon">
                        <img src={require('../../images/login-icon.png')} alt=""/>
                    </div>
                   
                    </div>
                </div>
            </Form>
        );
    }
}

export default Form.create()(Login);
