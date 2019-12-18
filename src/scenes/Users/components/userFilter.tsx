import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Form, Input, Drawer, Button, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import AppConsts from '../../../lib/appconst';

import 'font-awesome/css/font-awesome.min.css'

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
}

const dateFormat = AppConsts.dateFormat;


@inject(Stores.UserStore)
@observer
class UserFilter extends React.Component<IUserProps & IFilterProps, IFilterState> {

    constructor(props) {
        super(props);

        this.state = {
            result: []
        };
    }

    handleRefreshSearch = async () => {

        this.props.userStore.setFilter({ ...this.props.userStore.filters, emailAddress: '', jobCodeId: '', hiringDateTo: null, hiringDateFrom: null, roleChangeDateTo: null, roleChangeDateFrom: null });
        this.props.form.resetFields();
    }

    render() {

        if (this.props.userStore.filters === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;

        const { filters } = this.props.userStore;

        const { visible, onCancel, onCreate } = this.props;

        return (
            <div className="overfowYauto">
                <Drawer title={'Advanced Filter'} width={300} onClose={onCancel} visible={visible} className="filterpopup">
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
                                        <label className="floatleft">{'Email'}  </label>
                                        {getFieldDecorator('emailAddress', { initialValue: filters.emailAddress })(<Input placeholder='Email Address' />)}
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
                                    <label className="floatleft mb5">{'Hiring Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li>
                                                <FormItem>
                                                    {getFieldDecorator('hiringDateFrom', { initialValue: (filters.hiringDateFrom !== null ? moment(filters.hiringDateFrom, dateFormat) : null) })(<DatePicker placeholder='Hiring Date' />)}
                                                </FormItem>
                                            </li>
                                            <li className="width10per"><label>To</label></li>
                                            <li> <FormItem> {getFieldDecorator('hiringDateTo', { initialValue: (filters.hiringDateTo !== null ? moment(filters.hiringDateTo, dateFormat) : null) })(<DatePicker placeholder='Hiring Date' />)} </FormItem></li>

                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <label className="floatleft mb5">{'Role Change Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li><FormItem>
                                                {getFieldDecorator('roleChangeDateFrom', { initialValue: (filters.roleChangeDateFrom !== null ? moment(filters.roleChangeDateFrom, dateFormat) : null) })(<DatePicker placeholder='Change Date' />)}
                                            </FormItem>
                                            </li>

                                            <li className="width10per"><label>To</label></li>
                                            <li><FormItem>
                                                {getFieldDecorator('roleChangeDateTo', { initialValue: (filters.roleChangeDateTo !== null ? moment(filters.roleChangeDateTo, dateFormat) : null) })(<DatePicker placeholder='Change Date' />)}
                                            </FormItem>
                                            </li>
                                        </ul>
                                    </div>

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
