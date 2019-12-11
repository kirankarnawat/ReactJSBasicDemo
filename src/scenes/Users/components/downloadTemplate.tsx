
import * as React from 'react';
import { Form, Button } from 'antd';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';


export interface IUserProps {
    userStore: UserStore;
}

@inject(Stores.UserStore)
@observer
class DownloadTemplate extends React.Component<IUserProps>{

    state = {
        loading: false
    };

    handleDownloadFile = async () => {

        this.setState({ loading: true });

        let data = await this.props.userStore.downloadBulkTemplate()
        const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'User Import Template.xlsx');

        document.body.appendChild(link);

        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);

        this.setState({
            loading: false
        });

    };

    render() {

        return (
            <Button disabled={this.state.loading} type="primary" icon="download" onClick={this.handleDownloadFile}>
                {(this.state.loading) ? 'Downloading...' : 'Download Template'}
            </Button>
        );
    }
}

export default Form.create()(DownloadTemplate);
