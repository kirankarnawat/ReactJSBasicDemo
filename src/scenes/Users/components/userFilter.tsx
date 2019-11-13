import * as React from 'react';

import { Form, Input, Drawer, Button,Switch,DatePicker } from 'antd';
//import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import rules from './userFilter.validation';

//const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
}

class UserFilter extends React.Component<ICreateOrUpdateUserProps> {
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

        return (
            <Drawer title={'Advanced Filter'} width={320} onClose={onCancel} visible={visible} className="filterpopup">
                <div className="filterBody">
                    <div className="filterForm">
                        <div className="antd-row">
                            <div className="ant-col-24">
                                <div className="clearFilter">
                                    <span className="cleText">Clear all Filters</span>
                                    <span className="cleIcon"></span>
                                </div>
                            </div>
                        </div>

                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label>{'FirstName'}  </label>
                                    {getFieldDecorator('firstName', { rules: rules.firstName })(<Input />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'LastName'}  </label>
                                    {getFieldDecorator('lastName', { rules: rules.lastName })(<Input />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Email'}  </label>
                                    {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(<Input />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Group'}  </label>
                                    <Input />
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Job Code'}  </label>
                                    <Input />
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Hiring Date'}  </label>
                                    <div>
                                        <ul className="filterdatelist">
                                        <li> <DatePicker/></li>
                                            <li className="width10per">To</li>
                                            <li> <DatePicker/></li>
                                        </ul>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Role Change Date'}  </label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li> <DatePicker/></li>
                                            <li className="width10per">To</li>
                                            <li> <DatePicker/></li>
                                        </ul>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                <div><label>{'Status'}</label></div>
                                    <div className="switchbutton">
                                        <label className="mr8">{'Active'}</label> <Switch /> <label className="ml8">{'Inactive'}</label>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                    <div className="buttonfooter">
                        <div className="bulkImpFooter">
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <div className="filterFooter">
                                        <Button onClick={onCreate} type="primary">Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(UserFilter);
