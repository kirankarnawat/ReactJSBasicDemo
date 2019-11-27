import * as React from 'react';
import {Table} from 'antd'
class BulkImportHistory extends React.Component{
render(){
    const columns = [
        { title: 'Bulk Import Date', dataIndex: 'bulkimportdate', sorter: true, key: 'bulkimportdate', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'File Name', dataIndex: 'fileName', sorter: true, key: 'fileName', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Status', dataIndex: 'Status', sorter: true, key: 'Status', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Total Records', dataIndex: 'TotalRecords', sorter: true, key: 'TotalRecords', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Uploaded', dataIndex: 'Uploaded', sorter: true, key: 'Uploaded', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Not Uploaded', dataIndex: 'noUploaded', sorter: true, key: 'noUploaded', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Options', dataIndex: 'Options', sorter: true, key: 'Options', width: 150, render: (text: string) => <div>{text}</div> },
    ];
    return(
        <div className="tableContainer table-responsive">
        <Table
           // rowKey={record => record.userId}
            size={'default'}
            bordered={true}
            columns={columns}
            className="table"
        />
    </div>
    )
}
}

export default BulkImportHistory;
