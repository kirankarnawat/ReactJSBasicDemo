import * as React from 'react';

import { Breadcrumb, Card, Col, Checkbox, Modal, Row, Table, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import BulkImport from './components/bulkImport';
import UserFilter from './components/userFilter';
import { EntityDto } from '../../services/dto/entityDto';

import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';


export interface IUserProps {
    userStore: UserStore;
}

export interface IUserState {
    modalVisible: boolean;
    filtermodalVisible: boolean;
    bulkmodalVisible: boolean;
    skipCount: number;
    maxResultCount: number;

    userId: number;
    firstname: string;
    groupid: string;
    searchongroupId: string;

    pageindex: number;
    pagesize: number;
    sortexp: string;
}

const confirm = Modal.confirm;
// const Search = Input.Search;

@inject(Stores.UserStore)

@observer
class User extends React.Component<IUserProps, IUserState> {
    formRef: any;

    state = {
        modalVisible: false,
        filtermodalVisible: false,
        bulkmodalVisible: false,
        skipCount: 0,
        maxResultCount: 0,
        userId: 0,
        firstname: '',
        groupid: '',
        searchongroupId: '',
        pageindex: 1,
        pagesize: 10,
        sortexp: ''
    };

    async componentDidMount() {
        await this.props.userStore.initFilter();
        await this.getAll();
    }

    //get data from stores
    async getAll() {
        await this.props.userStore.getAll({ ...this.props.userStore.filters });
    }

    //common method to set the filter values as per the state
    SetUserFilter = () => {
        this.props.userStore.setFilter({
            emailAddress: '', departmentId: '', jobCodeId: '', lastName: '',
            firstName: this.state.firstname, groupId: this.state.groupid, requesterUserId: this.props.userStore.filters.requesterUserId,
            pageIndex: this.state.pageindex, pageSize: this.state.pagesize, searchOnGroupId: this.state.searchongroupId,
            sortExp: this.state.sortexp, status: true
        });
    }

    //Pagination with sorting
    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };


    //Drawer visibility
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    FilterModal = () => {
        this.setState({
            filtermodalVisible: !this.state.filtermodalVisible,
        });
    };

    bulkmodal = () => {
        this.setState({
            bulkmodalVisible: !this.state.bulkmodalVisible,
        });
    };
    //-----------------------------

    async createOrUpdateModalOpen(entityDto: EntityDto) {
        if (entityDto.id === 0) {
            await this.props.userStore.createUser();
            await this.props.userStore.getRoles();
        } else {
            await this.props.userStore.get(entityDto);
            await this.props.userStore.getRoles();
        }

        this.setState({ userId: entityDto.id });
        this.Modal();

        this.formRef.props.form.setFieldsValue({ ...this.props.userStore.editUser, roleNames: this.props.userStore.editUser.roleNames });
    }

    async filterModalOpen(entityDto: EntityDto) {
        this.setState({ userId: entityDto.id });
        this.FilterModal();

        // this.formRef.props.form.setFieldsValue({ ...this.props.userStore.editUser, roleNames: this.props.userStore.editUser.roleNames });
    }

    async bulkImportmedelOpen(entityDto: EntityDto) {
        this.setState({ userId: entityDto.id });
        this.bulkmodal();

        // this.formRef.props.form.setFieldsValue({ ...this.props.userStore.editUser, roleNames: this.props.userStore.editUser.roleNames });
    }

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

    handleCreate = () => {
        const form = this.formRef.props.form;

        form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            } else {
                if (this.state.userId === 0) {
                    await this.props.userStore.create(values);
                } else {
                    await this.props.userStore.update({ id: this.state.userId, ...values });
                }
            }

            await this.getAll();
            this.setState({ modalVisible: false });
            form.resetFields();
        });
    };

    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };

    handleSearch = (value: any) => {
        

        //this.setState({ this.props.userStore.filters: value }, async () => await this.getAll());
    };

    public render() {

        const { users } = this.props.userStore;

        const columns = [
            { title: 'checkBox', dataIndex: 'checkBox', key: 'checkBox', width: 150, render: (text: string) => <div>{<Checkbox></Checkbox>}</div> },
            { title: 'FirstName', dataIndex: 'firstName', key: 'firstName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'LastName', dataIndex: 'lastName', key: 'lastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'EmailAddress', dataIndex: 'emailAddress', key: 'emailAddress', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Department', dataIndex: 'departmentCode', key: 'departmentCode', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'JobCode', dataIndex: 'jobCode', key: 'jobCode', width: 150, render: (text: string) => <div>{text}</div> },


            {
                title: 'Options',
                width: 150,
                render: (text: string, item: any) => (
                    <div>
                        <div className="tablehoverbuttons"> <Icon type="ellipsis" />
                            <div className="buttonshover">
                                <div className="editbtn" onClick={() => this.createOrUpdateModalOpen({ id: item.userId })}><Icon type="bar-chart" /> </div>
                                <div className="deletebtn" onClick={() => this.delete({ id: item.userId })}><Icon type="edit" /></div>
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
                                        xs={{ span: 12 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 12 }}
                                        lg={{ span: 12 }}
                                        xl={{ span: 12 }}
                                        xxl={{ span: 12 }}>
                                        {/* <h2>{'Users'}</h2> */}
                                        <div className="co-Breadcrumb">
                                            <Breadcrumb className="breadcrumb">
                                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <a href="" className="active">Users Type</a>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </Col>
                                    <Col className="push"
                                        xs={{ span: 12 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 12 }}
                                        lg={{ span: 12 }}
                                        xl={{ span: 12 }}
                                        xxl={{ span: 12 }}
                                    >
                                        <div className="floatright">
                                            <ul className="headerListing">
                                                <li><a href="#" onClick={() => this.createOrUpdateModalOpen({ id: 0 })}><span className="text">Add User</span> <span className="icon iconUser">&nbsp;</span></a></li>
                                                <li className="active" onClick={() => this.bulkImportmedelOpen({ id: 2 })}><a href="#"><span className="text">Bulk Import</span> <span className="icon iconbulkImp">&nbsp;</span></a></li>
                                                <li><a href="#"><span className="text">Export to Excel</span> <span className="icon iconExTOEx">&nbsp;</span></a></li>
                                            </ul>
                                            {/* <Button type="primary" className=""  />
                        <Button type="primary" className=""  />
                        <Button type="primary" className=""  onClick={() => this.createOrUpdateModalOpen({ id: 0 })} /> */}
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col sm={{ span: 10, offset: 0 }}>
                        <Search placeholder={'Filter'} onSearch={this.handleSearch} />
                    </Col>
                </Row> */}
                <div className="conHeader">
                    <div className="antd-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="tblFilter">
                                <div className="floatleft">
                                    <h6><strong>Showing 10 of 500 entries</strong></h6>
                                </div>
                                <div className="filterWrapp floatright" onClick={() => this.filterModalOpen({ id: 1 })}>
                                    <span className="filterText">Filter</span>
                                    <a href="#">
                                        <span id="sidebarCollapse" className="filterIcon">&nbsp;</span>
                                    </a>
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
                                rowKey={record => record.userId.toString()}
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
                <CreateOrUpdateUser
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.modalVisible}
                    onCancel={() =>
                        this.setState({
                            modalVisible: false,
                        })
                    }
                    modalType={this.state.userId === 0 ? 'edit' : 'create'}
                    onCreate={this.handleCreate}
                    roles={this.props.userStore.roles}
                />
                <UserFilter
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.filtermodalVisible}
                    onCancel={() =>
                        this.setState({
                            filtermodalVisible: false,
                        })
                    }
                    modalType={this.state.userId === 0 ? 'edit' : 'create'}
                    onCreate={this.handleCreate}
                    roles={this.props.userStore.roles}
                />
                <BulkImport
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.bulkmodalVisible}
                    onCancel={() =>
                        this.setState({
                            bulkmodalVisible: false,
                        })
                    }
                    modalType={this.state.userId === 0 ? 'edit' : 'create'}
                    onCreate={this.handleCreate}
                    roles={this.props.userStore.roles}
                />

            </Card>
        );
    }
}

export default User;
