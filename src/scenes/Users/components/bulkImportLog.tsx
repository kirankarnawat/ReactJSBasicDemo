
import * as React from 'react';

import { Tabs, Table, Row, Col, Icon, Form, message, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { UserBulkImportLogListResponse } from '../../../services/user/dto/Response/userBulkImportLogListResponse';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import AppConsts from '../../../lib/appconst';

const TabPane = Tabs.TabPane;

const OIGCheckURL = AppConsts.oigCheckURL;
const pagesize = AppConsts.pagesize;

export interface IBulkImportLogProps extends FormComponentProps {

    bulkimportid: string;
    bulkimportfname: string;
    bulkimportdate: string;
    tab: number;
    logData: UserBulkImportLogListResponse[];
    onHandleFileLogClose: () => void;
}

export interface IBulkImportLogState {

    activeKey: string;
    showForceSubmit: boolean;
}

export interface IUserProps {

    userStore: UserStore;
}


@inject(Stores.UserStore)
@observer
class BulkImportLog extends React.Component<IUserProps & IBulkImportLogProps, IBulkImportLogState> {

    constructor(props) {

        super(props);

        this.state = {
            activeKey: this.props.tab == 1 ? "ValidationErrors" : "OIG-GSAExclusion",
            showForceSubmit: false,
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.bulkimportid !== prevProps.bulkimportid || this.props.tab !== prevProps.tab) {

            this.props.form.resetFields();

            this.setState({ ...this.state, activeKey: this.props.tab === 1 ? "ValidationErrors" : "OIG-GSAExclusion" });
        }
    }

    onHandleForceSubmit = async (value: string) => {

        var res = await this.props.userStore.saveOIGUser({ BulkIMportLogId: value, requesterUserId: this.props.userStore.userid });

        console.log(res);

        message.success('User saved successfully');
    }

    render() {

        const { logData, bulkimportfname, bulkimportdate, onHandleFileLogClose } = this.props;

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
            <div className="errorLog" >

                <Button className="ant-btn ant-btn-default" onClick={onHandleFileLogClose} >Back</Button>

                <Row className="antd-row">
                    <Col className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                        <div className="logHeaddata">
                            <div className="fileName">{bulkimportfname}</div>
                            <div className="datetext"><Icon type="calendar" /> {bulkimportdate}</div>
                            <div className="ant-clearfix"></div>
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey={this.state.activeKey} size={'small'} tabBarGutter={64}>

                    <TabPane tab={'Validation Errors'} key={'ValidationErrors'}  >
                        <div className="table-responsive">
                            <div className="tableContainer table-responsive">
                                <Table
                                    rowKey={record => record.BulkImportLogId}
                                    size={'default'}
                                    bordered={true}
                                    columns={columns}
                                    pagination={{ size: 'small', pageSize: pagesize, total: valdata === undefined ? 0 : logData.length, defaultCurrent: 1 }}
                                    loading={oigdata === undefined ? true : false}
                                    dataSource={valdata === undefined ? [] : valdata.slice()}
                                    className="table"
                                />
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab={'OIG-GSA Exclusion'} key={'OIG-GSAExclusion'}>
                        <div className="table-responsive">
                            <div className="tableContainer table-responsive">
                                <Table
                                    rowKey={record => record.BulkImportLogId}
                                    size={'default'}
                                    bordered={true}
                                    columns={oigcolumns}
                                    pagination={{ size: 'small', pageSize: pagesize, total: oigdata === undefined ? 0 : logData.length, defaultCurrent: 1 }}
                                    loading={oigdata === undefined ? true : false}
                                    dataSource={oigdata === undefined ? [] : oigdata.slice()}
                                    className="table"
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Form.create<IBulkImportLogProps>()(BulkImportLog);
