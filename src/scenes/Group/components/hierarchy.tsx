import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Empty, Button } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';


export interface IGroupProps {
    groupStore: GroupStore;
}

export interface IHierarchyProp extends FormComponentProps {

    level: number;
    levelId: string;
    levelName: string;
    parentGroupId: string;
    isActive: boolean;
    isSelectedActive: boolean;
    isSelectedInactive: boolean;
    onSelectLevelGroup: (value: number, grpid: string) => void;
}


@inject(Stores.GroupStore)
@observer
class Hierarchy extends React.Component<IGroupProps & IHierarchyProp> {

    state = {
        selectedGroupId: '',
    }

    getGroupData = () => {

        var data;

        switch (this.props.level) {

            case 1:
                data = (this.props.groupStore.gr1All) ?
                    this.props.groupStore.gr1All.items.map((item, index) => (
                        <li key={item.group1Id} className={(this.state.selectedGroupId === item.group1Id && this.props.isSelectedActive === true) ? 'active' : ((this.state.selectedGroupId === item.group1Id && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                            <a href="#" onClick={() => this.selectGroup(item.group1Id)}>
                                <span className="text">  {item.group1Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.editGroup(item.group1Id)}></span>
                                    <span className="no">{item.totalMemberCount}</span>
                                    <span className="icon"></span>
                                </span>
                            </a>
                        </li>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                break;

            case 2:
                data = (this.props.groupStore.gr2All) ?
                    this.props.groupStore.gr2All.items.map((item, index) => (
                        <li key={item.group2Id} className={(this.state.selectedGroupId === item.group2Id && this.props.isSelectedActive === true) ? 'active' : ((this.state.selectedGroupId === item.group2Id && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                            <a href="#" onClick={() => this.selectGroup(item.group2Id)}>
                                <span className="text">  {item.group2Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.editGroup(item.group2Id)}></span>
                                    <span className="no">{item.totalMemberCount}</span>
                                    <span className="icon"></span>
                                </span>
                            </a>
                        </li>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                break;

            case 3:
                data = (this.props.groupStore.gr3All) ?
                    this.props.groupStore.gr3All.items.map((item, index) => (
                        <li key={item.group3Id} className={(this.state.selectedGroupId === item.group3Id && this.props.isSelectedActive === true) ? 'active' : ((this.state.selectedGroupId === item.group3Id && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                            <a href="#" onClick={() => this.selectGroup(item.group3Id)}>
                                <span className="text">  {item.group3Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.editGroup(item.group3Id)}></span>
                                    <span className="no">{item.totalMemberCount}</span>
                                    <span className="icon"></span>
                                </span>
                            </a>
                        </li>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                break;

            case 4:
                data = (this.props.groupStore.gr4All) ?
                    this.props.groupStore.gr4All.items.map((item, index) => (
                        <li key={item.group4Id} className={(this.state.selectedGroupId === item.group4Id && this.props.isSelectedActive === true) ? 'active' : ((this.state.selectedGroupId === item.group4Id && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                            <a href="#" onClick={() => this.selectGroup(item.group4Id)}>
                                <span className="text">  {item.group4Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.editGroup(item.group4Id)}></span>
                                    <span className="no">{item.totalMemberCount}</span>
                                    <span className="icon"></span>
                                </span>
                            </a>
                        </li>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                break;

            case 5:
                data = (this.props.groupStore.gr5All) ?
                    this.props.groupStore.gr5All.items.map((item, index) => (
                        <li key={item.group5Id} className={(this.state.selectedGroupId === item.group5Id && this.props.isSelectedActive === true) ? 'active' : ((this.state.selectedGroupId === item.group5Id && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                            <a href="#" onClick={() => this.selectGroup(item.group5Id)}>
                                <span className={(item.status === false) ? "text strike" : "text"}>  {item.group5Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.editGroup(item.group5Id)}></span>
                                    <span className="no">{item.totalMemberCount}</span>
                                    <span className="icon"></span>
                                </span>
                            </a>
                        </li>
                    )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                break;

            default: data = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }
        return data;
    }

    editGroup = (data: string) => {
        console.log(data);
    }

    addGroup = () => {

        console.log(this.props.parentGroupId);

        this.props.groupStore.createGroup(this.props.parentGroupId);
    }

    selectGroup = (data: string) => {

        this.setState({ ...this.state, selectedGroupId: data });

        this.props.onSelectLevelGroup(this.props.level, data);

        switch (this.props.level) {
            case 1:
                this.props.groupStore.getAllGroup2Data({ id: data });
                break;
            case 2:
                this.props.groupStore.getAllGroup3Data({ id: data });
                break;
            case 3:
                this.props.groupStore.getAllGroup4Data({ id: data });
                break;
            case 4:
                this.props.groupStore.getAllGroup5Data({ id: data });
                break;
        }
    }

    render() {

        if (this.props.groupStore.gr1All === undefined) return (<div></div>);

        const { levelId, levelName, isActive } = this.props;

        const child = this.getGroupData();

        return (

            <div className={(isActive === true) ? "mngGroupBox activemngGroupBox" : "mngGroupBox"}>

                <div className="mngGroupBoxHeader">

                    <div className="floatleft">
                        <h4 id={'name_' + levelId}>{levelName}</h4>
                    </div>

                    <div className="floatright">
                        <Button disabled={!isActive} onClick={this.addGroup} className="icon iconUser"></Button>
                    </div>

                </div>

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

export default Form.create<IHierarchyProp>()(Hierarchy);

