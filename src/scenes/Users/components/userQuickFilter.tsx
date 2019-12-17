import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Form, Input, AutoComplete } from 'antd'; //, Checkbox
import { FormComponentProps } from 'antd/lib/form';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';


export interface IUserProps {
    userStore: UserStore;
}

export interface IUserQuickFilterProp extends FormComponentProps {
    handleSearch: () => void;
}

export interface IUserQuickFilterState {
    result: GetUserEntityListResponse[];
    switchvalue: boolean;
    namevalue: string;
    groupvalue: string;
}

const { Option } = AutoComplete;


@inject(Stores.UserStore)
@observer
class UserQuickFilter extends React.Component<IUserProps & IUserQuickFilterProp, IUserQuickFilterState> {

    constructor(props) {

        super(props);

        this.state = {
            result: [], switchvalue: true, namevalue: '', groupvalue: ''
        };
    }

    switchChange = e => {
        this.props.userStore.setFilter({ ...this.props.userStore.filters, status: e.target.checked ? true : false });
        this.setState({ ...this.state, switchvalue: e.target.checked ? true : false });
    }

    firstNameChange = (event: any) => {
        this.props.userStore.setFilter({ ...this.props.userStore.filters, firstName: event.target.value });
        this.setState({ ...this.state, namevalue: event.target.value });
    }

    groupChange = (data: any) => {
        this.props.userStore.setFilter({ ...this.props.userStore.filters, groupId: "", searchOnGroupId: "" });
        this.setState({ ...this.state, groupvalue: data });
    }

    groupSelect = (option: any) => {
        this.props.userStore.setFilter({ ...this.props.userStore.filters, groupId: option ? option.split("~")[0] : "", searchOnGroupId: option ? option.split("~")[1] : "" });
    }

    handleRefreshSearch = async () => {

        this.props.userStore.setFilter({ ...this.props.userStore.filters, groupId: "", searchOnGroupId: "", firstName: "", status: true });
        this.setState({ ...this.state, groupvalue: '', namevalue: '', switchvalue: true });
        //parent load
        this.props.handleSearch();
    }

    handleAutoSearch = async (value: string) => {

        let searchresult: GetUserEntityListResponse[];

        if (value && this.props.userStore) {

            let data = await this.props.userStore.getEntityList({ SearchPhrase: value, RequesterUserId: this.props.userStore.userid, GroupId: '' });

            searchresult = data.items;
        }
        else {
            searchresult = [];
        }

        this.setState({ ...this.state, result: searchresult });
    };

    render() {

        if (this.props.userStore.filters === undefined) return (<div></div>);

        const { result } = this.state;
        const { handleSearch } = this.props;

        const children = result.map(item => <Option key={item.groupId + '~' + item.searchOnGroupId}>{item.groupName}</Option>);

        return (


            <ul className="filterlist">
                <li><div className="switchbutton mt5">
                    <label className="mr8">{'Active'} </label>
                        <label className="mr8 switch"><input type="checkbox" onChange={this.switchChange} checked={this.state.switchvalue} /> {/*<Checkbox onChange={this.switchChange} checked={this.state.switchvalue} />*/}<span className="slider round"></span></label>
                        <label>Inactive</label>
                    </div>
                    </li>
                    <li className="width227">
                        <Input placeholder="First Name/ Last Name" allowClear={true} onChange={this.firstNameChange} value={this.state.namevalue} />
                    </li>
                    <li className="width227">
                        <AutoComplete placeholder="Group 1/ Group 2/ Group 3" allowClear={true} onSelect={this.groupSelect} onChange={this.groupChange} onSearch={this.handleAutoSearch} value={this.state.groupvalue}>
                            {children}
                        </AutoComplete>
                    </li>
                    <li>
                        <div className="searchbg" onClick={handleSearch} >
                            <span className="tabsearchbtn"></span>
                        </div>
                    </li>
                    <li><div className="refreshbg" onClick={this.handleRefreshSearch} ><span className="refreshbtn"></span></div></li>

                </ul>

                );
            }
        }
        
export default Form.create<IUserQuickFilterProp>()(UserQuickFilter);
