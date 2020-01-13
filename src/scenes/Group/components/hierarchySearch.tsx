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

export interface IHierarchySearchProp extends FormComponentProps {

    onSearch: (value: string) => void;
    onRefreshSearch: () => void;
}

export interface IHierarchySearchState {

    result: GetUserEntityListResponse[];
    searchval: string;
}

const { Option } = Select;

@inject(Stores.GroupStore)
@observer
class HierarchySearch extends React.Component<IGroupProps & IHierarchySearchProp, IHierarchySearchState> {

    constructor(props) {

        super(props);

        this.state = {
            result: [], searchval:''
        };
    }


    groupSelect = (option: any) => {

        var grpid = option ? option.split("~")[0] : "";

        this.props.onSearch(grpid);
    }

    groupChange = (val) => {

        this.setState({ ...this.state, searchval: val });
    }

       
    handleRefreshSearch = async () => {

        this.setState({ ...this.state, searchval: ''});

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

        if (this.props.groupStore.gr1All === undefined) return (<div></div>);

        const { result } = this.state;

        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        return (

            <ul className="filterlist">
                
                <li className="width227">
                    <AutoComplete placeholder="Association/ Brand/ Pharmacy/ NCPDP" onChange={this.groupChange} onSelect={this.groupSelect} value={this.state.searchval} onSearch={this.handleAutoSearch}>
                        {children}
                    </AutoComplete>
                </li>

                <li><div className="refreshbg" onClick={this.handleRefreshSearch}><span className="refreshbtn"></span></div></li>

            </ul>

        );
    }
}

export default Form.create<IHierarchySearchProp>()(HierarchySearch);

