
import * as React from 'react';

import { Form, Drawer, Col, Input, Empty, AutoComplete, Spin, message, Popconfirm } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';

import commonconst from '../../../lib/commonconst';


//#region Local State and Property
export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemPeoplePickerProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    chaingroupid: string;
    chainroleid: string;
    chainsearchon: string;
}

export interface ISystemPeopleState {
    fname: string;
    selGrpid: string;
    loading: boolean;
    result: GetUserEntityListResponse[];
}

const { Option } = AutoComplete;

@inject(Stores.GroupStore)
@observer
class SystemPeoplePicker extends React.Component<IGroupProps & ISystemPeoplePickerProps, ISystemPeopleState> {

    constructor(props) {
        super(props);
        this.state = {
            result: [], fname: '', selGrpid: '', loading: false,
        }
    }


    handleAddGroupUser = async (val: string) => {

        this.setState({ ...this.state, loading: true });

        let res = await this.props.groupStore.userRoleAssign({ groupId: this.props.chaingroupid, requesterUserId: this.props.groupStore.userid, roleId: this.props.chainroleid, userId: val });

        (res) ? message.success(commonconst.MESSAGES.USERASSIGNSUCCESS) : message.error(commonconst.MESSAGES.COMMONERROR);

        await this.props.groupStore.getGroupAdminUsers({ GroupId: this.props.chaingroupid, SearchOnGroupId: this.props.chainsearchon, RequesterUserId: this.props.groupStore.userid });

        this.setState({ ...this.state, loading: false });
    }


    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ ...this.state, result: [] });

        this.props.form.resetFields();
    }

    firstNameChange = (event: any) => {

        this.setState({ ...this.state, fname: event.target.value });
    }

    handleAutoSearch = async (value: string) => {

        let searchresult: GetUserEntityListResponse[];

        if (value && this.props.groupStore) {

            let data = await this.props.groupStore.getSearchEntityList({ SearchPhrase: value, RequesterUserId: this.props.groupStore.userid, GroupId: '' });

            searchresult = data.items;
        }
        else {
            searchresult = [];
        }

        this.setState({ ...this.state, result: searchresult });
    };

    handleAutoSelect = (val) => {

        this.setState({ ...this.state, selGrpid: val });
    }

    groupChange = (data: any) => {

        this.setState({ ...this.state, selGrpid: data });
    }

    getSystemUsersList = async () => {

        this.setState({ ...this.state, loading: true });

        var grpid = this.state.selGrpid ? this.state.selGrpid.split('~')[0] : this.props.chaingroupid;
        var searchgrid = this.state.selGrpid ? this.state.selGrpid.split('~')[1] : '';

        await this.props.groupStore.getSystemUsers({ groupId: grpid, noPaging: true, requesterUserId: this.props.groupStore.userid, status: true, firstName: this.state.fname, searchOnGroupId: searchgrid });

        this.setState({ ...this.state, loading: false });
    }

    handleRefreshSearch = async () => {

        this.setState({ ...this.state, loading: true });

        await this.props.groupStore.getSystemUsers({ groupId: this.props.chaingroupid, noPaging: true, requesterUserId: this.props.groupStore.userid, status: true, firstName: '', searchOnGroupId: '' });

        this.setState({ ...this.state, result: [], fname: '', selGrpid: '', loading: false });
    }


    render() {

        if (!this.props.groupStore.systemUsers) return (<div></div>);

        const { visible } = this.props;

        const { result } = this.state;

        const { systemUsers, assignedAdmin } = this.props.groupStore;

        const child =
            ((systemUsers && systemUsers.length > 0) ? systemUsers.map((item, index) => (
                <li key={item.groupId + index}>
                    <span className="textData">
                        <h6>{item.firstName} {item.lastName}</h6>
                        <p>{item.groupName}</p>
                    </span>
                    {
                        (assignedAdmin && ( assignedAdmin.items.length === 0 || assignedAdmin.items.find(p => p.userId === item.userId) === undefined)) ?
                            <Popconfirm title="Are you sure assign this user?" onConfirm={() => this.handleAddGroupUser(item.userId)} okText="Yes" cancelText="No"                            >
                                <span className="rightCont"><span className="floatright"><span className="icon iconUser" ></span></span></span>
                            </Popconfirm>
                            : <span></span>
                    }
                </li>
            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);


        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName + ' _ ' + item.groupType}</Option>);

        return (

            <Drawer title={'People Picker'} width={340} onClose={this.onHanleResetForm} destroyOnClose={true} visible={visible}>
                <div className="peopleEditPgs">

                    <div className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <FormItem>
                                <label>{'People Search'} </label>
                                <Input placeholder="First Name / Last Name / Email Address" allowClear={true} onChange={this.firstNameChange} value={this.state.fname}>
                                </Input>
                            </FormItem>
                        </Col>
                    </div>

                    <div className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <FormItem>
                                <label>{'Association/ Brand/ Pharmacy/ NCPDP'} </label>
                                <AutoComplete placeholder="Association/ Brand/ Pharmacy/ NCPDP" allowClear={true} onChange={this.groupChange} onSearch={this.handleAutoSearch} value={this.state.selGrpid} onSelect={this.handleAutoSelect} >
                                    {children}
                                </AutoComplete>
                            </FormItem>
                        </Col>
                    </div>

                    <div className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <div className="searchbg" onClick={this.getSystemUsersList} >
                                <span className="tabsearchbtn"></span>
                            </div>
                            <div className="refreshbg" onClick={this.handleRefreshSearch} ><span className="refreshbtn"></span></div>
                        </Col>
                    </div>

                    <Spin spinning={this.state.loading}>
                        <div className="antd-row">
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <ul className="peopleList">
                                    {child}
                                </ul>
                            </Col>
                        </div>
                    </Spin>

                </div>
            </Drawer>
        );
    }
}

export default Form.create<ISystemPeoplePickerProps>()(SystemPeoplePicker);

