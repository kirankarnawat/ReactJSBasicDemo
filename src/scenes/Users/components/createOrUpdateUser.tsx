import * as React from 'react';

import { Form, Tabs, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import UserEntitydata from './userEntityData';
import UserEntityTree from './userEntityTree';

import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

const TabPane = Tabs.TabPane;

//#region Local State and Property
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onHandleAutoSearch: (value: string) => void;
    id: string;
}

export interface IUserProps {
    userStore: UserStore;
}

@inject(Stores.UserStore)
@observer
class CreateOrUpdateUser extends React.Component<IUserProps & ICreateOrUpdateUserProps> {

    state = {
        showsearch: (this.props.id === "") ? true : false,
        groupid: ''
    };

    async componentDidUpdate(prevProps, prevState) {
        debugger;
        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({
                    showsearch: (this.props.id === "") ? true : false,
                });
            }
        }
    }

    handleAddGroupUser = async (groupid: string) => {
        debugger;

        await this.props.userStore.getEntityList({ SearchPhrase: '', RequesterUserId: this.props.userStore.userid, GroupId: groupid });

        this.props.userStore.userById.groupId = groupid;

        this.setState({ showsearch: false, groupid: groupid });       
    }


    //onHanleResetForm = () => {
    //    debugger;
    //    this.props.onCancel();    
    //    this.setState({ showsearch: true, groupid: '' });
    //    this.props.form.resetFields();
    //}

    render() {

        const { visible, onHandleAutoSearch, id, onCancel } = this.props;

        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={onCancel} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="sysId">system ID: 00006</div>
                        <div className="pos">
                            <div className={(this.state.showsearch) ? '' : 'hidden'}>
                                <UserEntityTree onHandleAutoSearch={onHandleAutoSearch} onHandleAddGroupUser={this.handleAddGroupUser} />
                            </div>
                            <div className={(this.state.showsearch) ? 'hidden' : ''}>
                                <UserEntitydata id={id} selgroupid={this.state.groupid}/>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);

