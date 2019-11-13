import * as React from 'react';

import { Form, Input, Drawer, Button } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import rules from './userFilter.validation';

//const TabPane = Tabs.TabPane;

export interface IUserFilterProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
}

class UserFilter extends React.Component<IUserFilterProps> {

    state = {
        confirmDirty: false,
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
            <Drawer title={'Filter'} onClose={onCancel} visible={visible} className="filterpopup">
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
                <label className="floatleft">{'UserType'} <span className="start">*</span> </label>
                <span className="clearText">Clear</span>
                    {getFieldDecorator('userType', { rules: rules.userType })(<Input />)}
                </FormItem>
                </div>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                <FormItem>
                <label className="floatleft">{'FirstName'} <span className="start">*</span> </label>
                <span className="clearText">Clear</span>
                    {getFieldDecorator('firstName', { rules: rules.firstName })(<Input />)}
                </FormItem>
                </div>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                <FormItem>
                <label className="floatleft">{'LastName'} <span className="start">*</span> </label>
                <span className="clearText">Clear</span>
                    {getFieldDecorator('lastName', { rules: rules.lastName })(<Input />)}
                </FormItem>
                </div>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                <FormItem>
                <label className="floatleft">{'Email'} <span className="start">*</span> </label>
                <span className="clearText">Clear</span>
                    {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(<Input />)}
                </FormItem>
                </div>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                <FormItem>
                <label className="floatleft">{'City'} <span className="start">*</span> </label>
                <span className="clearText">Clear</span>
                    {getFieldDecorator('City', { rules: rules.City })(<Input />)}
                </FormItem>
                </div>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                <FormItem>
                <label className="floatleft">{'State'} <span className="start">*</span> </label>
                <span className="clearText">Clear</span>
                    {getFieldDecorator('State', { rules: rules.State })(<Input />)}
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

export default Form.create<IUserFilterProps>()(UserFilter);
