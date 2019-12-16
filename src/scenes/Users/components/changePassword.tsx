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
        showsuccessmsg: false,
        currentpwd: '',
        newPwd: '',
        pwd:''
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

        let res = await this.props.userStore.changePassword({ isAdminPasswordChangeRequest: false, password: this.state.pwd, isPasswordChanged: true, requesterUserId: this.props.userStore.userid, userId: this.props.userStore.userid, currentPassword: this.state.currentpwd })
        console.log(res);

        this.setState({ ...this.state, showsuccessmsg: true });
    }

    render() {

        const { visible, onCancel } = this.props;

        return (
            <Drawer title={'Change Password'} width={300} visible={visible} onClose={onCancel}>

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
                                <Input.Password placeholder='Current Password' value={this.state.currentpwd} onChange={this.changeCurrentPwd} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <FormItem>
                                <label>{'New Password'} <span className="start">*</span> </label>
                                <Input.Password placeholder='New Password' value={this.state.newPwd} onChange={this.changePwd} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <FormItem>
                                <label>{'Confirm Password'} <span className="start">*</span> </label>
                                <Input.Password placeholder='Confirm Password' value={this.state.pwd} onChange={this.changeConfirmPwd} />
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