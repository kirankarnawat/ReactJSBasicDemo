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

    //handleSearch: (value: number) => void;
}

export interface ISystemRoleSearchState {

    result: GetUserEntityListResponse[];
    groupvalue: '';
}

const { Option } = Select;

@inject(Stores.GroupStore)
@observer
class SystemRoleSearch extends React.Component<IGroupProps & ISystemRoleSearchProp, ISystemRoleSearchState> {

    constructor(props) {

        super(props);

        this.state = {
            result: [], groupvalue: ''
        };
    }


    groupChange = (data: any) => {
        this.setState({ ...this.state, groupvalue: data });
    }

    
    //groupSelect = (option: any) => {
    //    this.props.groupStore.setFilter({ ...this.props.groupStore.filters, groupId: option ? option.split("~")[0] : "", searchOnGroupId: option ? option.split("~")[1] : "" });
    //}

    //handleRefreshSearch = async () => {

    //    this.props.groupStore.setFilter({ ...this.props.groupStore.filters, groupId: "", searchOnGroupId: "", firstName: "", status: true, emailAddress: '', jobCodeId: '', hiringDateTo: null, hiringDateFrom: null, roleChangeDateTo: null, roleChangeDateFrom: null });

    //    this.setState({ ...this.state, groupvalue: ''});

    //    //parent load
    //    this.props.handleSearch();
    //}

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

        if (this.props.groupStore.gr1All === undefined) return (<div></div>);

        const { result } = this.state;
        //const { handleSearch } = this.props;

        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        return (

            <ul className="filterlist">
                
                <li className="width227">
                    <AutoComplete placeholder="Association/ Brand/ Pharmacy/ NCPDP" allowClear={true} onChange={this.groupChange} onSearch={this.handleAutoSearch} value={this.state.groupvalue}>
                        {children}
                    </AutoComplete>
                </li>

                <li>
                    <div className="searchbg" >
                        <span className="tabsearchbtn"></span>
                    </div>
                </li>

                <li><div className="refreshbg"><span className="refreshbtn"></span></div></li>

            </ul>

        );
    }
}

export default Form.create<ISystemRoleSearchProp>()(SystemRoleSearch);

