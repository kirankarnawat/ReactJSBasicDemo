import * as React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import AuthenticationStore from '../../stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';

import { Redirect } from 'react-router-dom';

import Stores from '../../stores/storeIdentifier';

import './index.less';
import rules from './index.validation';

const FormItem = Form.Item;

export interface ILoginProps extends FormComponentProps {
    authenticationStore?: AuthenticationStore;
    history: any;
    location: any;
}

@inject(Stores.AuthenticationStore)
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
            
            <div className="loginContainer">
            <Form className="" onSubmit={this.handleSubmit}>
                <div className="loginConatiner">
                    <div className="loginBox">
                        <div className="loginBoxCon">
                            <div className="colLogLeft">
                                <h2>Welcome to Cardinal Health <br /> Compliance Management Service</h2>
                                <div className="colLogLeftInner">
                                    <div className="loginLogo">
                                        <img src={require('../../images/main-logo.png')} alt="logo" />
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
                                                {/* <button type="button" className="passIcon"><i className="fa fa-eye"></i></button> */}
                                            </div>
                                        </div>
                                        <div className="loginFooter">
                                            <div className="float-left">
                                                <div className="form-group form-check">
                                                    <label className="form-check-label ml5">
                                                        <Checkbox checked={loginModel.rememberMe} onChange={loginModel.toggleRememberMe} />
                                                        <span className="ml5"> {'Remember me'}</span> </label>
                                                </div>
                                            </div>
                                            <div className="float-right fotPass">
                                                <a href="#">{'ForgotPassword'}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ant-clearfix"></div>
                                    <Button className="btn btn-primary" htmlType={'submit'} type="danger">
                                        {'Login'}
                                    </Button>
                                </div>
                            </div>
                            <div className="colLogRight">
                                <div className="loginBg"><img src={require('../../images/login-bg.jpg')} alt="" /></div>
                                <div className="contentRt">
                                    <p> Cardinal Health Managed Care delivers the <strong>Cardinal Health Compliance Management Service</strong> solution to help pharmacies satisfy HIPAA, Fraud, Waste and Abuse and other government mandated training requirements.</p>
                                    <p>Centers for Medicare and Medicaid Services (CMS) requires all of our pharmacies to be fully credentialed and maintain compliance in order to serve Medicare and Medicaid patients. Payors, including PBMs, are held accountable for ensuring all providers in their networks are in compliance. Accordingly, PBMs have recently pushed this responsibility down to PSAOs to ensure all pharmacies in our networks are compliant. Managed Care is required to attest to this and PBMs have started auditing PSAOs. Failure to be fully compliant could result in our network being removed and our pharmacies losing access to the payors' patients.</p>
                                </div>
                            </div>
                        </div>
                        <div className="logoutIcon" style={{ display: "none" }}>
                            <img src={require('../../images/login-icon.png')} alt="" />
                        </div>

                    </div>
                </div>
            </Form>
            </div>
        );
    }
}

export default Form.create()(Login);
