import * as React from 'react';
import { Form,Input, Tabs,DatePicker, Drawer, Button, Col, Row,Select,Switch ,Icon} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import FormItem from 'antd/lib/form/FormItem';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';
import UserEntityTree from './userEntityTree';



const TabPane = Tabs.TabPane;
//#region Local State and Property
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
    autoDataRef: GetUserEntityListResponse[];
   
    onGroupSelect: (option: any) => void;
    onGroupChange: () => void;
    onHandleAutoSearch: (value: string) => void;
   
}
const { Option } = Select;
class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {
    render() {      
       // const children = this.props.Lookups?this.props.Lookups.listJobRoles.map(a=><Option title="Select" value={a.jobCodeId}>{a.jobCode}</Option>):[];
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate, onGroupSelect, onGroupChange, onHandleAutoSearch, autoDataRef } = this.props;
        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={onCancel} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="sysId">system ID: 00006</div>
                        <div className="pos">

                            {<div><UserEntityTree
                                autoDataRef={autoDataRef}
                                onGroupSelect={onGroupSelect}
                                onGroupChange={onGroupChange}
                                onHandleAutoSearch={onHandleAutoSearch}
                            /></div>}




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
                                            {getFieldDecorator('emailAddress')(<Input pattern="/^([\w-\.]+@@([\w-]+\.)+[\w-]{2,4})?$/" placeholder='Email Or Username' name="emailAddress" />)}
                                        </FormItem>
                                    </Col>
                                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                                        <FormItem>
                                            <label>{'Hiring Date'} <span className="start">*</span> </label>
                                            <div>{getFieldDecorator('hiringDate')(<DatePicker placeholder='Hiring Date' name="hiringDate" />)}</div>                                            
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row className="antd-row">
                                    <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                                        <FormItem>
                                            <label>{'Job Code'} <span className="start">*</span> </label>
                                            <div>                                                
                                                {/* {getFieldDecorator('jobCodeId')(<Select>{children}</Select>)} */}
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
                                            <div>{getFieldDecorator('roleChangeDate')(<DatePicker placeholder='Role Change Date' name="roleChangeDate" />)}</div>
                                            
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
                            </div>






                            {/* <div><UserEntitydata /> </div> */}
                        </div>

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
                    </TabPane>
                    <TabPane tab={'Courses'} key={'Courses'}>
                        <Row className="antd-row">
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <div className="assignHead">
                                    <div className="floatleft">
                                        <h5>Assigned</h5>
                                    </div>
                                    <div className="floatright">
                                        <h6><span className="text">Assigne New Course</span> <span className="icon"></span></h6>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="assignedBox">
                            <Row className="antd-row">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                    <div className="assignedBoxLeft float-left">
                                        <h5>Hipaa  Compliance for the pharmacy</h5>
                                        <ul className="assListing">
                                            <li className="program">
                                                <span className="iconprogram">&nbsp;</span>
                                                <span className="text">Program</span>
                                            </li>
                                            <li className="mins">
                                                <span className="iconMins">&nbsp;</span>
                                                <span className="text">1hr 30 mins</span>
                                            </li>
                                            <li className="free">
                                                <span className="iconFree">&nbsp;</span>
                                                <span className="text">Free</span>
                                            </li>
                                            <li className="date">
                                                <span className="iconDate">&nbsp;</span>
                                                <span className="text">8/27/2109</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="assignedBoxRight float-right">

                                    </div>
                                </Col>
                            </Row>
                            <Row className="antd-row">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                    <h6>Description</h6>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="assignedBox">
                            <Row className="antd-row">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                    <div className="assignedBoxLeft float-left">
                                        <h5>Hipaa  Compliance for the pharmacy</h5>
                                        <ul className="assListing">
                                            <li className="program">
                                                <span className="iconprogram">&nbsp;</span>
                                                <span className="text">Program</span>
                                            </li>
                                            <li className="mins">
                                                <span className="iconMins">&nbsp;</span>
                                                <span className="text">1hr 30 mins</span>
                                            </li>
                                            <li className="free">
                                                <span className="iconFree">&nbsp;</span>
                                                <span className="text">Free</span>
                                            </li>
                                            <li className="date">
                                                <span className="iconDate">&nbsp;</span>
                                                <span className="text">8/27/2109</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="assignedBoxRight float-right">

                                    </div>
                                </Col>
                            </Row>
                            <Row className="antd-row">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                    <h6>Description</h6>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="assignedBox">
                            <Row className="antd-row">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                    <div className="assignedBoxLeft float-left">
                                        <h5>Hipaa  Compliance for the pharmacy</h5>
                                        <ul className="assListing">
                                            <li className="program">
                                                <span className="iconprogram">&nbsp;</span>
                                                <span className="text">Program</span>
                                            </li>
                                            <li className="mins">
                                                <span className="iconMins">&nbsp;</span>
                                                <span className="text">1hr 30 mins</span>
                                            </li>
                                            <li className="free">
                                                <span className="iconFree">&nbsp;</span>
                                                <span className="text">Free</span>
                                            </li>
                                            <li className="date">
                                                <span className="iconDate">&nbsp;</span>
                                                <span className="text">8/27/2109</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="assignedBoxRight float-right">

                                    </div>
                                </Col>
                            </Row>
                            <Row className="antd-row">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                    <h6>Description</h6>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                </Col>
                            </Row>
                        </div>


                        {/* <FormItem>
                            {getFieldDecorator('roleNames', { valuePropName: 'value' })(<CheckboxGroup options={options} />)}
                        </FormItem> */}
                    </TabPane>
                </Tabs>



            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);

