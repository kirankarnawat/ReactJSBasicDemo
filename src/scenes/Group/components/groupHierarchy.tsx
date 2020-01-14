
import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Row, Col, Form, Card } from 'antd';
import Hierarchy from './hierarchy';
import HierarchySearch from './hierarchySearch';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';


export interface IGroupProps {
    groupStore: GroupStore;
}

export interface IGroupHierarchyState {
    isGr1Active: boolean; isGr2Active: boolean; isGr3Active: boolean; isGr4Active: boolean; isGr5Active: boolean;
    isGr1SelActive: boolean; isGr2SelActive: boolean; isGr3SelActive: boolean; isGr4SelActive: boolean; isGr5SelActive: boolean;
    isGr1SelInactive: boolean; isGr2SelInactive: boolean; isGr3SelInactive: boolean; isGr4SelInactive: boolean; isGr5SelInactive: boolean;
    parentGroupId: string; grp1name: string; grp2name: string, grp3name: string, grp4name: string,
    searchgrp1id: string, searchgrp2id: string, searchgrp3id: string, searchgrp4id: string
}


@inject(Stores.GroupStore)
@observer
class GroupHierarchy extends React.Component<IGroupProps, IGroupHierarchyState> {

    constructor(props) {
        super(props);
        this.state = {
            isGr1Active: true, isGr2Active: false, isGr3Active: false, isGr4Active: false, isGr5Active: false,
            isGr1SelActive: false, isGr2SelActive: false, isGr3SelActive: false, isGr4SelActive: false, isGr5SelActive: false,
            isGr1SelInactive: false, isGr2SelInactive: false, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
            parentGroupId: '', grp1name: '', grp2name: '', grp3name: '', grp4name: '',
            searchgrp1id: '', searchgrp2id: '', searchgrp3id: '', searchgrp4id: ''
        }
    }

    quickfilterFormRef: any;

    savequickfilterFormRef = (formRef: any) => {
        this.quickfilterFormRef = formRef;
    };

    getGroupState = (value: number) => {
        switch (value) {
            case 1: return this.state.isGr1Active; case 2: return this.state.isGr2Active;
            case 3: return this.state.isGr3Active; case 4: return this.state.isGr4Active;
            case 5: return this.state.isGr5Active; default: return false;
        }
    }

    getGroupSelActiveState = (value: number) => {
        switch (value) {
            case 1: return this.state.isGr1SelActive; case 2: return this.state.isGr2SelActive;
            case 3: return this.state.isGr3SelActive; case 4: return this.state.isGr4SelActive;
            case 5: return this.state.isGr5SelActive; default: return false;
        }
    }

    getGroupSelInactiveState = (value: number) => {
        switch (value) {
            case 1: return this.state.isGr1SelInactive; case 2: return this.state.isGr2SelInactive;
            case 3: return this.state.isGr3SelInactive; case 4: return this.state.isGr4SelInactive;
            case 5: return this.state.isGr5SelInactive; default: return false;
        }
    }

    onHandleSetLevelGroupState = (value: number, grpname: string, grpid: string) => {
        debugger;
        switch (value) {
            case 1:

                this.setState({
                    searchgrp1id: '', searchgrp2id: '', searchgrp3id: '', searchgrp4id: '',
                    isGr1Active: false, isGr2Active: true, isGr3Active: false, isGr4Active: false, isGr5Active: false,
                    isGr1SelActive: true, isGr2SelActive: false, isGr3SelActive: false, isGr4SelActive: false, isGr5SelActive: false,
                    isGr1SelInactive: false, isGr2SelInactive: false, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp1name: grpname, grp2name: '', grp3name: '', grp4name: ''
                });
                break;
            case 2:

                this.setState({
                    ...this.state, searchgrp2id: '', searchgrp3id: '', searchgrp4id: '',
                    isGr1Active: false, isGr2Active: false, isGr3Active: true, isGr4Active: false, isGr5Active: false,
                    isGr1SelActive: false, isGr2SelActive: true, isGr3SelActive: false, isGr4SelActive: false, isGr5SelActive: false,
                    isGr1SelInactive: true, isGr2SelInactive: false, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp2name: grpname, grp3name: '', grp4name: ''
                });
                break;
            case 3:

                this.setState({
                    ...this.state, searchgrp3id: '', searchgrp4id: '',
                    isGr1Active: false, isGr2Active: false, isGr3Active: false, isGr4Active: true, isGr5Active: false,
                    isGr1SelActive: false, isGr2SelActive: false, isGr3SelActive: true, isGr4SelActive: false, isGr5SelActive: false,
                    isGr1SelInactive: true, isGr2SelInactive: true, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp3name: grpname, grp4name: ''
                });
                break;
            case 4:

                this.setState({
                    ...this.state, searchgrp4id: '',
                    isGr1Active: false, isGr2Active: false, isGr3Active: false, isGr4Active: false, isGr5Active: true,
                    isGr1SelActive: false, isGr2SelActive: false, isGr3SelActive: false, isGr4SelActive: true, isGr5SelActive: false,
                    isGr1SelInactive: true, isGr2SelInactive: true, isGr3SelInactive: true, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp4name: grpname
                });
                break;
            case 5:

                this.setState({
                    ...this.state, isGr4SelInactive: true
                });
                break;
        }

        const form = this.quickfilterFormRef.props.form;
        form.resetFields();
    }

