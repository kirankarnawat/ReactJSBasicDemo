import * as React from 'react';

import { Form, Drawer, Upload, Row, Col, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import ErrorLog from './errorLog';
const { Dragger } = Upload;

export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
}

const uploadprops = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
};

class BulkImport extends React.Component<ICreateOrUpdateUserProps> {
    state = {
        confirmDirty: false,
    };
    render() {
        const { visible, onCancel } = this.props;
        return (
            <Drawer title={'Bulk Import'} width={560} onClose={onCancel} visible={visible}>
                <div className="bulkUpload">
                    <div className="pos">
                        <div className="mb20">
                        <Row className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <Dragger {...uploadprops}>
                            <p className="hintText"><Icon type="paper-clip" /> <span className="coloraddfile">Add file </span> or drop file here</p>
                        </Dragger>
                        </Col>
                        </Row>
                        </div>
                        <Row  className="antd-row">
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <div className="instructionbox">
                                You can download the template from here, and save it locally until you are ready to load your learners. When your spreadsheet is ready with user data, you should “Drag and Drop” the spreadsheet in the space provided above. <br/> <br/>The summary and status of the uploaded spreasheet will be provided to you in the space below.
                                </div>
                            </Col>
                        </Row>
                        <Row className="antd-row">
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <div className="downloadTemp">
                                    <button type="submit" className="ant-btn ant-btn-primary">DOWNLOAD TEMPLATE</button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="antd-row">
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <div className="subHeading">
                                    <h3>Log</h3>
                                </div>
                                <div className="dateName"><Icon type="calendar" /> 11/15/2019</div>
                                <div className="filedataname">Bulk_Import_11_15_2019.xls</div>
                                <div className="errortextComp">Completed with error</div>
                                <div className="recordtotalText">Total: 916 Records</div>
                                <div className="recordtotalText">Successfully Uplaoded: 900 Records</div>
                                <div className="linkurl"><a href="#"><span className=""></span> Validation Errors: 10</a></div>
                                <div className="linkurl"><a href="#"><span className=""></span> OIG Exclusion Found: 6</a></div>
                            </Col>
                        </Row>
                    
                    
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
                    </div>
                </div>
                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <div> <ErrorLog/></div>
                    </Col>
                    </Row>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(BulkImport);
