import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Form, Input, Drawer, Button, DatePicker, AutoComplete, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import AppConsts from '../../../lib/appconst';

import moment from 'moment';

import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';

export interface IFilterProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
    onGroupSelect: (option: any) => void;
    onGroupChange: () => void;
    onHandleAutoSearch: (value: string) => void;
    autoDataRef: GetUserEntityListResponse[];
}

export interface IUserProps {
    userStore: UserStore;
}

const { Option } = AutoComplete;
const dateFormat = AppConsts.dateFormat;


@inject(Stores.UserStore)
@observer
class UserFilter extends React.Component<IUserProps & IFilterProps> {
    state = {
        confirmDirty: false,
        filtermodalVisible: false,
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {

        if (this.props.userStore.filters === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate, onGroupSelect, onGroupChange, onHandleAutoSearch, autoDataRef } = this.props;

        const children = autoDataRef.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        return (
            <div className="overfowYauto">
                <Drawer title={'Advanced Filter'} width={350} onClose={onCancel} visible={visible} className="filterpopup">
                    <div className="filterBody">

                        <div className="filterForm">
                            <div className="antd-row">
                                <div className="ant-col-24">
                                    <div className="clearFilter" onClick={this.handleReset}>
                                        <span className="cleText">Clear all Filters</span>
                                        <span className="cleIcon"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label>{'FirstName'}  </label>
                                        {getFieldDecorator('firstName', { initialValue: this.props.userStore.filters.firstName })(<Input placeholder='First Name' name="firstName" />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'LastName'}  </label>
                                        {getFieldDecorator('lastName', { initialValue: this.props.userStore.filters.firstName })(<Input placeholder='Last Name' name="lastName" />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Email'}  </label>
                                        {getFieldDecorator('emailAddress', { initialValue: this.props.userStore.filters.emailAddress })(<Input placeholder='Email Address' />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Group'}</label>
                                        <AutoComplete placeholder="Group 1/ Group 2/ Group 3" onSelect={onGroupSelect} onChange={onGroupChange} onSearch={onHandleAutoSearch}>
                                            {children}
                                        </AutoComplete>
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Job Code'}</label>
                                        {getFieldDecorator('jobCodeId', { initialValue: this.props.userStore.filters.jobCodeId })(<Input placeholder='Job Code' />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Hiring Date'}</label>
                                        <div>
                                            <ul className="filterdatelist">
                                                <li>
                                                    {getFieldDecorator('hiringDateFrom', { initialValue: (this.props.userStore.filters.hiringDateFrom !== null ? moment(this.props.userStore.filters.hiringDateFrom, dateFormat) : undefined) })(<DatePicker placeholder='Hiring Date' />)}
                                                </li>
                                                <li className="width10per">To</li>
                                                <li> {getFieldDecorator('hiringDateTo', { initialValue: (this.props.userStore.filters.hiringDateTo !== null ? moment(this.props.userStore.filters.hiringDateTo, dateFormat) : undefined) })(<DatePicker placeholder='Hiring Date' />)}</li>
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
                                                <li>
                                                    {getFieldDecorator('roleChangeDateFrom', { initialValue: (this.props.userStore.filters.roleChangeDateFrom !== null ? moment(this.props.userStore.filters.roleChangeDateFrom, dateFormat) : undefined) })(<DatePicker placeholder='Change Date' />)}
                                                </li>
                                                <li className="width10per">To</li>
                                                <li>
                                                    {getFieldDecorator('roleChangeDateTo', { initialValue: (this.props.userStore.filters.roleChangeDateTo !== null ? moment(this.props.userStore.filters.roleChangeDateTo, dateFormat) : undefined) })(<DatePicker placeholder='Change Date' />)}
                                                </li>
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
                                            <label className="mr8">{'Active'}</label>
                                            {getFieldDecorator('status', { initialValue: this.props.userStore.filters.status, valuePropName: "checked" })(<Checkbox />)}
                                        </div>
                                    </FormItem>
                                </div>
                            </div>
                        </div>

                        <div className="btnfooterContainer">
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <ul className="bulkImpListing">
                                        <li>
                                            <Button onClick={onCreate} type="primary">Submit</Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Form.create<IFilterProps>()(UserFilter);
