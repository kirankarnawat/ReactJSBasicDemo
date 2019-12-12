
import * as React from 'react';

import { Form, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import BulkImportFile from './bulkImportFile';
import BulkImportLog from './bulkImportLog';


export interface IUserProps {
    userStore: UserStore;
}

export interface IBulkImportProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}

const bulkTitle = 'Bulk Import';
const logTitle = 'Error Log';

@inject(Stores.UserStore)
@observer
class BulkImport extends React.Component<IUserProps & IBulkImportProps> {

    state = {
        showlog: false,
        importid: '',
        importfilename: '',
        importdate: '',
        tabnumber: 0,
        logData: [],
        drawerTitle: bulkTitle,
        showClose: true
    };

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({showlog: false, importid: '', importfilename: '', importdate:'', tabnumber: 0, logData: [] });

        this.props.form.resetFields();
    }

    handleFileLog = async (bulkimportid: string, filename: string, importdate: string, tab: number) => {
        debugger;
        let res = await this.props.userStore.getUserBulkImportLog({ id: bulkimportid });

        this.setState({ ...this.state, showlog: true, showClose: false, bulkimportid: bulkimportid, importfilename: filename, importdate: importdate, tabnumber: tab, logData: res.items, drawerTitle: logTitle });
    }

    handleFileLogClose = () => {
        
        this.setState({ ...this.state, showlog: false, showClose: true, bulkimportid: '', importfilename: '', importdate: '', tabnumber: 0, logData: [], drawerTitle: bulkTitle,  });
    }


    render() {

        const { visible } = this.props;

        return (

            <Drawer title={this.state.drawerTitle} width={560} destroyOnClose={true} closable={this.state.showClose} onClose={this.onHanleResetForm} visible={visible}>
                <div className="pos">
                    <div className={(this.state.showlog) ? 'hidden' : ''}>
                        <BulkImportFile onHandleFileLog={this.handleFileLog} />
                    </div>
                    <div className={(this.state.showlog) ? '' : 'hidden'}>
                        <BulkImportLog bulkimportid={this.state.importid} bulkimportfname={this.state.importfilename} bulkimportdate={this.state.importdate} tab={this.state.tabnumber} logData={this.state.logData} onHandleFileLogClose = {this.handleFileLogClose} />
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default Form.create<IBulkImportProps>()(BulkImport);
