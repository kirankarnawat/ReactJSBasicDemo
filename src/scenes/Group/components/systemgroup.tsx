import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Empty } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { SearchAssignmentResponse } from '../../../services/group/dto/Response/searchAssignmentResponse';



export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemGroupProp extends FormComponentProps {

    isActive: boolean;
    roleid: string;
    searchon: string;
    isSelectedActive: boolean;
    onSelectGroup: (grid: string, grname: string) => void;
    onDeSelectGroup: () => void;
    searchPhrase: string;
}


export interface ISystemGroupState {
    selGroupId: string;
    lastsearch: string;
    groupdata: PagedResultDto<SearchAssignmentResponse>;
}

const { Search } = Input;

@inject(Stores.GroupStore)
@observer
class SystemGroup extends React.Component<IGroupProps & ISystemGroupProp, ISystemGroupState> {

    constructor(props) {
        super(props);
        this.state = {
            selGroupId: '',
            lastsearch: '',
            groupdata: { items: [], totalCount: 0 }
        }
    }


    async componentDidUpdate(prevProps, prevState) {

        if (this.props.roleid !== prevProps.roleid || this.props.searchPhrase != prevProps.searchPhrase) {

            this.setState({ selGroupId: '', lastsearch: '', groupdata: { items: [], totalCount: 0 } });

            if (this.props.searchPhrase) await this.handleGroupAutoSearch();
            else await this.handleGroupSearch('');
        }
    }

    selectGroup = async (groupid: string, groupname: string) => {

        await this.props.onSelectGroup(groupid, groupname);

        this.setState({ ...this.state, selGroupId: groupid });
    }

    handleGroupSearch = async (value) => {
        
        let result = await this.props.groupStore.searchAssignment({ RequesterUserId: this.props.groupStore.userid, SearchPhrase: value, SearchOnGroupId: this.props.searchon });

        await this.props.onDeSelectGroup();

        this.setState({ ...this.state, lastsearch: value, groupdata: result });
    }

    handleGroupAutoSearch = async () => {
        
        let result = await this.props.groupStore.searchAssignment({ RequesterUserId: this.props.groupStore.userid, SearchPhrase: this.props.searchPhrase, SearchOnGroupId: this.props.searchon });

        this.setState({ ...this.state, groupdata: result });
    }

    render() {

        if (!this.props.roleid) return (<div></div>);

        const { isActive } = this.props;

        const child = (this.state.groupdata && this.state.groupdata.items.length > 0) ?

            this.state.groupdata.items.map((item, index) => (

                <li key={item.groupId} onClick={() => this.selectGroup(item.groupId, item.groupName)} className={(this.state.selGroupId === item.groupId && this.props.isSelectedActive === true) ? 'active' : ''}>
                    <a href="#" >
                        <span className={(item.status === false) ? "text strike" : "text"}><div className="boldFont"> {item.groupName}</div>
                            <span className="ulText">
                                {
                                    item.group1Name + (item.group2Name ? ' / ' + item.group2Name : '') + (item.group3Name ? ' / ' + item.group3Name : '')
                                    + (item.group4Name ? ' / ' + item.group4Name : '') + (item.group5Name ? ' / ' + item.group5Name : '')
                                }
                            </span>
                        </span>
                        <span className="iconNo mt7">
                            <span className="no">{item.totalAdmin}</span>
                            <span className="icon"></span>
                        </span>

                    </a>
                </li>

            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

        return (

            <div className={(isActive === true) ? "mngGroupBox activemngGroupBox" : "mngGroupBox"}>

                <div className="managegroupbody">

                    <div>
                        <span>
                            <Search placeholder="search keyword" allowClear={true} onSearch={this.handleGroupSearch} >
                            </Search>
                        </span>
                    </div>

                    <br />

                    <ul className="mngGrouplisting">
                        {child}
                    </ul>
                </div>

                <div className="clearfix"></div>
            </div>

        );
    };
}

export default Form.create<ISystemGroupProp>()(SystemGroup);

