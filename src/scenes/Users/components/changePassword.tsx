import * as React from 'react';

import { Input, Form, Button, Drawer, Row, Col } from 'antd';

import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

export interface IUserProps {
    userStore: UserStore;
}

export interface IChangePassProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}


@inject(Stores.UserStore)
@observer
class ChangePassword extends React.Component<IUserProps & IChangePassProps> {

    state = {
        confirmDirty: false,
        showsuccessmsg: false,
        currentpwd: '',
        newPwd: '',
        pwd: ''
    };

    // start up event
    async componentDidMount() {

        await this.props.userStore.initUserId();
    }

    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords entered are inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    changeCurrentPwd = (event: any) => {

        this.setState({ ...this.state, currentpwd: event.target.value, showsuccessmsg: false });
    }

    changePwd = (event: any) => {

        this.setState({ ...this.state, newPwd: event.target.value, showsuccessmsg: false });
    }

    changeConfirmPwd = (event: any) => {

        this.setState({ ...this.state, pwd: event.target.value, showsuccessmsg: false });
    }

    handlePasswordChange = async () => {

        const form = this.props.form;

        form.validateFields(async (err: any, values: any) => {

            if (err) {
                return;
            } else {

                let res = await this.props.userStore.changePassword({ isAdminPasswordChangeRequest: false, password: this.state.pwd, isPasswordChanged: true, requesterUserId: this.props.userStore.userid, userId: this.props.userStore.userid, currentPassword: this.state.currentpwd })
                console.log(res);

                this.setState({ ...this.state, showsuccessmsg: true });
            }
        });
    }

    onHanleResetForm = () => {

        this.setState({
            ...this.state, confirmDirty: false, showsuccessmsg: false, newPwd: '', pwd: '', currentpwd: ''
        }, async () => await this.props.onCancel());
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const { visible } = this.props;

        return (

            <Drawer title={'Change Password'} width={300} onClose={this.onHanleResetForm} destroyOnClose={true} visible={visible}>

                <div className={this.state.showsuccessmsg ? "successMsg mt20" : "successMsg mt20 hidden"}>
                    <div className="successText">
                        <div className="heading"><h3>Success</h3></div>
                        <div className="discText">You have successfully Change Password.</div>
                    </div>
                    <div className="ant-clearfix"></div>
                </div>

                <div className="mt20">

                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <FormItem>
                                <label>{'Current Password'} <span className="start">*</span> </label>
                                {getFieldDecorator('currentpassword', { initialValue: this.state.currentpwd, rules: [{ required: true, message: 'Current password is required!' }] })(<Input.Password placeholder='Current Password' onChange={this.changeCurrentPwd} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <FormItem>
                                <label>{'New Password'} <span className="start">*</span> </label>

                                {getFieldDecorator('password', { initialValue: this.state.newPwd, rules: [{ required: true, message: 'Password is required!' }, { validator: this.validateToNextPassword }] })(<Input.Password placeholder='New Password' onChange={this.changePwd} />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <FormItem>
                                <label>{'Confirm Password'} <span className="start">*</span> </label>
                                {getFieldDecorator('confirm', { initialValue: this.state.pwd, rules: [{ required: true, message: 'Confirm password is required!' }, { validator: this.compareToFirstPassword }] })(<Input.Password placeholder='Confirm Password' onChange={this.changeConfirmPwd} />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <div className="btnfooterContainer">
                        <div className="antd-row">
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                                <ul className="bulkImpListing">
                                    <li>
                                        <Button className="ant-btn-primary" type="primary" onClick={this.handlePasswordChange} >Submit</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        )
    }
}
export default Form.create<IChangePassProps>()(ChangePassword);