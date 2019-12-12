
import * as React from 'react';

import { Form, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import BulkImportFile from './bulkImportFile';
import BulkImportLog from './bulkImportLog';
import { UserBulkImportLogListResponse } from '../../../services/user/dto/Response/userBulkImportLogListResponse';


export interface IUserProps {
    userStore: UserStore;
}

export interface IBulkImportProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}

export interface IBulkImportState {
    showlog: boolean;
    importid: string;
    importfilename: string;
    importdate: string;
    tabNumber: number;
    logData: UserBulkImportLogListResponse[];
    drawerTitle: string;
    showClose: boolean;
}


const bulkTitle = 'Bulk Import';
const logTitle = 'Error Log';

@inject(Stores.UserStore)
@observer
class BulkImport extends React.Component<IUserProps & IBulkImportProps, IBulkImportState> {

    constructor(props) {

        super(props);

        this.state = {
            showlog: false,
            importid: '',
            importfilename: '',
            importdate: '',
            tabNumber: 0,
            logData: [],
            drawerTitle: bulkTitle,
            showClose: true
        };
    }



    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ showlog: false, importid: '', importfilename: '', importdate: '', tabNumber: 0, logData: [] });

        this.props.form.resetFields();
    }

    handleFileLog = async (bulkimportid: string, filename: string, importdate: string, tab: number) => {
        debugger;
        let res = await this.props.userStore.getUserBulkImportLog({ id: bulkimportid });

        this.setState({ ...this.state, showlog: true, showClose: false, importid: bulkimportid, importfilename: filename, importdate: importdate, tabNumber: tab, logData: res.items, drawerTitle: logTitle });
    }

    handleFileLogClose = () => {

        this.setState({ ...this.state, showlog: false, showClose: true, importid: '', importfilename: '', importdate: '', tabNumber: 0, logData: [], drawerTitle: bulkTitle, });
    }


    render() {

        const { visible } = this.props;

        return (

            <Drawer title={this.state.drawerTitle} width={560} destroyOnClose={true} closable={this.state.showClose} onClose={this.onHanleResetForm} visible={visible}>
                <div>
                    <div className={(this.state.showlog) ? 'hidden' : ''}>
                        <BulkImportFile onHandleFileLog={this.handleFileLog} />
                    </div>
                    <div className={(this.state.showlog) ? '' : 'hidden'}>
                        <BulkImportLog bulkimportid={this.state.importid} bulkimportfname={this.state.importfilename} bulkimportdate={this.state.importdate} tab={this.state.tabNumber} logData={this.state.logData} onHandleFileLogClose={this.handleFileLogClose} />
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default Form.create<IBulkImportProps>()(BulkImport);
