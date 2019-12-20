
// #region
import * as React from 'react';

import { Card, Col, Modal, Row, Table, Icon } from 'antd';

import { inject, observer } from 'mobx-react';

import UserQuickFilter from './components/userQuickFilter';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import UserFilter from './components/userFilter';
import BulkImport from './components/bulkImport';
import ResetPassword from './components/resetPassword';

import { EntityDto } from '../../services/dto/entityDto';
import { GetUserEntityListResponse } from '../../services/user/dto/Response/getUserEntityListResponse';
import { PagedResultDto } from '../../services/dto/pagedResultDto';

import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';
import { GetAllUserResponse } from '../../services/user/dto/Response/getAllUserResponse';

import AppConsts from '../../lib/appconst';

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
    firstName: string
    groupId: string;
    searchOnGroupId: string;
    status: boolean | null;
    users: PagedResultDto<GetAllUserResponse>;
    addeditentitydata: GetUserEntityListResponse[];
}

const confirm = Modal.confirm;
const pagesize = AppConsts.pagesize;

// #endregion


@inject(Stores.UserStore)
@observer
class User extends React.Component<IUserProps, IUserState> {

    constructor(props: IUserProps) {
        super(props);
        this.state = {
            modalVisible: false,
            filterModalVisible: false,
            bulkModalVisible: false,
            resetpassModalVisible: false,
            userId: "",
            addeditentitydata: [],
            firstName: '',
            groupId: "",
            searchOnGroupId: "",
            status: null,
            users: { items: [], totalCount: 0 }
        };
    }

    // #region GLOBALS
    quickfilterFormRef: any;
    filterFormRef: any;
    addeditUserFormRef: any;
    bulkimportFormRef: any;
    resetPasswordFormRef: any;

    savequickfilterFormRef = (formRef: any) => {
        this.quickfilterFormRef = formRef;
    };

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

    // #endregion


    // #region USER MANAGEMENT

    // start up event
    async componentDidMount() {

        await this.props.userStore.initFilter();

        await this.getAll();
    }

    //get user data
    async getAll() {

        let res = await this.props.userStore.getAll({ ...this.props.userStore.filters });

        this.setState({ ...this.state, users: res });
    }

    //table management
    handleTableChange = async (pagination: any, filters: any, sorter: any) => {

        if (sorter.order) {
            this.props.userStore.setFilter({
                ...this.props.userStore.filters, sortExp: sorter.field + " " + (sorter.order == "ascend" ? "asc" : "desc")
            });
        }

        this.props.userStore.setFilter({ ...this.props.userStore.filters, pageIndex: pagination.current });

        await this.getAll();
    };

    // search
    handleSearch = async () => {
        await this.getAll();
    }

    // #endregion


    // #region MODAL POP

    // show modal
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

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

    // #endregion


    // #region HANDLE CREATE-EDIT

    //ADD EDIT DRAWER OPEN
    async createOrUpdateModalOpen(entityDto: EntityDto) {

        let data;

        if (entityDto.id === '') {
            await this.props.userStore.createUser();
            data = [];
        } else {
            debugger;
            await this.props.userStore.getUserById({ userId: entityDto.id, requesterUserId: this.props.userStore.userid });
            let res = await this.props.userStore.getEntityList({ SearchPhrase: '', RequesterUserId: this.props.userStore.userid, GroupId: this.props.userStore.userById.groupId });
            data = (res !== undefined) ? res.items : [];
        }

        await this.props.userStore.getUserJobRoles();

        this.setState({ userId: entityDto.id, addeditentitydata: data });
        this.Modal();
    }


    //ADD EDIT USER DATA
    onHandlecreateOrUpdateModalClose = async () => {

        this.setState({ modalVisible: false, userId: "" });

        const form = this.addeditUserFormRef.props.form;
        form.resetFields();

        await this.getAll();
    };


    // #endregion


    // #region HANDLE FILTER

    //FILER DRAWER
    async filterModalOpen() {

        this.FilterModal();
    }


    //FILTER USER DATA
    handleAdvFilter = () => {
        debugger;
        const form = this.filterFormRef.props.form;

        form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            } else {
                this.props.userStore.setFilter({
                    ...this.props.userStore.filters, firstName: values["firstName"], lastName: values["lastName"], emailAddress: values["emailAddress"],
                    jobCodeId: values["jobCodeId"], hiringDateFrom: values["hiringDateFrom"], hiringDateTo: values["hiringDateFrom"], roleChangeDateFrom: values["roleChangeDateFrom"],
                    roleChangeDateTo: values["roleChangeDateTo"], status: values["status"]
                });
            }

