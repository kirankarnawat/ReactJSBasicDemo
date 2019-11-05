import * as React from 'react';

import { Form, Input, Tabs, Drawer, Button,Col, message,Row } from 'antd';

//import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import AntdIcon from '@ant-design/icons-react';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import rules from './createOrUpdateUser.validation';
const TabPane = Tabs.TabPane;
const key = 'updatable';
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
}

class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {
    state = {
        confirmDirty: false,
    };

    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
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

    render() {
       // const { roles } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate } = this.props;
         
        // const options = roles.map((x: GetRoles) => {
        //     var test = { label: x.name, value: x.id };
        //     return test;
        // });
        const openMessage = () => {
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
              message.success({ content: 'Loaded!', key, duration: 2 });
            });
          };
        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={onCancel} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                    <div className="sysId">system ID: 00006</div>
                    <div className="pos">
                    <div className="successData">
                    {openMessage}
                    <div className="antd-row">
                    <Col xs={{ span:24}} sm={{ span:24}} md={{ span:24}} lg={{ span:24}}>
                    <div className="successBox">
                        <div className="iconLeft floatleft">
                            <i className="fa fa-check-circle"></i>
                        </div>
                        <div className="successBoxText floatleft">
                            <h4>Success</h4>
                            <p>You have successfully saved the information</p>
                        </div>
                     </div>
                    </Col>
                    </div>    
                    </div>
                    <div className="antd-row">
                        <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                        <FormItem>
                        <label>{'FirstName'} <span className="start">*</span> </label>
                            {getFieldDecorator('firstName', { rules: rules.firstName })(<Input />)}
                        </FormItem>
                        </Col>
                        <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                        <FormItem>
                           <label>{'LastName'} <span className="start">*</span> </label>
                            {getFieldDecorator('lastName', { rules: rules.lastName })(<Input />)}
                        </FormItem>
                        </Col>
                        <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                        <FormItem>
                        <label>{'Email'} <span className="start">*</span> </label>
                            {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(<Input />)}
                        </FormItem>
                        </Col>
                       </div>
                       <div className="antd-row">
                       <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                        <FormItem>
                         <label>{'Contact Number'} <span className="start">*</span> </label>
                            {(<Input />)}
                        </FormItem>
                        </Col>
                        <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                        <FormItem>
                         <label>{'Status'} <span className="start">*</span> </label>
                            {(<Input />)}
                        </FormItem>
                        </Col>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="oigStatus">
                                <div className="floatleft">
                                    <h5><span className="text">OIG Status</span> <span className="faExIcon"> <AntdIcon type="ant-design-o" /></span></h5>
                                    <p className="noRecord">There was no record found</p>
                                </div>
                                <div className="floatright">
                                    <button type="submit" className="ant-btn ant-btn-default">OIG CHECK</button>
                                </div>
                            </div>
                            <div className="hrLine mb10">&nbsp;</div>
                        </div> 
                        </div>
                        <div className="antd-row">
                           <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                            <FormItem>
                              <label>{'User Type'} <span className="start">*</span> </label>
                                {getFieldDecorator('usertype', { rules: rules.userType })(<Input />)}
                            </FormItem>
                            </Col>
                            <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                            <FormItem>
                              <label>{'Login ID / Email'} <span className="start">*</span> </label>
                                {getFieldDecorator('loginidemail', { rules: rules.loginidEmail })(<Input />)}
                            </FormItem>
                            </Col>
                            <Col xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                            {this.props.modalType === 'edit' ? (
                            <FormItem>
                             <label>{'Password'} <span className="start">*</span></label><span className="SystemGenTExt">(System Genrated)</span>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                })(<Input type="password" />)}
                            </FormItem>
                        ) : null}
                            </Col>
                      </div>
                      <div className="hrLine mb10"></div>
                      <div className="antd-row">
                          <Col  xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                          <FormItem>
                      <label>{'Hiring Date'} <span className="start">*</span> </label>
                          {getFieldDecorator('hiringdate', { rules: rules.hiringDate })(<Input />)}
                          </FormItem>
                          </Col>
                          <Col  xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                          <FormItem>
                      <label>{'Department Code'} <span className="start">*</span> </label>
                          {getFieldDecorator('departmentcode', { rules: rules.departmentCode })(<Input />)}
                          </FormItem>
                          </Col>
                          <Col  xs={{ span:24}} sm={{ span:8 }} md={{ span:8 }} lg={{ span:8 }}>
                          <FormItem>
                      <label>{'job Code'} <span className="start">*</span> </label>
                          {getFieldDecorator('jobcode', { rules: rules.jobCode })(<Input />)}
                          </FormItem>
                          </Col>
                       </div>
                       </div>
                       <div className="buttonfooter">
                       <div className="antd-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="bulkImpFooter">
                                <ul className="bulkImpListing">
                                    <li>
                                    <Button onClick={onCreate} className="ant-btn-primary" type="primary">Submit</Button>
                                    </li>
                                    <li>
                                        <Button onClick={onCancel}  className="ant-btn-default">Cancel</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                    </TabPane>
                    <TabPane tab={'Courses'} key={'Courses'}>
                    <Row className="antd-row">
                        <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
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
                                <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
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
                                <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
                                    <h6>Description</h6>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="assignedBox">
                            <Row className="antd-row">
                                <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
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
                                <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
                                    <h6>Description</h6>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="assignedBox">
                            <Row className="antd-row">
                                <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
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
                                <Col xs={{ span:24}} sm={{ span:24 }} md={{ span:24}} lg={{ span:24}}>
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
