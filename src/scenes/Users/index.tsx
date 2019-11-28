// #region
import * as React from 'react';

import { Card, Col, Modal, Row, Table, Icon, Switch, Input, AutoComplete } from 'antd';

import { inject, observer } from 'mobx-react';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import BulkImport from './components/bulkImport';
import UserFilter from './components/userFilter';
import ResetPassword from './components/resetPassword';

import { EntityDto } from '../../services/dto/entityDto';
import { GetUserEntityListResponse } from '../../services/user/dto/Response/getUserEntityListResponse';

import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';

// #endregion

// #region Local State and Property
export interface IUserProps {
    userStore: UserStore;
}

export interface IUserState {
    modalVisible: boolean;
    filterModalVisible: boolean;
    bulkModalVisible: boolean;
    resetpassModalVisible: boolean;
    userId: string;
    result: GetUserEntityListResponse[];
    entityresult: GetUserEntityListResponse[];
    firstName: string
    groupId: string;
    searchOnGroupId: string;
    status: boolean | null;
}

const confirm = Modal.confirm;
const { Option } = AutoComplete;

// #endregion


@inject(Stores.UserStore)
@observer
class User extends React.Component<IUserProps, IUserState> {
    //#region Init
    constructor(props: IUserProps) {
        super(props);
        debugger;
        this.state = {
            modalVisible: false,
            filterModalVisible: false,
            bulkModalVisible: false,
            resetpassModalVisible: false,
            userId: '',
            result: [],
            entityresult: [],
            firstName: '',
            groupId: '',
            searchOnGroupId: '',
            status: null
        };
    }

    filterFormRef: any;
    addeditUserFormRef: any;
    bulkimportFormRef: any;
    resetPasswordFormRef: any;

    //run on start
    async componentDidMount() {
        debugger;
        await this.props.userStore.initFilter();
        await this.getAll();
    }

    //get user data
    async getAll() {
        debugger;
        await this.props.userStore.getAll({ ...this.props.userStore.filters });
    }
    // #endregion

    //#region Pagination with sorting
    handleTableChange = (pagination: any, sorter: any) => {
        if (sorter.order) { this.props.userStore.filters.sortExp = sorter.field + " " + (sorter.order == "ascend" ? "asc" : "desc"); }
        this.props.userStore.filters.pageIndex = pagination.current;
        this.setState({ userId: '' }, async () => await this.getAll());
    };
    //#endregion


    //#region Drawer visibility
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    switchChange = (checked: boolean) => {
        this.props.userStore.filters.status = checked ? null : true;
    }
    firstNameChange = (event: any) => {
        this.props.userStore.filters.firstName = event.target.value;
    }

    groupSelect = (option: any) => {
        this.props.userStore.filters.groupId = option ? option.split("~")[0] : "";
        this.props.userStore.filters.searchOnGroupId = option ? option.split("~")[1] : "";
    }

    groupChange = () => {
        this.props.userStore.filters.groupId = "";
        this.props.userStore.filters.searchOnGroupId = "";
    }

    handleSearch = async () => {
        await this.getAll();
    }


    FilterModal = () => {
        this.setState({
            filterModalVisible: !this.state.filterModalVisible,
        });
    };

    bulkmodal = () => {
        this.setState({
            bulkModalVisible: !this.state.bulkModalVisible,
        });
    };
    resetPassword = () => {
        this.setState({
            resetpassModalVisible: !this.state.resetpassModalVisible,
        });
    };

    //REFERENCES
    savefilterFormRef = (formRef: any) => {
        this.filterFormRef = formRef;
    };

    saveaddeditFormRef = (formRef: any) => {
        this.addeditUserFormRef = formRef;
    };

    savebulkimportFormRef = (formRef: any) => {
        this.bulkimportFormRef = formRef;
    };

    saveresetPasswordFormRef = (formRef: any) => {
        this.resetPasswordFormRef = formRef;
    };

    // #endregion -----------------------------

    //#region drawer data

    //ADD EDIT DRAWER
    async createOrUpdateModalOpen(entityDto: EntityDto) {
        if (entityDto.id === '') {
            await this.props.userStore.createUser();
            await this.props.userStore.GetUserJobRoles();
        } else {
            await this.props.userStore.getUserById({ userId: entityDto.id, requesterUserId: this.props.userStore.userid });
            await this.props.userStore.GetUserJobRoles();
        }

        this.setState({ userId: entityDto.id });
        this.Modal();

        this.addeditUserFormRef.props.form.setFieldsValue({ ...this.props.userStore.user });
    }


