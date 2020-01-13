import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { FormComponentProps } from 'antd/lib/form';
import { Form, Switch, Button, Empty, message } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

import commonconst from '../../../lib/commonconst';

import SystemPeoplePicker from './systemPeoplePicker';

export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemPeopleProp extends FormComponentProps {

    isActive: boolean;
    groupid: string;
    groupname: string;
    roleid: string;
    searchon: string;
}

@inject(Stores.GroupStore)
@observer
class SystemPeople extends React.Component<IGroupProps & ISystemPeopleProp> {

    state = {
        modalVisible: false,
        systemuserdata: []
    }

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.groupStore.assignedAdmin !== prevProps.groupStore.assignedAdmin) {
            this.setState({ modalVisible: false, systemuserdata: [] });
        }
    }

    addeditGroupFormRef: any;

    saveaddeditFormRef = (formRef: any) => {
        this.addeditGroupFormRef = formRef;
    };

    // #region HANDLE CREATE-EDIT

    //ADD EDIT DRAWER OPEN
    createOrUpdateModalOpen = async () => {

        await this.props.groupStore.getSystemUsers({ groupId: this.props.groupid, noPaging: true, requesterUserId: this.props.groupStore.userid, status: true, firstName: '', searchOnGroupId: '' });

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

        if (!this.props.groupStore.assignedAdmin) return (<div></div>);

        const { assignedAdmin } = this.props.groupStore;

        const child = (assignedAdmin) ? assignedAdmin.items.map((item, index) => (

            <li key={item.userId + index}>
                <a href="#">
                    <span className="text width100per"> <div className="boldFont">{item.firstName} {item.lastName}</div>
                        <span className="ulText">
                            {this.props.groupname}
                        </span>
                    </span>
                    <div className="switchbutton mt5">
                        <label className="mr8">{'Inactive'}</label>
                        <Switch onChange={(value) => this.handleUserStatus(value, item.userRoleId)} defaultChecked={(item.status.toLowerCase() === 'true') ? true : false} />
                        <label className="ml8">{'Active'}</label>
                    </div>

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

                    <div className="text boldFont">  Total Count of Admin : ({(assignedAdmin) ? assignedAdmin.totalCount : 0})</div>

                    <ul className="mngGrouplisting">
                        {child}
                    </ul>
                </div>

                <div className="clearfix"></div>

                <SystemPeoplePicker
                    wrappedComponentRef={this.saveaddeditFormRef}
                    visible={this.state.modalVisible}
                    onCancel={this.onHandlecreateOrUpdateModalClose}
                    chaingroupid={this.props.groupid}
                    chainroleid={this.props.roleid}
                    chainsearchon={this.props.searchon}
                />

            </div>

        );
    };
}

export default Form.create<ISystemPeopleProp>()(SystemPeople);

