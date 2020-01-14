import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Select, AutoComplete } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';


export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemRoleSearchProp extends FormComponentProps {

    onSearch: (value: string) => void;
    onRefreshSearch: () => void;
}

export interface ISystemRoleSearchState {

    result: GetUserEntityListResponse[];
}

const { Option } = Select;

@inject(Stores.GroupStore)
@observer
class SystemRoleSearch extends React.Component<IGroupProps & ISystemRoleSearchProp, ISystemRoleSearchState> {

    constructor(props) {

        super(props);

        this.state = {
            result: []
        };
    }


    groupSelect = (option: any) => {
        debugger;
        var grpid = option ? option.split("~")[0] : "";

        this.props.onSearch(grpid);
    }

    groupChange = (val) => {

        this.props.form.setFieldsValue({ 'groupId': val })
    }


    handleRefreshSearch = async () => {

        this.props.form.setFieldsValue({ 'groupId': '' })

        //parent load
        this.props.onRefreshSearch();
    }

    handleAutoSearch = async (value: string) => {

        let searchresult: GetUserEntityListResponse[];

        if (value && this.props.groupStore) {

            let data = await this.props.groupStore.getSearchEntityList({ SearchPhrase: value, RequesterUserId: this.props.groupStore.userid, GroupId: '' });

            searchresult = data.items;
        }
        else {
            searchresult = [];
        }

        this.setState({ ...this.state, result: searchresult });
    };

    render() {

        if (this.props.groupStore.systemRolesAll === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;

        const { result } = this.state;

        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        return (

            <ul className="filterlist">

                <li className="width227">
                    {getFieldDecorator('groupId', { initialValue: '' })(
                        <AutoComplete placeholder="Association/ Brand/ Pharmacy/ NCPDP" onChange={this.groupChange} onSelect={this.groupSelect} onSearch={this.handleAutoSearch}>
                            {children}
                        </AutoComplete>
                    )}
                </li>

                <li><div className="refreshbg" onClick={this.handleRefreshSearch}><span className="refreshbtn"></span></div></li>

            </ul>

        );
    }
}

export default Form.create<ISystemRoleSearchProp>()(SystemRoleSearch);

