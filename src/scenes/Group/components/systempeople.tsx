import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Switch, Button, Empty, message } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { GroupAdminUsersResponse } from '../../../services/group/dto/Response/groupAdminUsersResponse';

import commonconst from '../../../lib/commonconst';

import SystemPeoplePicker from './systemPeoplePicker';

export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemPeopleProp extends FormComponentProps {

    isActive: boolean;
    groupid: string;
    groupname: string;
    selGrPeopleData: PagedResultDto<GroupAdminUsersResponse>;
}

@inject(Stores.GroupStore)
@observer
class SystemPeople extends React.Component<IGroupProps & ISystemPeopleProp> {

    state = {
        modalVisible: false,
    }

    addeditGroupFormRef: any;

    saveaddeditFormRef = (formRef: any) => {
        this.addeditGroupFormRef = formRef;
    };

    // #region HANDLE CREATE-EDIT

    //ADD EDIT DRAWER OPEN
    createOrUpdateModalOpen = async() => {

        //var data = ['', '', '', ''];

            //await this.props.groupStore.createGroup(this.props.parentGroupId);
            //data = [this.props.grp1, this.props.grp2, this.props.grp3, this.props.grp4];

        //this.setState({ addeditentitydata: data });

        this.Modal();
    }


    //ADD EDIT USER DATA
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


    handleUserStatus = async (checked, userroleid) => {

        let result = await this.props.groupStore.userRoleActiveInactive({ userRoleId: userroleid, status: checked, requesterUserId: this.props.groupStore.userid });

        if (checked === true)
            message.success(result ? commonconst.MESSAGES.USERACTIVESUCCESS : commonconst.MESSAGES.COMMONERROR);
        else
            message.success(result ? commonconst.MESSAGES.USERINACTIVESUCCESS : commonconst.MESSAGES.COMMONERROR);
    }

    render() {

        if (!this.props.selGrPeopleData) return (<div></div>);

        const { selGrPeopleData } = this.props;

        const child = (selGrPeopleData) ? selGrPeopleData.items.map((item, index) => (

            <li key={item.userId}>
                <a href="#">
                    <span className="text"> {item.firstName} {item.lastName}</span>
                    <span className="switchbutton">
                        <label className="mr8">{'Inactive'}</label>
                        <Switch onChange={(value) => this.handleUserStatus(value, item.userRoleId)} defaultChecked={(item.status.toLowerCase() === 'true') ? true : false} />
                        <label className="ml8">{'Active'}</label>
                    </span>
                    <span className="ulText">
                        {this.props.groupname}
                    </span>
                </a>
            </li>

        )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

        return (

            <div className="mngGroupBox activemngGroupBox">
                <div className="mngGroupBoxHeader">
                    <div className="floatleft">
                        <h4 id="Name_Group1">People</h4>
                    </div>
                    <div className="floatright">
                        <Button className="icon iconUser" onClick={this.createOrUpdateModalOpen}></Button>
                    </div>
                </div>
                <div className="managegroupbody">

                    <div className="text">  Total Count of Admin : ({(selGrPeopleData) ? selGrPeopleData.totalCount : 0})</div>

                    <ul className="mngGrouplisting">
                        {child}
                    </ul>
                </div>

                <div className="clearfix"></div>

                <SystemPeoplePicker
                    wrappedComponentRef={this.saveaddeditFormRef}
                    visible={this.state.modalVisible}
                    onCancel={this.onHandlecreateOrUpdateModalClose}
                />

            </div>

        );
    };
}

export default Form.create<ISystemPeopleProp>()(SystemPeople);

