import * as React from 'react';
import { Tabs,Row,Col,Icon,Button } from 'antd';
const TabPane = Tabs.TabPane;
import { FormComponentProps } from 'antd/lib/form';
import BulkImportvalidation from './bulkImportValidation'
import BulkImportOIGVarify from './bulkImportValidation'
export interface ErrorLogsProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
}
class ErrorLog extends React.Component
{
    render() {
        return (
            <div className="errorLog">
             <Row className="antd-row">
               <Col className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                   <div className="logHeaddata">
               <div className="fileName">Bulk_Import_11_15_2019.xls</div>
               <div className="datetext"><Icon type="calendar" /> 11/15/2019, 12:45pm</div>
               <div className="ant-clearfix"></div>
               </div>
               </Col>
             </Row>
            <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                <TabPane tab={'Validation Errors'} key={'ValidationErrors'}>
                    <div><BulkImportvalidation /></div>
                </TabPane>
                <TabPane tab={'OIG-GSA Exclusion'} key={'OIG-GSAExclusion'}>
                    <div className="exportExcelIcoBg"><span className="exportExcelIco"></span></div>
                <div>
                <div>
                <Row className="antd-row mb10">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="warningMsg">
                            <div className="warningText">
                                <div className="heading">
                                    <h3>OIG-GSA Exclusion is found</h3>
                                </div>
                                <div className="discText">Click on the Verify OIG button to identify the user profile. <br/>You may choose to create the user post verification.</div>
                            </div>
                            <div className="warningbtn mt10">
                                <Button className="ant-btn ant-btn-primary">VERIFY OIG_GSA</Button>
                            </div>
                            <div className="ant-clearfix"></div>
                        </div>
                    </Col>
                </Row>
                </div>
                    <BulkImportOIGVarify />
                </div>
                <Row className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <div className="buttonfooter">
                                <div className="bulkImpFooter">
                                    <ul className="bulkImpListing">
                                        <li>
                                            <button type="submit" className="ant-btn ant-btn-default">CREATE USERS </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}

export default ErrorLog;