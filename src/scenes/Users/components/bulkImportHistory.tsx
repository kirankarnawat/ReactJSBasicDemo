import * as React from 'react';
import {Table} from 'antd'
class BulkImportHistory extends React.Component{
render(){
    const columns = [
        {
            title: 'FirstName', dataIndex: 'firstName', sorter: true, key: 'firstName', width: 150,
            render: (text: string, item: any) => <div> {(item.status === false) ? <span className="disabledrow"></span> : <span></span>} <span className="adminIcon"></span> {text}</div>
        },
        { title: 'LastName', dataIndex: 'lastName', sorter: true, key: 'lastName', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'EmailAddress', dataIndex: 'emailAddress', sorter: true, key: 'emailAddress', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Job Code', dataIndex: 'jobCode', sorter: true, key: 'jobCode', width: 150, render: (text: string) => <div>{text}</div> },
        { title: 'Group Name', dataIndex: 'group1Name', sorter: true, key: 'group1Name', width: 150, render: (text: string) => <div>{text}</div> },
    ];
    return(
        <div className="tableContainer table-responsive">
        <Table
            rowKey={record => record.userId}
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
