
import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Row, Col, Form } from 'antd';
import Hierarchy from './hierarchy';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

export interface IGroupProps {
    groupStore: GroupStore;
}

export interface IGroupHierarchyState {
    isGr1Active: boolean; isGr2Active: boolean; isGr3Active: boolean; isGr4Active: boolean; isGr5Active: boolean;
    isGr1SelActive: boolean; isGr2SelActive: boolean; isGr3SelActive: boolean; isGr4SelActive: boolean; isGr5SelActive: boolean;
    isGr1SelInactive: boolean; isGr2SelInactive: boolean; isGr3SelInactive: boolean; isGr4SelInactive: boolean; isGr5SelInactive: boolean;
    parentGroupId: string; grp1name: string; grp2name: string, grp3name: string, grp4name: string
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
            parentGroupId: '', grp1name: '', grp2name: '', grp3name: '', grp4name: ''
        }
    }

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
                    isGr1Active: false, isGr2Active: true, isGr3Active: false, isGr4Active: false, isGr5Active: false,
                    isGr1SelActive: true, isGr2SelActive: false, isGr3SelActive: false, isGr4SelActive: false, isGr5SelActive: false,
                    isGr1SelInactive: false, isGr2SelInactive: false, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp1name: grpname, grp2name: '', grp3name: '', grp4name: ''
                });
                break;
            case 2:

                this.setState({
                    isGr1Active: false, isGr2Active: false, isGr3Active: true, isGr4Active: false, isGr5Active: false,
                    isGr1SelActive: false, isGr2SelActive: true, isGr3SelActive: false, isGr4SelActive: false, isGr5SelActive: false,
                    isGr1SelInactive: true, isGr2SelInactive: false, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp2name: grpname, grp3name: '', grp4name: ''
                });
                break;
            case 3:

                this.setState({
                    isGr1Active: false, isGr2Active: false, isGr3Active: false, isGr4Active: true, isGr5Active: false,
                    isGr1SelActive: false, isGr2SelActive: false, isGr3SelActive: true, isGr4SelActive: false, isGr5SelActive: false,
                    isGr1SelInactive: true, isGr2SelInactive: true, isGr3SelInactive: false, isGr4SelInactive: false, isGr5SelInactive: false,
                    parentGroupId: grpid, grp3name: grpname, grp4name: ''
                });
                break;
            case 4:

                this.setState({
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
    }

    render() {

        if (this.props.groupStore.groupLevelMaster === undefined) return (<div></div>);

        const { groupStore } = this.props;

        return (

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
                            />

                        </Col>

                    ))
                }
            </Row>
        )
    };
}

export default Form.create()(GroupHierarchy);