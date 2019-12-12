
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
    modalType: string;
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
        tabnumber: 1,
        logData: [],
        drawerTitle: bulkTitle
    };

    //async componentDidUpdate(prevProps, prevState) {

    //    if (this.props.id !== prevProps.id) {
    //        if (this.props.id !== "") {
    //            this.setState({
    //                ...this.state, showsearch: (this.props.id === "") ? true : false, entitydata: this.props.entitydata[0]
    //            });
    //        }
    //    }
    //}

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ ...this.state, showlog: false, importid: '', importfilename: '', importdate:'', tabnumber: 0, logData: [] });

        this.props.form.resetFields();
    }

    handleFileLog = async (bulkimportid: string, filename: string, importdate: string, tab: number) => {
        debugger;

        let res = await this.props.userStore.getUserBulkImportLog({ id: bulkimportid });

        this.setState({ ...this.state, showlog: true, bulkimportid: bulkimportid, importfilename: filename, importdate: importdate, tabnumber: tab, logData: res.items, drawerTitle: logTitle });
    }


    render() {

        const { visible } = this.props;

        return (

            <Drawer title={this.state.drawerTitle} width={560} onClose={this.onHanleResetForm} visible={visible}>
                <div className="pos">
                    <div className={(this.state.showlog) ? 'hidden' : ''}>
                        <BulkImportFile onHandleFileLog={this.handleFileLog} />
                    </div>
                    <div className={(this.state.showlog) ? '' : 'hidden'}>
                        <BulkImportLog bulkimportid={this.state.importid} bulkimportfname={this.state.importfilename} bulkimportdate={this.state.importdate} tab={this.state.tabnumber} logData={this.state.logData} />
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default Form.create<IBulkImportProps>()(BulkImport);
