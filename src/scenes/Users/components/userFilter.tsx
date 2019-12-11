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
}

export interface IUserProps {
    userStore: UserStore;
}

export interface IFilterState {
    result: GetUserEntityListResponse[];
    groupvalue: string;
}

const { Option } = AutoComplete;
const dateFormat = AppConsts.dateFormat;


@inject(Stores.UserStore)
@observer
class UserFilter extends React.Component<IUserProps & IFilterProps, IFilterState> {

    constructor(props) {
        super(props);

        this.state = {
            result: [], groupvalue: ''
        };
    }

    groupSelect = (option: any) => {
        this.props.userStore.setFilter({ ...this.props.userStore.filters, groupId: option ? option.split("~")[0] : "", searchOnGroupId: option ? option.split("~")[1] : "" });
    }

    groupChange = (data: any) => {
        this.props.userStore.setFilter({ ...this.props.userStore.filters, groupId: "", searchOnGroupId: "" });
        this.setState({ groupvalue: data });
    }

    handleRefreshSearch = async () => {

        this.props.userStore.setFilter({ ...this.props.userStore.filters, groupId: "", searchOnGroupId: "", firstName: "", status: true });

        this.props.form.resetFields();

        this.setState({ groupvalue: '' });
    }

    handleAutoSearch = async (value: string) => {

        let searchresult: GetUserEntityListResponse[];

        if (value && this.props.userStore) {

            let data = await this.props.userStore.getEntityList({ SearchPhrase: value, RequesterUserId: this.props.userStore.userid, GroupId: '' });

            searchresult = data.items;
        }
        else {
            searchresult = [];
        }

        this.setState({ ...this.state, result: searchresult });
    };


    render() {

        if (this.props.userStore.filters === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;

        const { filters } = this.props.userStore;

        const { visible, onCancel, onCreate } = this.props;
        const { result } = this.state;

        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        return (
            <div className="overfowYauto">
                <Drawer title={'Advanced Filter'} width={350} onClose={onCancel} visible={visible} className="filterpopup">
                    <div className="filterBody">

                        <div className="filterForm">
                            <div className="antd-row">
                                <div className="ant-col-24">
                                    <div className="clearFilter" onClick={this.handleRefreshSearch}>
                                        <span className="cleText">Clear all Filters</span>
                                        <span className="cleIcon"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label>{'FirstName'}  </label>
                                        {getFieldDecorator('firstName', { initialValue: filters.firstName })(<Input placeholder='First Name' name="firstName" />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'LastName'}  </label>
                                        {getFieldDecorator('lastName', { initialValue: filters.lastName })(<Input placeholder='Last Name' name="lastName" />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Email'}  </label>
                                        {getFieldDecorator('emailAddress', { initialValue: filters.emailAddress })(<Input placeholder='Email Address' />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Group'}</label>
                                        <AutoComplete placeholder="Group 1/ Group 2/ Group 3" onSelect={this.groupSelect} onChange={this.groupChange} onSearch={this.handleAutoSearch} value={this.state.groupvalue}>
                                            {children}
                                        </AutoComplete>
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <label className="floatleft">{'Job Code'}</label>
                                        {getFieldDecorator('jobCodeId', { initialValue: filters.jobCodeId })(<Input placeholder='Job Code' />)}
                                    </FormItem>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <label className="floatleft">{'Hiring Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <FormItem>
                                                <li>
                                                    {getFieldDecorator('hiringDateFrom', { initialValue: (filters.hiringDateFrom !== null ? moment(filters.hiringDateFrom, dateFormat) : undefined) })(<DatePicker placeholder='Hiring Date' />)}
                                                </li>
                                            </FormItem>
                                            <li className="width10per">To</li>
                                            <FormItem>
                                                <li> {getFieldDecorator('hiringDateTo', { initialValue: (filters.hiringDateTo !== null ? moment(filters.hiringDateTo, dateFormat) : undefined) })(<DatePicker placeholder='Hiring Date' />)}</li>
                                            </FormItem>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">

                                    <label className="floatleft">{'Role Change Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <FormItem>
                                                <li>
                                                    {getFieldDecorator('roleChangeDateFrom', { initialValue: (filters.roleChangeDateFrom !== null ? moment(filters.roleChangeDateFrom, dateFormat) : undefined) })(<DatePicker placeholder='Change Date' />)}
                                                </li>
                                            </FormItem>
                                            <li className="width10per">To</li>
                                            <FormItem>
                                                <li>
                                                    {getFieldDecorator('roleChangeDateTo', { initialValue: (filters.roleChangeDateTo !== null ? moment(filters.roleChangeDateTo, dateFormat) : undefined) })(<DatePicker placeholder='Change Date' />)}
                                                </li>
                                            </FormItem>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <FormItem>
                                        <div><label>{'Status'}</label></div>
                                        <div className="switchbutton">
                                            <label className="mr8">{'Active'}</label>
                                            {getFieldDecorator('status', { initialValue: filters.status, valuePropName: "checked" })(<Checkbox />)}
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
            </div >
        );
    }
}

export default Form.create<IFilterProps>()(UserFilter);
