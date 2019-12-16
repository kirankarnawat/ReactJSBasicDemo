
import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

const { Option } = Select;

export interface IUserProps {
    userStore: UserStore;
}

export interface IBulkImportHistoryProp extends FormComponentProps {
    handleSearch: () => void;
}

@inject(Stores.UserStore)
@observer
class BulkImportHistorySearch extends React.Component<IUserProps & IBulkImportHistoryProp> {


    state = {
        statusvalue: ''
    };

    handleChange = (data: any) => {

        this.setState({ statusvalue: data });
        this.props.userStore.setBulkFilter({ ...this.props.userStore.bulkfilters, importStatus: data });
    }

    handleRefreshSearch = async () => {

        this.setState({ statusvalue: '' });
        this.props.userStore.setBulkFilter({ ...this.props.userStore.bulkfilters, importStatus: '' });
        this.props.handleSearch();
    }

    render() {

        if (this.props.userStore.userBulkImportStatus === undefined) return (<div></div>);

        const { userBulkImportStatus } = this.props.userStore;

        const result = (userBulkImportStatus !== undefined) ? userBulkImportStatus.items : [];
        const children = (result !== undefined) ? result.map(
            (item) => {
                return <Option key={item["lookUpValue"]}>{item["lookUpName"]}</Option>;
            }
        ) : '';

        return (

            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-16">
                <ul className="filterlist">


                    <li className="width227">
                        <Select placeholder="All Status" onChange={this.handleChange} value={this.state.statusvalue}>
                            {children}
                        </Select>
                    </li>

                    <li>
                        <div className="searchbg" onClick={async () => { this.props.handleSearch(); }}>
                            <span className="tabsearchbtn"></span>
                        </div>
                    </li>

                    <li><div className="refreshbg" onClick={this.handleRefreshSearch} ><span className="refreshbtn"></span></div></li>

                </ul>
            </div>
        );
    }
}

export default Form.create<IBulkImportHistoryProp>()(BulkImportHistorySearch);



