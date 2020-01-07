import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Empty } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';



export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemRoleProp extends FormComponentProps {

    isActive: boolean;
    isSelectedActive: boolean;
    isSelectedInactive: boolean;
    onSelectSystemRole: (value: string, searchvalue: string) => void;
}


@inject(Stores.GroupStore)
@observer
class SystemRole extends React.Component<IGroupProps & ISystemRoleProp> {

    state = {
        selRoleId: '',
        searchonGroupId: ''
    }


    getRoleData = () => {

        var data;

        data = (this.props.groupStore.systemRolesAll) ?

            this.props.groupStore.systemRolesAll.items.map((item, index) => (
                <li key={item.roleId} className={(this.state.selRoleId === item.roleId && this.props.isSelectedActive === true) ? 'active' : ((this.state.selRoleId === item.roleId && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                    <a href="#" onClick={() => this.selectSystemRole(item.roleId, item.searchonGroupId)}>
                        <span className="text" >  {item.displayRole}</span>
                    </a>
                </li>
            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;


        return data;
    }

    selectSystemRole = (roleid: string, searchongrpid: string) => {

        this.setState({ ...this.state, selRoleId: roleid, searchonGroupId: searchongrpid });

        this.props.onSelectSystemRole(roleid, searchongrpid);
    }


    render() {

        if (this.props.groupStore.systemRolesAll === undefined) return (<div></div>);

        const { isActive } = this.props;

        const child = this.getRoleData();

        return (

            <div className={(isActive === true) ? "mngGroupBox activemngGroupBox" : "mngGroupBox"}>

                <div className="managegroupbody">
                    <ul className="mngGrouplisting">
                        {child}
                    </ul>
                </div>

                <div className="clearfix"></div>
            </div>

        );
    };
}

export default Form.create<ISystemRoleProp>()(SystemRole);