    onHandleSearchGroupState = async (grpid: string) => {
        debugger;

        await this.props.groupStore.emptyGroupsForSearch();

        let result = await this.props.groupStore.getSystemHierarchyRoleSearch({ GroupId: grpid, RequesterUserId: this.props.groupStore.userid, SearchPhrase: '' });

        if (result && result.items.length > 0) {
            debugger;
            let res = result.items[0];

            //get date first
            if (res.group1Id) { await this.props.groupStore.getSearchGroup1Data({ id: res.group1Id }); }
            if (res.group2Id) { await this.props.groupStore.getSearchGroup2Data({ id: res.group2Id }); }
            if (res.group3Id) { await this.props.groupStore.getSearchGroup3Data({ id: res.group3Id }); }
            if (res.group4Id) { await this.props.groupStore.getSearchGroup4Data({ id: res.group4Id }); }
            if (res.group5Id) { await this.props.groupStore.getSearchGroup5Data({ id: res.group5Id }); }

            //set state

            this.setState({ ...this.state,

                grp1name: res.group1Name, grp2name: ((res.group2Name && res.group3Name) ? res.group2Name : ''), grp3name: ((res.group3Name && res.group4Name) ? res.group3Name : ''), grp4name: ((res.group4Name && res.group5Name) ? res.group4Name : ''),

                searchgrp1id: res.group1Id, searchgrp2id: res.group2Id ? res.group2Id : '', searchgrp3id: res.group3Id ? res.group3Id : '', searchgrp4id: res.group4Id ? res.group4Id:'',

                isGr1Active: ((res.group1Id && !res.group2Id) ? true : false), isGr2Active: ((res.group2Id && !res.group3Id) ? true : false), isGr3Active: ((res.group3Id && !res.group4Id) ? true : false), isGr4Active: ((res.group4Id && !res.group5Id)?true:false), isGr5Active:((res.group5Id)?true:false),

                isGr1SelActive:((res.group2Id && !res.group3Id)?true:false), isGr2SelActive:((res.group3Id && !res.group4Id)?true:false), isGr3SelActive:((res.group4Id && !res.group5Id)?true:false), isGr4SelActive:((res.group5Id)?true:false), isGr5SelActive:false,

                isGr1SelInactive:(res.group3Id?true:false) , isGr2SelInactive:(res.group4Id?true:false), isGr3SelInactive:(res.group5Id? true : false), isGr4SelInactive:false, isGr5SelInactive:false,

                parentGroupId:(res.group5Id ? res.group4Id : (res.group4Id ? res.group3Id : (res.group3Id ? res.group2Id : (res.group2Id ? res.group1Id: '')))),
            })
        }
    }

    onHandleSearchReState = async () => {
        
        await this.props.groupStore.getAllGroup1Data();

        this.setState({
            ...this.state,
            isGr1Active: true, isGr2Active: false, isGr3Active: false, isGr4Active: false, isGr5Active: false,
            isGr1SelActive: false, isGr2SelActive: false, isGr3SelActive: false, isGr4SelActive: false, isGr5SelActive: false,
            isGr1SelInactive: false, isGr2SelInactive: false, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
            parentGroupId: '', grp1name: '', grp2name: '', grp3name: '', grp4name: '',
            searchgrp1id: '', searchgrp2id: '', searchgrp3id: '', searchgrp4id: ''
        });
    }

    render() {

        if (this.props.groupStore.groupLevelMaster === undefined) return (<div></div>);

        const { groupStore } = this.props;

        return (
            <Card>
                <div className="floatright">
                    <div className="rightContentdata">
                        <HierarchySearch
                            wrappedComponentRef={this.savequickfilterFormRef}
                            onSearch={this.onHandleSearchGroupState}
                            onRefreshSearch={this.onHandleSearchReState}
                        />
                    </div>
                </div>

                <Row className="antd-row antdCustomRow">
                    {
                        groupStore.groupLevelMaster.items.map((item, index) => (

                            <Col key={item["lookUpValue"] + index.toString()} lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass20">

                                <Hierarchy
                                    level={index + 1}
                                    levelId={item["lookUpValue"]}
                                    levelName={item["lookUpName"]}
                                    grp1={this.state.grp1name}
                                    grp2={this.state.grp2name}
                                    grp3={this.state.grp3name}
                                    grp4={this.state.grp4name}
                                    parentGroupId={this.state.parentGroupId}
                                    isActive={this.getGroupState(index + 1)}
                                    isSelectedActive={this.getGroupSelActiveState(index + 1)}
                                    isSelectedInactive={this.getGroupSelInactiveState(index + 1)}
                                    onSelectLevelGroup={this.onHandleSetLevelGroupState}
                                    searchgrp1id={this.state.searchgrp1id}
                                    searchgrp2id={this.state.searchgrp2id}
                                    searchgrp3id={this.state.searchgrp3id}
                                    searchgrp4id={this.state.searchgrp4id}
                                />

                            </Col>

                        ))
                    }
                </Row>

            </Card>
        )
    };
}

export default Form.create()(GroupHierarchy);