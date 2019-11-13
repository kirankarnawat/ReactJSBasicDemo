import * as React from 'react';
import { Form, Input, Tabs, Drawer, Button,Col,Row,Icon,Switch} from 'antd';
//import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import rules from './createOrUpdateUser.validation';
import UserEntityTree from './userEntityTree';

const TabPane = Tabs.TabPane;
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
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate } = this.props;
        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={onCancel} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                    <div className="sysId">system ID: 00006</div>
                    <div className="pos">
                    <div className="antd-row">
                          <Col  xs={{ span:24}} sm={{ span:24 }} md={{ span:24 }} lg={{ span:24 }}>
                    <FormItem>
                      <label>{'Search User Group'} <span className="start">*</span> </label>
                      <div className="rel">
                          {getFieldDecorator('departmentcode', { rules: rules.departmentCode })(<Input />)}
                          <div className="searchbtn"><Icon type="search" /> </div>
                          </div>
                          </FormItem>
                          </Col>
                       </div>
                       <div><UserEntityTree /></div>
                    <div className="hrLine mb15"></div>
                    <Row className="antd-row">
                      <Col lg={{span:12}} sm={{span:12}} md={{span:12}} xs={{span:12}}>
                      <FormItem>
                      <label>{'Frist Name'} <span className="start">*</span> </label>
                          {getFieldDecorator('hiringdate', { rules: rules.hiringDate })(<Input />)}
                          </FormItem>
                      </Col>
                      <Col lg={{span:12}} sm={{span:12}} md={{span:12}} xs={{span:12}}>
                      <FormItem>
                      <label>{'Last Name'} <span className="start">*</span> </label>
                          {getFieldDecorator('hiringdate', { rules: rules.hiringDate })(<Input />)}
                          </FormItem>
                      </Col>
                      </Row>
                      <Row className="antd-row">
                      <Col lg={{span:12}} sm={{span:12}} md={{span:12}} xs={{span:12}}>
                      <FormItem>
                      <label>{'Email Or Username'} <span className="start">*</span> </label>
                          {getFieldDecorator('hiringdate', { rules: rules.hiringDate })(<Input />)}
                          </FormItem>
                      </Col>
                      <Col lg={{span:12}} sm={{span:12}} md={{span:12}} xs={{span:12}}>
                      <FormItem>
                      <label>{'Contact Number'} <span className="start">*</span> </label>
                          {getFieldDecorator('hiringdate', { rules: rules.hiringDate })(<Input />)}
                          </FormItem>
                      </Col>
                      </Row>
                      <Row className="antd-row">
                      <Col lg={{span:12}} sm={{span:12}} md={{span:12}} xs={{span:12}}>
                      <FormItem>
                        <div className="switchbutton">
                      <div><label>{'Status'} <span className="start">*</span> </label></div>
                      <label className="mr8">{'Active'}</label> <Switch/> <label className="ml8">{'Inactive'}</label>
                        </div>
                          </FormItem>
                      </Col>
                      </Row>
                      <div className="hrLine mb15"></div>
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
