import * as React from 'react';
import { Form, Input, Button, Switch, Select, Row, Col, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
import rules from './userEntityData.validation';

import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import moment from 'moment';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';


export interface IUserProps {
    userStore: UserStore;    
}

export interface IUserEntityProps extends FormComponentProps {
    selgroupid:string;
    id: string;
}

export interface IUserEntityState {
    isOIGCheckDone: boolean;
    isOIGMsgShow: boolean;
    isSuccessMsgShow: boolean;
    isAllDisable: boolean;
    successMsg: string;
    userid: string;
    userGroupInfo: GetUserEntityListResponse[];
}

const { Option } = Select;
//const dateFormat = 'MM/dd/yyyy';

@inject(Stores.UserStore)
@observer
class userEntitydata extends React.Component<IUserProps & IUserEntityProps, IUserEntityState> {
    
    state = {
        isOIGCheckDone: false,
        isOIGMsgShow: false,
        isSuccessMsgShow: false,
        isAllDisable: false,
        successMsg: '',
        userid: this.props.id,
        userGroupInfo: (this.props.id === '') ? this.props.userStore.userentity.items.filter(p => p.groupId = this.props.selgroupid).slice()
            : this.props.userStore.userentity.items.filter(p => p.groupId = this.props.form.getFieldValue("groupId")).slice()
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            this.props.form.setFieldsValue({ ...this.props.userStore.userById });
        }
    }

    //ADD EDIT USER DATA
    handleCreate = () => {
        debugger;
        this.props.form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            } else {
                if (this.state.userid === '') {
                    if (this.state.isOIGCheckDone === false) {
                        debugger;

                        await this.props.userStore.checkOIG({ firstName: values["firstName"], lastName: values["lastName"] });

                        if (!this.props.userStore.userOIG) {
                            this.setState({ isOIGMsgShow: true, isOIGCheckDone: true });
                        }
                        else {
                            await this.props.userStore.create({ requesterUserId: this.props.userStore.userid, groupId: this.state.userGroupInfo[0].groupId, emailAddress: values["loginId"], ...values });
                            this.setState({ isAllDisable: true, isSuccessMsgShow: true, successMsg: 'User created successfully', userid: this.props.userStore.user.userId });
                        }
                    }
                    else {
                        await this.props.userStore.create({ requesterUserId: this.props.userStore.userid, groupId: this.state.userGroupInfo[0].groupId, emailAddress: values["loginId"], ...values });
                        this.setState({ isAllDisable: true, successMsg: 'User created successfully', userid: this.props.userStore.user.userId });
                    }
                } else {
                    await this.props.userStore.update({ userId: this.props.id, requesterUserId: this.props.userStore.userid, groupId: this.state.userGroupInfo[0].groupId, emailAddress: values["loginId"], ...values });
                    this.setState({ successMsg: 'User updated successfully' });
                }
            }
        });
    };

    handleAllEnable = () => {
        this.state.isAllDisable = false;
    }

    disabledDate = (current) => {
        return current > moment().endOf('day');
    }

    handleDataExists = async (rule, value, callback) => {
        var regex = /^([\w-\.]+@@([\w-]+\.)+[\w-]{2,4})?$/;

        if (!regex.test(value)) {
            await this.props.userStore.checkIsEmailInUse({ EmailAddress: value, UserID: this.state.userid });
            (this.props.userStore.userExists === 'true') ? callback() : callback('Email is already exist');
        } else {
            await this.props.userStore.checkIsLoginIdInUse({ LoginID: value, UserID: this.state.userid });
            (this.props.userStore.userExists === 'true') ? callback() : callback('Username is already exist');
        }
    }
       
    render() {
        debugger;
        const { getFieldDecorator } = this.props.form;

        const children = this.props.userStore.userjobroles.items.map(item => <Option key={item.jobCodeId}>{item.jobCode}</Option>);

        return (
            <div>

                <Row className={(this.state.isOIGMsgShow) ? 'antd-row mb10' : 'antd-row mb10 hidden'}>
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="warningMsg">
                            <div className="warningText">
                                <div className="heading">
                                    <h3>OIG Exclusion is found</h3>
                                </div>
                                <div className="discText">Click on the Verify OIG button to identify the user profile. You may choose to create the user post verification.</div>
                            </div>
                            <div className="warningbtn mt10">
                                <Button className="ant-btn ant-btn-default">Verifi Oig</Button>
                            </div>
                            <div className="ant-clearfix"></div>
                        </div>
                    </Col>
                </Row>

                <Row className={(this.state.isSuccessMsgShow) ? 'antd-row mb10' : 'antd-row mb10 hidden'} >
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="successMsg">
                            <div className="successText">
                                <div className="heading">
                                    <h3>{this.state.successMsg}</h3>
                                </div>
                            </div>
                            <div className="ant-clearfix"></div>
                        </div>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="treeinlinestructure">
                            {
                                (this.state.userGroupInfo !== undefined && this.state.userGroupInfo.length > 0) ?
                                    <ul className="treeentityinline">
                                        <li><a href="#" className="links"><span className="treeIcon"></span><span className="text">{this.state.userGroupInfo[0].group1Name}</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                        <li><a href="#" className="links"><span className="text">{this.state.userGroupInfo[0].group2Name}</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                        <li><a href="#" className="links"><span className="text">{this.state.userGroupInfo[0].group3Name}</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                        <li><a href="#" className="links"><span className="text">{this.state.userGroupInfo[0].group4Name}</span></a></li>
                                        <li className={this.state.isAllDisable === true ? 'floatRight' : 'floatRight hidden'}><a className="editEntityIcon" onClick={this.handleAllEnable}></a></li>
                                    </ul>
                                    : ""
                            }
                        </div>
                    </Col>
                </Row>

                <div className="hrLine mb15"></div>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'First Name'} <span className="start">*</span> </label>
                            {getFieldDecorator('firstName', { rules: rules.firstname })(<Input placeholder='First Name' name="firstName" className={this.state.isAllDisable ? 'disabled' : ''} />)}
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Last Name'} <span className="start">*</span> </label>
                            {getFieldDecorator('lastName', { rules: rules.lastname })(<Input placeholder='Last Name' name="lastName" className={this.state.isAllDisable ? 'disabled' : ''} />)}
                        </FormItem>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Email Or Username'} <span className="start">*</span> </label>
                            {getFieldDecorator('loginId', { rules: [{ required: true, message: 'Username/Email is required!' }, { validator: this.handleDataExists }] })(<Input placeholder='Email Or Username' name="emailAddress" className={this.state.isAllDisable ? 'disabled' : ''} />)}
                        </FormItem>
                    </Col>
                    {/*
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Hiring Date'} <span className="start">*</span> </label>
                            <div>
                                {getFieldDecorator('hiringDate', { rules: rules.hiringDate })(<DatePicker disabledDate={this.disabledDate} placeholder='Hiring Date' name="hiringDate" className={this.state.isAllDisable ? 'disabled' : ''} />)}
                            </div>
                        </FormItem>
                    </Col>*/}
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Job Code'} <span className="start">*</span> </label>
                            <div>
                                {getFieldDecorator('jobCodeId', { initialValue: '', rules: rules.jobCodeId })(
                                    <Select placeholder="Please select job code" className={this.state.isAllDisable ? 'disabled' : ''} >
                                        {children}
                                    </Select>
                                )}

                            </div>
                        </FormItem>
                    </Col>
                    {/*
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Role Change Date'} </label>
                            <div>
                                {getFieldDecorator('roleChangeDate')(<DatePicker disabledDate={this.disabledDate} placeholder='Role Change Date' name="roleChangeDate" className={this.state.isAllDisable ? 'disabled' : ''} />)}
                            </div>
                        </FormItem>
                    </Col>
                     */}
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <div className="switchbutton">
                                <div><label>{'Status'} <span className="start">*</span> </label></div>
                                <label className="mr8">{'Active'}</label>

                                {getFieldDecorator('status', { initialValue: true, valuePropName: 'checked' })(<Switch className={this.state.isAllDisable ? 'disabled' : ''} />)}
                  
                                <label className="ml8">{'Inactive'}</label>
                            </div>
                        </FormItem>
                    </Col>
                </Row>

                <div className="hrLine mb15"></div>

                <div className="buttonfooter">
                    <div className="antd-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="bulkImpFooter">
                                <ul className="bulkImpListing">
                                    <li>
                                        <Button onClick={this.handleCreate} className={this.state.isAllDisable ? 'ant-btn-primary disabled' : 'ant-btn-primary'} type="primary">Submit</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Form.create<IUserEntityProps>()(userEntitydata);
