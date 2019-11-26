import * as  React from 'react';
import { Table} from 'antd';

class BulkImportvalidation extends React.Component {

    render() {
        const dataSource = [
            {
                key: 'RowNo',
                FirstName: 'Ashok',
                LastName: 'Shinde',
                Error: 'Hiring Date Missing',
            },
            {
                key: 'FirstName',
                FirstName: 'Ashok',
                LastName: 'Shinde',
                Error: 'Hiring Date Missing',
            },
            {
                key: 'LastName',
                FirstName: 'Ashok',
                LastName: 'Shinde',
                Error: 'Hiring Date Missing',
            },
            {
                key: 'Error',
                FirstName: 'Ashok',
                LastName: 'Shinde',
                Error: 'Hiring Date Missing',
            },
        ];
        const columns = [
            { title: 'Row No', dataIndex: 'RowNo', sorter: false, key: 'RowNo', width: 150, render: (text: string) => <div>{10}</div> },
            { title: 'First Name', dataIndex: 'FirstName', sorter: false, key: 'FirstName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Last Name', dataIndex: 'LastName', sorter: false, key: 'LastName', width: 150, render: (text: string) => <div>{text}</div> },
            { title: 'Error', dataIndex: 'Error', sorter: false, key: 'Error', width: 150, render: (text: string) => <div>{text}</div> },
        ];
        
        return (
            <div className="table-responsive">
                <div className="tableContainer">
                    <Table
                        //rowKey={record => record.userId}
                        size={'default'}
                        dataSource={dataSource}
                        pagination={false}
                        bordered={true}
                        columns={columns}
                        className="table"
                    />
                </div>
            </div>
        )
    }
}

export default BulkImportvalidation;