
import * as React from 'react';

import { Form, Row, Col} from 'antd';

import SystemRole from './systemrole';
import SystemGroup from './systemgroup';
import SystemPeople from './systempeople';
import SystemRoleSearch from './systemroleSearch';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

export interface IGroupProps {
    groupStore: GroupStore;
}

export interface IGroupSystemRoleState {
    selRoleId: string; searchonGroupId: string, selGroupId: string; selGroupName: string; searchRoleId: string; searchPhrase: string;
    isRoleActive: boolean; isRoleSelActive: boolean; isRoleSelInactive: boolean;
    isGroupActive: boolean; isGroupSelActive: boolean;
    isPeopleActive: boolean;
    isShowGr: boolean; isShowPep: boolean;
}


@inject(Stores.GroupStore)
@observer
class GroupSystemRole extends React.Component<IGroupProps, IGroupSystemRoleState> {

    constructor(props) {
        super(props);
        this.state = {
            selRoleId: '', selGroupId: '', searchonGroupId: '', selGroupName: '', searchRoleId: '', searchPhrase: '',
            isRoleActive: true, isRoleSelActive: false, isRoleSelInactive: false,
            isGroupActive: false, isGroupSelActive: false,
            isPeopleActive: false,
            isShowGr: false, isShowPep: false
        }
    }

    quickfilterFormRef: any;

    savequickfilterFormRef = (formRef: any) => {
        this.quickfilterFormRef = formRef;
    };

    onSelectSystemRole = (value: string, searchonval: string) => {

        this.setState({
            ...this.state, selRoleId: value, searchonGroupId: searchonval, isShowGr: true, isRoleActive: false, isRoleSelActive: true, isGroupActive: true,
            selGroupId: '', isShowPep: false, isRoleSelInactive: false, isGroupSelActive: false, isPeopleActive: false, searchRoleId: '', searchPhrase: '',
        });

        const form = this.quickfilterFormRef.props.form;
        form.resetFields();
    }

    onSelectGroup = async (grid: string, grname: string) => {

        await this.props.groupStore.getGroupAdminUsers({ GroupId: grid, RequesterUserId: this.props.groupStore.userid, SearchOnGroupId: this.state.searchonGroupId });

        this.setState({ ...this.state, selGroupId: grid, selGroupName: grname, isShowPep: true, isRoleSelActive: false, isRoleSelInactive: true, isGroupActive: false, isGroupSelActive: true, isPeopleActive: true });
    }

    onDeSelectGroup = () => {

        this.props.groupStore.emptyGroupAdminUsers();

        this.setState({
            ...this.state, selGroupId: '', selGroupName: '', isShowPep: false,
            isRoleSelActive: true, isRoleSelInactive: false, isGroupActive: true, isGroupSelActive: false,
            isPeopleActive: false, searchRoleId: '', searchPhrase: '',
        });
    }

    onHandleSearchGroupState = async (grpid: string) => {
        debugger;
        await this.props.groupStore.emptyGroupAdminUsers();

        let result = await this.props.groupStore.getSystemHierarchyRoleSearch({ GroupId: grpid, RequesterUserId: this.props.groupStore.userid, SearchPhrase: '' });

        if (result && result.items.length > 0) {

            let res = result.items[0];

            var roleid = 'Level' + res.groupLevel + 'Admin';

            this.setState({
                ...this.state,
                selRoleId: roleid, selGroupId: '', searchonGroupId: res.searchOnGroupId, selGroupName: '',
                searchRoleId: roleid, searchPhrase: res.groupName,
                isRoleActive: false, isRoleSelActive: true, isRoleSelInactive: false,
                isGroupActive: true, isGroupSelActive: false,
                isPeopleActive: false, isShowGr: true, isShowPep: false
            });
        }
    }

    onHandleSearchReState = () => {

        this.setState({ ...this.state,
            selRoleId: '', selGroupId: '', searchonGroupId: '', selGroupName: '', searchRoleId: '', searchPhrase: '',
            isRoleActive: true, isRoleSelActive: false, isRoleSelInactive: false,
            isGroupActive: false, isGroupSelActive: false,
            isPeopleActive: false,
            isShowGr: false, isShowPep: false
        });
    }

    render() {

        return (

            <div>
                <div className="floatright">
                    <div className="rightContentdata">
                        <SystemRoleSearch
                            wrappedComponentRef={this.savequickfilterFormRef}
                            onSearch={this.onHandleSearchGroupState}
                            onRefreshSearch={this.onHandleSearchReState}
                        />
                    </div>
                </div>

                <Row className="antd-row antdCustomRow">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass25">
                        <SystemRole isActive={this.state.isRoleActive} isSelectedActive={this.state.isRoleSelActive} isSelectedInactive={this.state.isRoleSelInactive} onSelectSystemRole={this.onSelectSystemRole} searchRoleId={this.state.searchRoleId} />
                    </Col>

                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className={(this.state.isShowGr === true) ? "customeclass4" : "customeclass4 hidden"}>
                        <SystemGroup isActive={this.state.isGroupActive} roleid={this.state.selRoleId} searchon={this.state.searchonGroupId} isSelectedActive={this.state.isGroupSelActive} onSelectGroup={this.onSelectGroup} onDeSelectGroup={this.onDeSelectGroup} searchPhrase={this.state.searchPhrase} />
                    </Col>

                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className={(this.state.isShowPep === true) ? "customeclass4" : "customeclass4 hidden"}>
                        <SystemPeople isActive={this.state.isPeopleActive} groupid={this.state.selGroupId} groupname={this.state.selGroupName} searchon={this.state.searchonGroupId} roleid={this.state.selRoleId} />
                    </Col>
                </Row>
            </div>
        )
    };
}

export default Form.create()(GroupSystemRole);