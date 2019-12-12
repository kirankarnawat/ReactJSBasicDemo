
import * as React from 'react';

import { Tabs, Table, Row, Col, Icon, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { UserBulkImportLogListResponse } from '../../../services/user/dto/Response/userBulkImportLogListResponse';

const TabPane = Tabs.TabPane;


export interface IBulkImportLogProps extends FormComponentProps {

    bulkimportid: string;
    bulkimportfname: string;
    bulkimportdate: string;
    tab: number;
    logData: UserBulkImportLogListResponse[];
}

export interface IBulkImportLogState {

    activeKey: string;
}


class BulkImportLog extends React.Component<IBulkImportLogProps, IBulkImportLogState> {

    constructor(props) {

        super(props);

        this.state = {
            activeKey: this.props.tab === 1 ? "ValidationErrors" : "OIG-GSAExclusion"
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.bulkimportid !== prevProps.bulkimportid || this.props.tab !== prevProps.tab) {

            this.props.form.resetFields();

            this.setState({ ...this.state, activeKey: this.props.tab === 1 ? "ValidationErrors" : "OIG-GSAExclusion" });
        }
    }

    render() {

        const { logData, bulkimportfname, bulkimportdate } = this.props;

        const columns = [
            { title: 'Row No', dataIndex: 'RowNo', sorter: false, key: 'RowNo', width: 150, render: (text: string) => <div>{10}</div> },
            { title: 'First Name', dataIndex: 'FirstName', sorter: false, key: 'FirstName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Last Name', dataIndex: 'LastName', sorter: false, key: 'LastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Error', dataIndex: 'Error', sorter: false, key: 'Error', width: 150, render: (text: string) => <div>{text}</div> },
        ];

        debugger;
        const valdata = logData.filter(p => p.IsOIGError === false).slice();
        const oigdata = logData.filter(p => p.IsOIGError === true && p.IsUserAdded === false);

        return (
            <div className="errorLog">
                <button className="ant-btn ant-btn-default">Back</button>

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
                                    pagination={{ size: 'small', pageSize: 10, total: valdata === undefined ? 0 : logData.length, defaultCurrent: 1 }}
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
                                    columns={columns}
                                    pagination={{ size: 'small', pageSize: 10, total: oigdata === undefined ? 0 : logData.length, defaultCurrent: 1 }}
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
