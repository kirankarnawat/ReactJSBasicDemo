import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Empty, Button } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';
import { EntityDto } from '../../../services/dto/entityDto';

import CreateOrUpdateGroup from './createOrUpdateGroup';


export interface IGroupProps {
    groupStore: GroupStore;
}

export interface IHierarchyProp extends FormComponentProps {

    level: number;
    levelId: string;
    levelName: string;
    grp1: string;
    grp2: string;
    grp3: string;
    grp4: string;
    parentGroupId: string;
    isActive: boolean;
    isSelectedActive: boolean;
    isSelectedInactive: boolean;
    onSelectLevelGroup: (value: number,lvlname: string, grpid: string) => void;
}

export interface IHierarchyState {

    selectedGroupId: string,
    modalVisible: boolean,
    groupId: string,
    addeditentitydata: string[]
}


@inject(Stores.GroupStore)
@observer
class Hierarchy extends React.Component<IGroupProps & IHierarchyProp, IHierarchyState> {

    constructor(props) {
        super(props);
        this.state = {
            selectedGroupId: '',
            modalVisible: false,
            groupId: '',
            addeditentitydata: []
        }
    }

    addeditGroupFormRef: any;

    saveaddeditFormRef = (formRef: any) => {
        this.addeditGroupFormRef = formRef;
    };

    // #region HANDLE CREATE-EDIT

    //ADD EDIT DRAWER OPEN
    async createOrUpdateModalOpen(entityDto: EntityDto) {

        var data = ['','','',''];

        if (entityDto.id === '') {

            await this.props.groupStore.createGroup(this.props.parentGroupId);
            data = [this.props.grp1, this.props.grp2, this.props.grp3, this.props.grp4];

        } else {
            debugger;

            switch (this.props.level) {
                case 1:
                    await this.props.groupStore.getGroup1DataById(entityDto);
                    break;
                case 2:
                    await this.props.groupStore.getGroup2DataById(entityDto);
                    data = [this.props.grp1, '', '', ''];
                    break;
                case 3:
                    await this.props.groupStore.getGroup3DataById(entityDto);
                    data = [this.props.grp1, this.props.grp2, '', ''];
                    break;
                case 4:
                    await this.props.groupStore.getGroup4DataById(entityDto);
                    data = [this.props.grp1, this.props.grp2, this.props.grp3, ''];
                    break;
                case 5:
                    await this.props.groupStore.getGroup5DataById(entityDto);
                    data = [this.props.grp1, this.props.grp2, this.props.grp3, this.props.grp4];
                    break;
            }            
        }

        this.setState({ groupId: entityDto.id, addeditentitydata: data });

        this.Modal();
    }


    //ADD EDIT GROUP DATA
    onHandlecreateOrUpdateModalClose = async () => {

        this.setState({ modalVisible: false });

        const form = this.addeditGroupFormRef.props.form;
        form.resetFields();
    };

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    // #endregion

    getGroupData = () => {

        var data;

        switch (this.props.level) {

            case 1:
                data = (this.props.groupStore.gr1All) ?
                    this.props.groupStore.gr1All.items.map((item, index) => (
                        <li key={item.group1Id} className={(this.state.selectedGroupId === item.group1Id && this.props.isSelectedActive === true) ? 'active' : ((this.state.selectedGroupId === item.group1Id && this.props.isSelectedInactive === true) ? 'inactive' : '')}>
                            <a href="#">
                                <span className="text" onClick={() => this.selectGroup(item.group1Id, item.group1Name)}>  {item.group1Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.createOrUpdateModalOpen({ id: item.group1Id })}></span>
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
                            <a href="#" >
                                <span className="text" onClick={() => this.selectGroup(item.group2Id, item.group2Name)}>  {item.group2Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.createOrUpdateModalOpen({ id: item.group2Id })}></span>
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
                            <a href="#" >
                                <span className="text" onClick={() => this.selectGroup(item.group3Id, item.group3Name)}>  {item.group3Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.createOrUpdateModalOpen({ id: item.group3Id })}></span>
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
                            <a href="#">
                                <span className="text" onClick={() => this.selectGroup(item.group4Id, item.group4Name)}>  {item.group4Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.createOrUpdateModalOpen({ id: item.group4Id })}></span>
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
                            <a href="#">
                                <span className={(item.status === false) ? "text strike" : "text"} onClick={() => this.selectGroup(item.group5Id, item.group5Name)}>  {item.group5Name}</span>
                                <span className="iconNo">
                                    <span className="editIcon2" onClick={() => this.createOrUpdateModalOpen({ id: item.group5Id })}></span>
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

    selectGroup = (grpid: string, grpname: string) => {

        this.setState({ ...this.state, selectedGroupId: grpid });

        this.props.onSelectLevelGroup(this.props.level, grpname, grpid );

        switch (this.props.level) {
            case 1:
                this.props.groupStore.getAllGroup2Data({ id: grpid });
                break;
            case 2:
                this.props.groupStore.getAllGroup3Data({ id: grpid });
                break;
            case 3:
                this.props.groupStore.getAllGroup4Data({ id: grpid });
                break;
            case 4:
                this.props.groupStore.getAllGroup5Data({ id: grpid });
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
                        <Button disabled={!isActive} onClick={() => this.createOrUpdateModalOpen({ id: '' })} className="icon iconUser"></Button>
                    </div>

                </div>

                <div className="managegroupbody">

                    <ul className="mngGrouplisting">
                        {child}
                    </ul>

                </div>

                <div className="clearfix"></div>


                <CreateOrUpdateGroup
                    wrappedComponentRef={this.saveaddeditFormRef}
                    visible={this.state.modalVisible}
                    onCancel={this.onHandlecreateOrUpdateModalClose}
                    modalType={this.state.groupId === '' ? 'create' : 'edit'}
                    entitydata={this.state.addeditentitydata}
                    level={this.props.level}
                    levelName={this.props.levelName}
                    id={this.state.groupId}
                />

            </div>

        );
    };
}

export default Form.create<IHierarchyProp>()(Hierarchy);

