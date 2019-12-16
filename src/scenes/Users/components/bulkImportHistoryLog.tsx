
import * as React from 'react';

import { Tabs, Table, Row, Col, Icon, Form, message, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { UserBulkImportLogListResponse } from '../../../services/user/dto/Response/userBulkImportLogListResponse';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import AppConsts from '../../../lib/appconst';

const TabPane = Tabs.TabPane;

const OIGCheckURL = AppConsts.oigCheckURL;
const pagesize = AppConsts.pagesize;

export interface IBulkImportHistoryLogProps extends FormComponentProps {
    visible: boolean;
    bulkimportid: string;
    bulkimportfname: string;
    bulkimportdate: string;
    tab: number;
    logData: UserBulkImportLogListResponse[];
    onCancel: () => void;
}


export interface IUserProps {

    userStore: UserStore;
}


@inject(Stores.UserStore)
@observer
class bulkImportHistoryLog extends React.Component<IUserProps & IBulkImportHistoryLogProps> {

    state = {
        showForceSubmit: false, activeKey: '1'
    };

    onHandleTabChange = (activeKey) => {

        this.setState({ ...this.state, activeKey: activeKey });
    }

    onHandleForceSubmit = async (value: string) => {

        var res = await this.props.userStore.saveOIGUser({ BulkIMportLogId: value, requesterUserId: this.props.userStore.userid });

        console.log(res);

        message.success('User saved successfully');
    }

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ showForceSubmit: false, activeKey: '1' });

        this.props.form.resetFields();
    }

    render() {

        const { logData, bulkimportfname, bulkimportdate, visible } = this.props;

        const columns = [
            { title: 'Row No', dataIndex: 'RowNo', sorter: false, key: 'RowNo', width: 150, render: (text: number) => <div>{text}</div> },
            { title: 'First Name', dataIndex: 'FirstName', sorter: false, key: 'FirstName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Last Name', dataIndex: 'LastName', sorter: false, key: 'LastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Error', dataIndex: 'BulkImportError', sorter: false, key: 'BulkImportError', width: 150, render: (text: string) => <div>{text}</div> },
        ];

        const oigcolumns = [
            { title: 'Row No', dataIndex: 'RowNo', sorter: false, key: 'RowNo', width: 150, render: (text: number) => <div>{text}</div> },
            { title: 'First Name', dataIndex: 'FirstName', sorter: false, key: 'FirstName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Last Name', dataIndex: 'LastName', sorter: false, key: 'LastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Error', dataIndex: 'BulkImportError', sorter: false, key: 'BulkImportError', width: 150, render: (text: string) => <div>{text}</div> },
            {
                title: '',
                width: 150, dataIndex: 'BulkImportLogId', key: 'BulkImportLogId',
                render: (text: string) => {
                    const { showForceSubmit } = this.state;
                    return (
                        <div>
                            <div className="tablehoverbuttons"> <Icon type="ellipsis" className="ellipsisIcon" />
                                <div className="buttonshover">

                                    <a href={OIGCheckURL} prop-id={text} onClick={() => { this.setState({ ...this.state, showForceSubmit: true }) }} className={showForceSubmit ? "btn btn-primary hidden" : "btn btn-primary"} target="_blank">Verify OIG</a>
                                    <a href="javascript:void(0);" id={text} className={showForceSubmit ? "btn btn-primary" : "btn btn-primary hidden"} onClick={() => { this.onHandleForceSubmit(text) }} >Submit</a>
                                </div>
                            </div>
                        </div>
                    )
                },
            },
        ];

        debugger;
        const valdata = (logData !== undefined) ? logData.filter(p => p.IsOIGError === false) : [];
        const oigdata = (logData !== undefined) ? logData.filter(p => p.IsOIGError === true && p.IsUserAdded === false) : [];

        return (
            <Drawer title={'Error Log'} width={560} onClose={this.onHanleResetForm} visible={visible}>
                <div className="errorLog" >

                    <Row className="antd-row">
                        <Col className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="logHeaddata">
                                <div className="fileName">{bulkimportfname}</div>
                                <div className="datetext"><Icon type="calendar" /> {bulkimportdate}</div>
                                <div className="ant-clearfix"></div>
                            </div>
                        </Col>
                    </Row>

                    <Tabs activeKey={this.state.activeKey} size={'small'} tabBarGutter={64} onChange={this.onHandleTabChange}>

                        <TabPane tab={'Validation Errors'} key={'1'}  >
                            <div className="table-responsive">
                                <div className="tableContainer table-responsive">
                                    <Table
                                        rowKey={record => record.BulkImportLogId}
                                        size={'default'}
                                        bordered={true}
                                        columns={columns}
                                        pagination={{ size: 'small', pageSize: pagesize, total: valdata === undefined ? 0 : valdata.length, defaultCurrent: 1 }}
                                        loading={oigdata === undefined ? true : false}
                                        dataSource={valdata === undefined ? [] : valdata.slice()}
                                        className="table"
                                    />
                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab={'OIG-GSA Exclusion'} key={'2'}>
                            <div className="table-responsive">
                                <div className="tableContainer table-responsive">
                                    <Table
                                        rowKey={record => record.BulkImportLogId}
                                        size={'default'}
                                        bordered={true}
                                        columns={oigcolumns}
                                        pagination={{ size: 'small', pageSize: pagesize, total: oigdata === undefined ? 0 : oigdata.length, defaultCurrent: 1 }}
                                        loading={oigdata === undefined ? true : false}
                                        dataSource={oigdata === undefined ? [] : oigdata.slice()}
                                        className="table"
                                    />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>

                </div>
            </Drawer>
        )
    }
}

export default Form.create<IBulkImportHistoryLogProps>()(bulkImportHistoryLog);
