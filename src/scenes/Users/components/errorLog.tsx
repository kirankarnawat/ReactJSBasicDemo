import * as React from 'react';
import { Tabs,Table,Row,Col,Icon } from 'antd';
const TabPane = Tabs.TabPane;
import { FormComponentProps } from 'antd/lib/form';
export interface ErrorLogsProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
}
class ErrorLog extends React.Component
{
    render() {
        const columns = [
            { title: 'Row No', dataIndex: 'RowNo', sorter: false, key: 'RowNo', width: 150, render: (text: string) => <div>{10}</div> },
            { title: 'First Name', dataIndex: 'FirstName', sorter: false, key: 'FirstName', width: 150, render: (text: string) => <div>{'Jen'}</div> },
            { title: 'Last Name', dataIndex: 'LastName', sorter: false, key: 'LastName', width: 150, render: (text: string) => <div>{'Youfelct'}</div> },
            { title: 'Error', dataIndex: 'Error', sorter: false, key: 'Error', width: 150, render: (text: string) => <div>{'Hiring Date Missing'}</div> },
        ];
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
                    <div className="table-responsive">
                    <div className="tableContainer table-responsive">
                            <Table
                                rowKey={record => record.userId}
                                size={'default'}
                                bordered={true}
                                columns={columns}
                                className="table"
                            />
                        </div>
                    </div>
                </TabPane>
                <TabPane tab={'OIG-GSA Exclusion'} key={'OIG-GSAExclusion'}>
                <div className="table-responsive">
                    <div className="tableContainer table-responsive">
                            <Table
                                rowKey={record => record.userId}
                                size={'default'}
                                bordered={true}
                                columns={columns}
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

export default ErrorLog;