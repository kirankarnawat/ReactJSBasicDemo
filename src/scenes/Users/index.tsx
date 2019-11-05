import * as React from 'react';

import {Breadcrumb, Card, Col, Checkbox,   Modal, Row, Table,Icon  } from 'antd';
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
    maxResultCount: number;
    skipCount: number;
    userId: number;
    filter: string;
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
        maxResultCount: 10,
        skipCount: 0,
        userId: 0,
        filter: '',
    };

    async componentDidMount() {
        await this.getAll();
    }

    async getAll() {
        await this.props.userStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }

    handleTableChange = (pagination: any) => {
        this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };

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

    handleSearch = (value: string) => {
        this.setState({ filter: value }, async () => await this.getAll());
    };

    public render() {

        const { users } = this.props.userStore;       

        const columns = [
            { title: 'checkBox', dataIndex: 'checkBox', key: 'checkBox', width: 150, render: (text: string) => <div>{<Checkbox></Checkbox>}</div> },
            { title: 'FirstName', dataIndex: 'firstName', key: 'firstName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'LastName', dataIndex: 'lastName', key: 'lastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'EmailAddress', dataIndex: 'emailAddress', key: 'emailAddress', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Department', dataIndex: 'department', key: 'department', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'NCPDP_ID', dataIndex: 'NCPDP_ID', key: 'NCPDP_ID', width: 150, render: (text: string) => <div>{text}</div> },
            // { title: 'Option', dataIndex: 'Option', key: 'Option', width: 150, render: (text: string) => <div>{text}</div> },
    
           
            {
                title: 'Actions',
                width: 150,
                render: (text: string, item: any) => (
                    <div>
                   <div className="tablehoverbuttons"> <Icon type="ellipsis" />
                    <div className="buttonshover">
                     <div className="editbtn" onClick={() => this.createOrUpdateModalOpen({ id: item.id })}><Icon type="edit" /></div>
                     <div className="deletebtn" onClick={() => this.delete({ id: item.id })}><Icon type="delete" /></div>
                     </div>
                     </div>
                        {/* <Dropdown
                            trigger={['click']}
                            overlay={
                                <Menu>
                                    <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}> <Icon type="edit" /> <span>{ 'Edit'}</span></Menu.Item>
                                    <Menu.Item onClick={() => this.delete({ id: item.id })}><Icon type="delete" /><span>{' Delete'}</span></Menu.Item>
                                </Menu>
                            }
                            placement="bottomLeft"
                        >

                            <Icon type="ellipsis"/>

                            
                        </Dropdown> */}
                    </div>
                ),
            },
        ];

        return (
            <Card>
                <Row>
                <Col className="contentHeader">
                <div className="conHeader">
                    <div className="ant-row">
                    <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                    <Col className="floatleft"
                       xs={{ span:12}}
                        sm={{ span:12}}
                        md={{ span:12}}
                        lg={{ span:12}}
                        xl={{ span:12}}
                        xxl={{ span:12}}>
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
                xs={{ span:12}}
                sm={{ span:12}}
                md={{ span:12}}
                lg={{ span:12}}
                xl={{ span:12}}
                xxl={{ span:12}}
                     >
                     <div className="floatright">
                      <ul className="headerListing">
                        <li><a href="#"  onClick={() => this.createOrUpdateModalOpen({ id: 0 })}><span className="text">Add User</span> <span className="icon iconUser">&nbsp;</span></a></li>
                        <li className="active" onClick={() => this.bulkImportmedelOpen({id:2})}><a href="#"><span className="text">Bulk Import</span> <span className="icon iconbulkImp">&nbsp;</span></a></li>
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
                      <div className="ant-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                        <div className="tblFilter">
                                <div className="floatleft">
                                    <h6><strong>Showing 10 of 500 entries</strong></h6>
                                </div>
                                <div className="filterWrapp floatright" onClick={()=> this.filterModalOpen({ id: 1 })}>
                                <span className="filterText">Filter</span>
                                        <a href="#">
                                            <span id="sidebarCollapse" className="filterIcon">&nbsp;</span>
                                        </a>
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                <Row style={{ marginTop: 20 }}>
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 24, offset: 0 }}
                        lg={{ span: 24, offset: 0 }}
                        xl={{ span: 24, offset: 0 }}
                        xxl={{ span: 24, offset: 0 }}
                    >
                        <div className="table-responsive">
                            <Table
                                rowKey={record => record.id.toString()}
                                size={'default'}
                                bordered={true}
                                columns={columns}
                                pagination={{ size:'small', pageSize: 10, total: users === undefined ? 0 : users.totalCount, defaultCurrent: 1 }}
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
