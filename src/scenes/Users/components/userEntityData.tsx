import * as React from 'react';
import { Form, Input, Button, Switch, Select, Row, Col, DatePicker, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
import { GetJobRolesResponse } from '../../../services/user/dto/Response/getJobRolesResponse';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';

export interface IUserEntityProps extends FormComponentProps {
    onCreate: () => void;
    userJobRole: GetJobRolesResponse[];
    userGroupInfo: GetUserEntityListResponse[];
}

const { Option } = Select;

class userEntitydata extends React.Component<IUserEntityProps> {
    render() {

        const { getFieldDecorator } = this.props.form;

        const { onCreate, userJobRole, userGroupInfo } = this.props;

        const children = userJobRole.map(item => <Option key={item.jobCodeId}>{item.jobCode}</Option>);

        return (
            <div>

                <Row className="antd-row mb10">
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

                <Row className="antd-row mb10">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="successMsg">
                            <div className="successText">
                                <div className="heading">
                                    <h3>OIG Exclusion is found</h3>
                                </div>
                                <div className="discText">Click on the Verify OIG button to identify the user profile. You may choose to create the user post verification.</div>
                            </div>
                            <div className="ant-clearfix"></div>
                        </div>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="treeinlinestructure">
                            {
                                (userGroupInfo !== undefined && userGroupInfo.length > 0) ?
                                    <ul className="treeentityinline">
                                        <li><a href="#" className="links"><span className="treeIcon"></span><span className="text">{userGroupInfo[0].group1Name}</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                        <li><a href="#" className="links"><span className="text">{userGroupInfo[0].group2Name}</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                        <li><a href="#" className="links"><span className="text">{userGroupInfo[0].group3Name}</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                        <li><a href="#" className="links"><span className="text">{userGroupInfo[0].group4Name}</span></a></li>
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
                            {getFieldDecorator('firstName')(<Input placeholder='First Name' name="firstName" />)}
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Last Name'} <span className="start">*</span> </label>
                            {getFieldDecorator('lastName')(<Input placeholder='Last Name' name="lastName" />)}
                        </FormItem>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Email Or Username'} <span className="start">*</span> </label>
                            {getFieldDecorator('emailAddress')(<Input placeholder='Email Or Username' name="emailAddress" />)}
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Hiring Date'} <span className="start">*</span> </label>
                            <div>
                                {getFieldDecorator('hiringDate')(<DatePicker placeholder='Email Or Username' name="hiringDate" />)}
                            </div>
                        </FormItem>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Job Code'} <span className="start">*</span> </label>
                            <div>
                                {getFieldDecorator('jobCodeId')(
                                    <Select>
                                        {children}
                                    </Select>
                                )}
                                
                            </div>
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Role Change Date'} </label>
                            <div>
                                {getFieldDecorator('roleChangeDate')(<DatePicker placeholder='Role Change Date' name="roleChangeDate" />)}
                            </div>
                        </FormItem>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <div className="switchbutton">
                                <div><label>{'Status'} <span className="start">*</span> </label></div>
                                <label className="mr8">{'Active'}</label>
                                {getFieldDecorator('status')(<Switch />)}
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
                                        <Button onClick={onCreate} className="ant-btn-primary" type="primary">Submit</Button>
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
