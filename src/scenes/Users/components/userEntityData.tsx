import * as React from 'react';
import { Input, Col, Row, Switch, Icon, DatePicker, Select,Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
class userEntitydata extends React.Component {
    render() {
        const { Option } = Select;
        //const { getFieldDecorator } = this.props.form;
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
                            <ul className="treeentityinline">
                                <li><a href="#" className="links"><span className="treeIcon"></span><span className="text">Cardinal Health</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                <li><a href="#" className="links"><span className="text">Ball and Food Stores</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                <li><a href="#" className="links"><span className="text">Pharmacy 5</span><span className="arrowicon"><Icon type="right" /></span></a></li>
                                <li><a href="#" className="links"><span className="text">NCPDP 13</span></a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <div className="hrLine mb15"></div>
                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Frist Name'} <span className="start">*</span> </label>
                            <Input />
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Last Name'} <span className="start">*</span> </label>
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Email Or Username'} <span className="start">*</span> </label>
                            <Input />
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Hiring Date'} <span className="start">*</span> </label>
                            <div><DatePicker /></div>
                        </FormItem>
                    </Col>
                </Row>
                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Job Code'} <span className="start">*</span> </label>
                            <div>
                                <Select>
                                    <Option value="">Pharmacist</Option>
                                    <Option value="">Pharmacy</Option>
                                    <Option value="">Technician Other</Option>
                                </Select>
                            </div>
                        </FormItem>
                    </Col>
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <label>{'Role Change Date'} </label>
                            <div><DatePicker /></div>
                        </FormItem>
                    </Col>
                </Row>
                <Row className="antd-row">
                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                        <FormItem>
                            <div className="switchbutton">
                                <div><label>{'Status'} <span className="start">*</span> </label></div>
                                <label className="mr8">{'Active'}</label> <Switch /> <label className="ml8">{'Inactive'}</label>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <div className="hrLine mb15"></div>
            </div>
        );
    };
}
export default userEntitydata;
