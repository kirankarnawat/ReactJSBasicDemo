import * as React from 'react';

import { Form, Input, Drawer, Button, Switch, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';

export interface IUserFilterProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
}

class UserFilter extends React.Component<IUserFilterProps> {
    state = {
        confirmDirty: false,
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate } = this.props;

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
                                    {getFieldDecorator('firstName')(<Input placeholder='First Name' />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'LastName'}  </label>
                                    {getFieldDecorator('lastName')(<Input placeholder='Last Name' />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Email'}  </label>
                                    {getFieldDecorator('emailAddress')(<Input placeholder='Email Address' />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Group'}</label>
                                    {getFieldDecorator('groupId')(<Input placeholder='Group 1/ Group 2/ Group 3' />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Job Code'}</label>
                                    {getFieldDecorator('jobCodeId')(<Input placeholder='Job Code' />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Hiring Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li> {getFieldDecorator('hiringDateFrom')(<DatePicker placeholder='Hiring Date' />)}</li>
                                            <li className="width10per">To</li>
                                            <li> {getFieldDecorator('hiringDateTo')(<DatePicker placeholder='Hiring Date' />)}</li>
                                        </ul>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Role Change Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li> {getFieldDecorator('roleChangeDateFrom')(<DatePicker placeholder='Role Change Date' />)}</li>
                                            <li className="width10per">To</li>
                                            <li> {getFieldDecorator('roleChangeDateTo')(<DatePicker placeholder='Role Change Date' />)}</li>
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

export default Form.create<IUserFilterProps>()(UserFilter);
