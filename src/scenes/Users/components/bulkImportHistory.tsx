
// #region
import * as React from 'react';

import { Card, Col, Row, Table, Icon } from 'antd';
import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import AppConsts from '../../../lib/appconst';

import BulkImportHistorySearch from './bulkImportHistorySearch';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { UserBulkImportLogListResponse } from '../../../services/user/dto/Response/userBulkImportLogListResponse';
import { UserBulkImportListResponse } from '../../../services/user/dto/Response/userBulkImportListResponse';

import BulkImportHistoryLog from './bulkImportHistoryLog'

// #endregion

// #region Local State and Property
export interface IUserProps {
    userStore: UserStore;
}

export interface IBulkImportHistoryState {

    modalVisible: boolean;
    importData: PagedResultDto<UserBulkImportListResponse>;
    importid: string;
    importfilename: string;
    importdate: string;
    logData: UserBulkImportLogListResponse[];
}


const pagesize = AppConsts.pagesize;

// #endregion

@inject(Stores.UserStore)
@observer
class BulkImportHistory extends React.Component<IUserProps, IBulkImportHistoryState> {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            importData: { items: [], totalCount: 0 },
            importid: '',
            importfilename: '',
            importdate: '',
            logData: [],
        };
    }


    // #region GLOBALS
    logFormRef: any;

    savelogFormRef = (formRef: any) => {
        this.logFormRef = formRef;
    };

    // #endregion


    // #region LOG HISTORY MANAGEMENT

    async componentDidMount() {
        debugger;
        await this.props.userStore.initBulkFilter();
        await this.props.userStore.getUserBulkImportStatus({ LookupType:'BULK_IMPORT_STATUS' });
        await this.getAll();
    }

    //get history data
    async getAll() {
        debugger;
        let res = await this.props.userStore.getAllBulkImportHistory({ ...this.props.userStore.bulkfilters });

        this.setState({ ...this.state, importData: res });
    }

    //table management
    handleTableChange = async (pagination: any, filters: any, sorter: any) => {

        if (sorter.order) {
            this.props.userStore.setBulkFilter({
                ...this.props.userStore.bulkfilters, sortExp: sorter.field + " " + (sorter.order == "ascend" ? "asc" : "desc")
            });
        }

        this.props.userStore.setBulkFilter({ ...this.props.userStore.bulkfilters, pageIndex: pagination.current });

        await this.getAll();
    };

    // search
    handleSearch = async () => {
        debugger;
        await this.getAll();
    }

    handleDownloadFile = async (bulkImportId: string, fileName: string) => {

        var datatype = (fileName.includes('xlsx')) ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "application/vnd.ms-excel";

        let data = await this.props.userStore.downloadBulkImportFile(bulkImportId);

        const blob = new Blob([data], { type: datatype });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);

        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    }
    // #endregion


    // #region MODAL POP

    // show modal
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    // #endregion

    // #region HANDLE LOG VIEWS

    //LOG DRAWER OPEN
    bulklogModalOpen = async(id: string, ifilename: string, idate : string) => {
        debugger;
        let res = await this.props.userStore.getUserBulkImportLog({ id: id });

        let data = (res !== undefined) ? res.items : [];

        this.setState({ ...this.state, importid: id, logData: data, importfilename: ifilename, importdate: idate });
        this.Modal();
    }


    //LOG DRAWER CLOSE
    onHandleBulkLogModalClose = async () => {

        this.setState({ modalVisible: false, importid: "", logData: [] });

        const form = this.logFormRef.props.form;
        form.resetFields();

        await this.getAll();
    };

    // #endregion

    render() {

        const { importData } = this.state;

        const columns = [
            {
                title: 'File Name', dataIndex: 'bulkImportFileName', sorter: true, key: 'bulkImportFileName', width: 150,
                render: (text, row) => <a href="#" onClick={() => this.handleDownloadFile(row.bulkImportId, row.bulkImportFileName)} >{text}</a>
            },
            { title: 'Import Status', dataIndex: 'importStatus', sorter: true, key: 'importStatus', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Upload Date', dataIndex: 'uploadDateDisplay', sorter: true, key: 'uploadDateDisplay', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Uploaded By', dataIndex: 'creatorName', sorter: true, key: 'creatorName', width: 150, render: (text: string) => <div>{text}</div> },
            {
                title: 'Summary', dataIndex: 'totalRecords', sorter: false, key: 'totalRecords', width: 150,
                render: (text, row) => {

                    var total = row.totalRecords == null ? 0 : row.totalRecords;
                    var inserted = row.insertedRecords == null ? 0 : row.insertedRecords;
                    var error = row.errorRecords == null ? 0 : row.errorRecords;
                    var oig = row.oigRecords == null ? 0 : row.oigRecords;

                    return (<div>{'Total: ' + total + "\n Uploaded: " + inserted + "\n Error: " + error + "\n OIG-GSA Exclusion: " + oig}</div>);
                }
            },
            { title: 'Validation Error', dataIndex: 'bulkImportErrorDescription', sorter: false, key: 'bulkImportErrorDescription', width: 150, render: (text: string) => <div>{text}</div> },
            {
                title: 'View',
                width: 150, dataIndex: 'bulkImportId', key: 'bulkImportId',
                render: (text, row) => (
                    <div>
                        <div className="tablehoverbuttons"> <Icon type="ellipsis" className="ellipsisIcon" />
                            <div className="buttonshover">
                                <div className="editbtn" onClick={() => this.bulklogModalOpen(row.bulkImportId, row.bulkImportFileName, row.uploadDateDisplay)} title="View Log"></div>
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
                                            <h2>Bulk Import History</h2>
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
                                        <h6><strong>Showing {importData.totalCount} of {(importData.totalCount > 0) ? importData.items[0].totalCount : 0} entries</strong></h6>
                                    </div>
                                </div>

                                <BulkImportHistorySearch handleSearch={this.handleSearch} />

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
                                rowKey={record => record.bulkImportId}
                                size={'default'}
                                bordered={true}
                                columns={columns}
                                pagination={{ size: 'small', pageSize: pagesize, total: (importData !== undefined && importData.items.length> 0) ? importData.items[0].totalCount : 0, defaultCurrent: 1 }}
                                loading={importData === undefined ? true : false}
                                dataSource={importData === undefined ? [] : importData.items.slice()}
                                onChange={this.handleTableChange}
                                className="table"
                            />
                        </div>
                    </Col>
                </Row>

                <BulkImportHistoryLog
                    wrappedComponentRef={this.savelogFormRef}        
                    visible={this.state.modalVisible}
                    bulkimportid={this.state.importid}
                    bulkimportfname={this.state.importfilename}
                    bulkimportdate={this.state.importdate}
                    tab={1}
                    logData={this.state.logData}
                    onCancel={this.onHandleBulkLogModalClose}
                />

            </Card>
        )
    }
}

export default BulkImportHistory;