    //ADD EDIT USER DATA
    handleCreate = () => {
        const form = this.addeditUserFormRef.props.form;

        form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            } else {
                if (this.state.userId === '') {
                    await this.props.userStore.create(values);
                } else {
                    await this.props.userStore.update({ userId: this.state.userId, ...values });
                }
            }

            await this.getAll();
            this.setState({ modalVisible: false });
            form.resetFields();
        });
    };

    //FILER DRAWER
    async filterModalOpen() {

        this.FilterModal();

        this.filterFormRef.props.form.setFieldsValue({ ...this.props.userStore.filters });
    }

    //FILTER USER DATA
    handleAdvFilter = () => {
        debugger;
        const form = this.filterFormRef.props.form;

        form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            } else {
                this.props.userStore.filters = values;
                this.props.userStore.filters.requesterUserId = this.props.userStore.userid;
            }

            await this.getAll();
            this.setState({ filterModalVisible: false });
            form.resetFields();
        });
    }

    //BULK IMPORT DRAWER
    async bulkImportmedelOpen(entityDto: EntityDto) {
        this.setState({ userId: entityDto.id });
        this.bulkmodal();
        // this.bulkimportFormRef.props.form.setFieldsValue({ ...this.props.userStore.editUser, roleNames: this.props.userStore.editUser.roleNames });
    }
    async resetpasswordmedelOpen(entityDto: EntityDto) {
        this.setState({ userId: entityDto.id });
        this.resetPassword();
        // this.bulkimportFormRef.props.form.setFieldsValue({ ...this.props.userStore.editUser, roleNames: this.props.userStore.editUser.roleNames });
    }

    //HANDLE AUTO SEARCH
    handleAutoSearch = async (value: string) => {
        let result: GetUserEntityListResponse[];

        if (value && this.props.userStore && this.props.userStore.userentity && this.props.userStore.userentity.items) {

            await this.props.userStore.getEntityList({ SearchPhrase: value, RequesterUserId: this.props.userStore.userid, GroupId: '' });

            result = this.props.userStore.userentity.items;
        }
        else {
            result = [];
        }

        this.setState({ result });
    };

    //#endregion


    delete(input: EntityDto) {
        const self = this;
        confirm({
            title: 'Do you Want to delete these items?',
            onOk() {
                self.props.userStore.delete(input);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    public render() {

        const { users } = this.props.userStore;
        const { result } = this.state;

        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        const columns = [
            {
                title: 'FirstName', dataIndex: 'firstName', sorter: true, key: 'firstName', width: 150,
                render: (text: string, item: any) => <div> {(item.status === false) ? <span className="disabledrow"></span> : <span></span>} <span className="adminIcon"></span> {text}</div>
            },
            { title: 'LastName', dataIndex: 'lastName', sorter: true, key: 'lastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'EmailAddress', dataIndex: 'emailAddress', sorter: true, key: 'emailAddress', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Job Code', dataIndex: 'jobCode', sorter: true, key: 'jobCode', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Group Name', dataIndex: 'group1Name', sorter: true, key: 'group1Name', width: 150, render: (text: string) => <div>{text}</div> },
            {
                title: 'Options',
                width: 150, dataIndex: 'userId', key: 'userId',
                render: (text: string) => (
                    <div>
                        <div className="tablehoverbuttons"> <Icon type="ellipsis" className="ellipsisIcon" />
                            <div className="buttonshover">
                                <div className="resetpassword" onClick={() => this.resetpasswordmedelOpen({ id: text })} title="Reset password"></div>
                                <div className="bargraph" onClick={() => this.createOrUpdateModalOpen({ id: text })} title="Progress"></div>
                                <div className="transfer" onClick={() => this.delete({ id: text })} title="Transparent"></div>

                                <div className="editbtn" onClick={() => this.createOrUpdateModalOpen({ id: text })} title="Edit User"></div>

                            </div>
                        </div>
                    </div>
                ),
            },
        ];

        return (
            <Card>
                <Row>
                    <Col className="contentHeader">
                        <div className="conHeader">
                            <div className="antd-row">
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                                    <Col className="floatleft"
                                        xs={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        md={{ span: 24 }}
                                        lg={{ span: 12 }}>

                                        <div className="heading">
                                            <h2>Manage Users</h2>
                                        </div>

                                    </Col>
                                    <Col className="push"
                                        xs={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        md={{ span: 24 }}
                                        lg={{ span: 12 }}>
                                        <div className="floatright">
                                            <ul className="headerListing floatleft">

                                                <li><a href="#" onClick={() => this.createOrUpdateModalOpen({ id: '' })}><span className="text">Add User</span> <span className="icon iconUser">&nbsp;</span></a></li>
                                                <li className="active" onClick={() => this.bulkImportmedelOpen({ id: '' })}><a href="#"><span className="text">Bulk Import</span> <span className="icon iconbulkImp">&nbsp;</span></a></li>
                                                <li><a href="#"><span className="text">Export to Excel</span> <span className="icon iconExTOEx">&nbsp;</span></a></li>
                                            </ul>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="filtercontainer">
                    <div className="conHeader">
                        <div className="tblFilter">
                            <div className="antd-row">
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8">
                                    <div>
                                        <h6><strong>Showing 10 of 500 entries</strong></h6>
                                    </div>
                                </div>
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-16">
                                    <ul className="filterlist">
                                        <li><div className="switchbutton mt5">
                                            <label className="mr8">{'Active'}</label> <Switch onChange={this.switchChange} /> <label className="ml8">{'All'}</label>
                                        </div>
                                        </li>
                                        <li className="width227">
                                            <Input placeholder="First Name/ Last Name" onChange={this.firstNameChange} />
                                        </li>
                                        <li className="width227">
                                            <AutoComplete placeholder="Group 1/ Group 2/ Group 3" onSelect={this.groupSelect} onChange={this.groupChange} onSearch={this.handleAutoSearch}>
                                                {children}
                                            </AutoComplete>
                                        </li>
                                        <li>
                                            <div className="searchbg" onClick={this.handleSearch} >
                                                <span className="tabsearchbtn"></span>
                                                {/* <Icon type="search" /> */}
                                            </div>
                                        </li>
                                        <li><div className="refreshbg"><span className="refreshbtn"></span></div></li>
                                        <li>
                                            <div className="filterWrapp floatright" onClick={() => this.filterModalOpen()}>
                                                <a href="#">
                                                    <span id="sidebarCollapse" className="filterIcon">&nbsp;</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Row className="antd-row">
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 24, offset: 0 }}
                        lg={{ span: 24, offset: 0 }}
                        xl={{ span: 24, offset: 0 }}
                        xxl={{ span: 24, offset: 0 }}
                    >
                        <div className="tableContainer table-responsive">
                            <Table
                                rowKey={record => record.userId}
                                size={'default'}
                                bordered={true}
                                columns={columns}
                                pagination={{ size: 'small', pageSize: 10, total: users === undefined ? 0 : users.totalCount, defaultCurrent: 1 }}
                                loading={users === undefined ? true : false}
                                dataSource={users === undefined ? [] : users.items}
                                onChange={this.handleTableChange}
                                className="table"
                            />
                        </div>
                    </Col>
                </Row>

                <UserFilter
                    wrappedComponentRef={this.savefilterFormRef}
                    visible={this.state.filterModalVisible}
                    onCancel={() =>
                        this.setState({
                            filterModalVisible: false,
                        })
                    }
                    onCreate={this.handleAdvFilter}
                    onGroupSelect={this.groupSelect}
                    onGroupChange={this.groupChange}
                    onHandleAutoSearch={this.handleAutoSearch}
                    autoDataRef={this.state.result}
                />



                <CreateOrUpdateUser
                    wrappedComponentRef={this.saveaddeditFormRef}
                    visible={this.state.modalVisible}
                    onCancel={() =>
                        this.setState({
                            modalVisible: false,
                        })
                    }
                    modalType={this.state.userId === '' ? 'create' : 'edit'}
                    onHandleAutoSearch={this.handleAutoSearch}
                    autoDataRef={this.state.result}
                    id={this.state.userId}
                />



                <BulkImport
                    wrappedComponentRef={this.savebulkimportFormRef}
                    visible={this.state.bulkModalVisible}
                    onCancel={() =>
                        this.setState({
                            bulkModalVisible: false,
                        })
                    }
                    modalType={this.state.userId === '' ? 'edit' : 'create'}
                    onCreate={this.handleCreate}
                />

                <ResetPassword
                    wrappedComponentRef={this.saveresetPasswordFormRef}
                    visible={this.state.resetpassModalVisible}
                    onCancel={() =>
                        this.setState({
                            resetpassModalVisible: false,
                        })
                    }
                    modalType={this.state.userId === '' ? 'edit' : 'create'}
                    onCreate={this.handleCreate}
                />
            </Card>
        );
    }
}

export default User;