            await this.getAll();
            this.setState({ filterModalVisible: false });
            form.resetFields();
        });
    }

    // #endregion


    // #region HANDLE BULK IMPORT
    //BULK IMPORT DRAWER
    async bulkimportModalOpen() {

        this.bulkmodal();
    }

    onHadnleBulkImportModalClose = async () => {

        this.setState({ ...this.state, bulkModalVisible: false });

        const form = this.addeditUserFormRef.props.form;
        form.resetFields();

        await this.getAll();
    };

    // #endregion


    // #region HANDLE RESET PASSWORD
    //BULK IMPORT DRAWER
    async resetpasswordModalOpen(entityDto: EntityDto) {

        this.setState({ userId: entityDto.id });

        this.resetPassword();
    }

    onHandleResetPwdModalClose = async () => {

        this.setState({ ...this.state, resetpassModalVisible: false });

        const form = this.addeditUserFormRef.props.form;
        form.resetFields();
    };
    // #endregion


    // #region EXPORT TO EXCEL

    handleDownloadFile = async () => {

        var datatype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        let data = await this.props.userStore.exportUserData(this.props.userStore.filters);

        const blob = new Blob([data], { type: datatype });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
       
        link.href = url;
        link.setAttribute('download', "User Data_" + new Date().toLocaleString().replace(',', '_').replace(' ','_'));

        document.body.appendChild(link);

        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    }

    // #endregion

    delete(input: EntityDto) {
        //const self = this;

        confirm({
            title: 'Do you Want to delete these items?',
            onOk() {
                //self.props.userStore.delete(input);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    public render() {

        const { users } = this.state;

        const columns = [
            {
                title: 'FirstName', dataIndex: 'firstName', sorter: true, key: 'firstName', width:400,
                render: (text: string, item: any) => <div> {(item.status === false) ? <span className="disabledrow"></span> : <span></span>} <span className="adminIcon"></span> {text}</div>
            },
            { title: 'LastName', dataIndex: 'lastName', sorter: true, key: 'lastName', width: 200, render: (text: string) => <div>{text}</div> },
            { title: 'EmailAddress', dataIndex: 'emailAddress', sorter: true, key: 'emailAddress', width:500, render: (text: string) => <div>{text}</div> },
            { title: 'Job Code', dataIndex: 'jobCode', sorter: true, key: 'jobCode', width:200, render: (text: string) => <div>{text}</div> },
            { title: 'Group Name', dataIndex: 'group1Name', sorter: true, key: 'group1Name', width: 200, render: (text: string) => <div>{text}</div> },
            {
                title: 'Options',
                width: 100, dataIndex: 'userId', key: 'userId',
                render: (text: string) => (
                    <div>
                        <div className="tablehoverbuttons"> <Icon type="ellipsis" className="ellipsisIcon" />
                            <div className="buttonshover">
                                <div className="resetpassword" onClick={() => this.resetpasswordModalOpen({ id: text })} title="Reset password"></div>
                                { /*
                                <div className="bargraph" onClick={() => this.createOrUpdateModalOpen({ id: text })} title="Progress"></div>
                                <div className="transfer" onClick={() => this.delete({ id: text })} title="Transparent"></div>
                                */}

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
                                                <li className="active"><a href="#" onClick={() => this.createOrUpdateModalOpen({ id: '' })}><span className="text">Add User</span> <span className="icon iconUser">&nbsp;</span></a></li>
                                                <li onClick={() => this.bulkimportModalOpen()}><a href="#"><span className="text">Bulk Import</span> <span className="icon iconbulkImp">&nbsp;</span></a></li>
                                                <li><a href="#" onClick={this.handleDownloadFile}><span className="text">Export to Excel</span> <span className="icon iconExTOEx">&nbsp;</span></a></li>
                                            </ul>
                                        </div>
                                    </Col>
                               
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
                                        <h6>Showing {users.totalCount} of {(users.totalCount > 0) ? users.items[0].totalCount : 0} entries</h6>
                                    </div>
                                </div>
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-16">
                                    <div className="rightContentdata">
                                        <UserQuickFilter wrappedComponentRef={this.savequickfilterFormRef} handleSearch={this.handleSearch} />
                                        <div className="filterWrapp" onClick={() => this.filterModalOpen()}>
                                            <a href="#">
                                                <span id="sidebarCollapse" className="filterIcon">&nbsp;</span>
                                            </a>
                                        </div>
                                    </div>
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
                                pagination={{ size: 'small', pageSize: pagesize, total: (users !== undefined && users.items.length > 0) ? users.items[0].totalCount : 0, defaultCurrent: 1 }}
                                loading={users === undefined ? true : false}
                                dataSource={users === undefined ? [] : users.items.slice()}
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
                />


                <CreateOrUpdateUser
                    wrappedComponentRef={this.saveaddeditFormRef}
                    visible={this.state.modalVisible}
                    onCancel={this.onHandlecreateOrUpdateModalClose}
                    modalType={this.state.userId === '' ? 'create' : 'edit'}
                    entitydata={this.state.addeditentitydata}
                    id={this.state.userId}
                />



                <BulkImport
                    wrappedComponentRef={this.savebulkimportFormRef}
                    visible={this.state.bulkModalVisible}
                    onCancel={this.onHadnleBulkImportModalClose}
                />

                 
                <ResetPassword
                    wrappedComponentRef={this.saveresetPasswordFormRef}
                    visible={this.state.resetpassModalVisible}
                    onCancel={this.onHandleResetPwdModalClose}
                    id={this.state.userId}
                />

            </Card>
        );
    }
}

export default User;
