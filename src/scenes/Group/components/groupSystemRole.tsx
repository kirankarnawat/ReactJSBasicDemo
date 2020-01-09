
import * as React from 'react';

import { Form, Row, Col } from 'antd';

import SystemRole from './systemrole';
import SystemGroup from './systemgroup';
import SystemPeople from './systempeople';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';
import { GroupAdminUsersResponse } from '../../../services/group/dto/Response/groupAdminUsersResponse';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';

export interface IGroupProps {
    groupStore: GroupStore;
}

export interface IGroupSystemRoleState {
    selRoleId: string; searchonGroupId: string, selGroupId: string; selGroupName: string;
    isRoleActive: boolean; isRoleSelActive: boolean; isRoleSelInactive: boolean;
    isGroupActive: boolean; isGroupSelActive: boolean;
    isPeopleActive: boolean;
    isShowGr: boolean; isShowPep: boolean;
    selGrPeopleData: PagedResultDto<GroupAdminUsersResponse>
}


@inject(Stores.GroupStore)
@observer
class GroupSystemRole extends React.Component<IGroupProps, IGroupSystemRoleState> {

    constructor(props) {
        super(props);
        this.state = {
            selRoleId: '', selGroupId: '', searchonGroupId: '', selGroupName: '',
            isRoleActive: true, isRoleSelActive: false, isRoleSelInactive: false,
            isGroupActive: false, isGroupSelActive: false,
            isPeopleActive: false,
            isShowGr: false, isShowPep: false,
            selGrPeopleData: { items: [], totalCount: 0 }
        }
    }

    onSelectSystemRole = (value: string, searchonval: string) => {

        this.setState({
            ...this.state, selRoleId: value, searchonGroupId: searchonval, isShowGr: true, isRoleActive: false, isRoleSelActive: true, isGroupActive: true,
            selGroupId: '', isShowPep: false, isRoleSelInactive: false, isGroupSelActive: false, isPeopleActive: false
        });
    }

    onSelectGroup = async (grid: string, grname: string) => {

        let result = await this.props.groupStore.getGroupAdminUsers({ GroupId: grid, RequesterUserId: this.props.groupStore.userid, SearchOnGroupId: this.state.searchonGroupId });

        this.setState({ ...this.state, selGroupId: grid, selGroupName: grname, isShowPep: true, isRoleSelActive: false, isRoleSelInactive: true, isGroupActive: false, isGroupSelActive: true, isPeopleActive: true, selGrPeopleData: result });
    }

    onDeSelectGroup = () => {

        this.setState({ ...this.state, selGroupId: '', selGroupName: '', isShowPep: false, isRoleSelActive: true, isRoleSelInactive: false, isGroupActive: true, isGroupSelActive: false, isPeopleActive: false, selGrPeopleData: { items: [], totalCount: 0 } });
    }

    render() {

        return (
            <Row className="antd-row antdCustomRow">
                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass4">
                    <SystemRole isActive={this.state.isRoleActive} isSelectedActive={this.state.isRoleSelActive} isSelectedInactive={this.state.isRoleSelInactive} onSelectSystemRole={this.onSelectSystemRole} />
                </Col>

                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className={(this.state.isShowGr === true) ? "customeclass4" : "customeclass4 hidden"}>
                    <SystemGroup isActive={this.state.isGroupActive} roleid={this.state.selRoleId} searchon={this.state.searchonGroupId} isSelectedActive={this.state.isGroupSelActive} onSelectGroup={this.onSelectGroup} onDeSelectGroup={this.onDeSelectGroup} />
                </Col>

                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className={(this.state.isShowPep === true) ? "customeclass4" : "customeclass4 hidden"}>
                    <SystemPeople isActive={this.state.isPeopleActive} groupid={this.state.selGroupId} groupname={this.state.selGroupName} searchon={this.state.searchonGroupId} selGrPeopleData={this.state.selGrPeopleData} />
                </Col>
            </Row>
        )
    };
}

export default Form.create()(GroupSystemRole);