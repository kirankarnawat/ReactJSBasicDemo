
import * as React from 'react';
import { Form, Upload, Row, Col, Icon, message } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import 'font-awesome/css/font-awesome.min.css'


import DownloadTemplate from './downloadTemplate';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import AppConsts from '../../../lib/appconst';

import moment from 'moment';

const { Dragger } = Upload;

const dateFormat = AppConsts.dateFormat;

export interface IBulkImportFileProps extends FormComponentProps {

    onHandleFileLog: (bulkimportid: string, filename: string, importdate: string, tab: number) => void;
}

export interface IUserProps {

    userStore: UserStore;
}

export interface IBulkImportFileState {
    showlog: boolean,
    importDate: string,
    importFileName: string,
    importStatus: string,
    totalRecords: number,
    insertedRecords: number,
    importId: string,
    errorRecords: number,
    oigRecords: number
}

const uploadprops = {

    name: 'file',
    multiple: false,
    accept: '.xlsx',
    onChange(info) {
        const { status } = info.file;

        //if (status !== 'uploading') {
        //console.log(info.file, info.fileList);
        //}
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

@inject(Stores.UserStore)
@observer
class BulkImportFile extends React.Component<IUserProps & IBulkImportFileProps, IBulkImportFileState> {

    constructor(props) {
        super(props);

        this.state = {
            showlog: false,
            importDate: "",
            importFileName: "",
            importStatus: '',
            totalRecords: 0,
            insertedRecords: 0,
            importId: "",
            errorRecords: 0,
            oigRecords: 0
        };
    }

    //async componentDidUpdate(prevProps, prevState) {

    //    if (this.state.importId !== prevState.importId) {
    //        this.setState({
    //            showlog: false, importDate: "", importFileName: "", importStatus: '', totalRecords: 0, insertedRecords: 0, importId: "", errorRecords: 0, oigRecords: 0
    //        });
    //    }
    //}


    customUpload = async (options: any) => {

        try {
            debugger;
            await this.props.userStore.uploadBulkImport({ uploadedFile: options.file, requesterUserId: this.props.userStore.filters.requesterUserId })
                .then(res => {

                    this.setState({
                        ...this.state, showlog: true,
                        importDate: (res["importDate"] !== null ? moment(res["importDate"]).format(dateFormat).toString() : ""),
                        importFileName: res["bulkImportFileName"], importStatus: res["importStatus"],
                        totalRecords: res["totalRecords"] !== null ? res["totalRecords"] : 0,
                        insertedRecords: res["insertedRecords"] !== null ? res["insertedRecords"] : 0,
                        importId: res["bulkImportId"],
                        errorRecords: res["errorRecords"] !== null ? res["errorRecords"] : 0,
                        oigRecords: res["oigRecords"] !== null ? res["oigRecords"] : 0,
                    });
                    options.onSuccess(res.ImportStatus, options.file);

                });
        }
        catch (e) {
            options.onError(e);
        }
    };

    onBeforeUpload(info) {
        debugger;
        const isXls = info.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || info.type === "application/vnd.ms-excel";
        if (!isXls) {
            message.error('You can only upload excel file!');
        }

        //const isLt2M = info.size / 1024 / 1024 < 2;
        //if (!isLt2M) {
        //    message.error('File must smaller than 2MB!');
        //}
        //return isXls && isLt2M;

        return isXls
    }

    render() {

        const { onHandleFileLog } = this.props;

        return (

            <div className="bulkUpload">
                <div className="">

                    <div className="mb10">
                        <Row className="antd-row">
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <Dragger {...uploadprops} customRequest={this.customUpload} beforeUpload={this.onBeforeUpload} >
                                    <p className="hintText"><Icon type="paper-clip" /> <span className="coloraddfile">Add file </span> or drop file here</p>
                                </Dragger>
                            </Col>
                        </Row>
                    </div>

                    <Row className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <div className="instructionbox">
                                You can download the template from here, and save it locally until you are ready to load your learners. When your spreadsheet is ready with user data, you should “Drag and Drop” the spreadsheet in the space provided above. <br /> <br />The summary and status of the uploaded spreasheet will be provided to you in the space below.
                                </div>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <div className="downloadTemp">
                                <DownloadTemplate />
                            </div>
                        </Col>
                    </Row>

                    <Row className={(this.state.showlog) ? "antd-row" : "antd-row hidden"}>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <div className="subHeading">
                                <h3>Log</h3>
                            </div>
                            <div className="dateName"><span className="fa fa-calendar" />{this.state.importDate}</div>
                            <div className="filedataname">{this.state.importFileName}</div>
                            <div className="errortextComp">{this.state.importStatus}</div>
                            <div className="recordtotalText">Total: {this.state.totalRecords} Records</div>
                            <div className="recordtotalText"><span className="successIcon"></span>Successfully Uplaoded: {this.state.insertedRecords} Records</div>

                            <div className="linkurl">
                                <a href="#" onClick={() => { onHandleFileLog(this.state.importId, this.state.importFileName, this.state.importDate, 1) }}><span className="validationIcon"></span> Validation Errors: {this.state.errorRecords}</a>
                            </div>

                            <div className="linkurl">
                                <a href="#" onClick={() => { onHandleFileLog(this.state.importId, this.state.importFileName, this.state.importDate, 2) }}><span className="oigGsaIcon"></span> OIG-GSA Exclusion Found: {this.state.oigRecords}</a>
                            </div>

                        </Col>
                    </Row>

                    { /* 
                    <Row className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <div className="buttonfooter">
                                <div className="bulkImpFooter">
                                    <ul className="bulkImpListing">
                                        <li>
                                            <button type="submit" className="ant-btn ant-btn-default">Submit</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    */}

                </div>
            </div>
        );
    }
}

export default Form.create<IBulkImportFileProps>()(BulkImportFile);
