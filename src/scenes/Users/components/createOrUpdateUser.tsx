
import * as React from 'react';

import { Form, Tabs, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import UserEntitydata from './userEntityData';
import UserEntityTree from './userEntityTree';

import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';


const TabPane = Tabs.TabPane;


//#region Local State and Property
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    id: string;
    entitydata: GetUserEntityListResponse[];
}

export interface IUserProps {
    userStore: UserStore;
}


@inject(Stores.UserStore)
@observer
class CreateOrUpdateUser extends React.Component<IUserProps & ICreateOrUpdateUserProps> {

    state = {
        showsearch: (this.props.id === "") ? true : false,
        groupid: '',
        entitydata: this.props.entitydata[0],
    };

    async componentDidUpdate(prevProps, prevState) {
       
        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({
                    ...this.state, showsearch: (this.props.id === "") ? true : false, entitydata: this.props.entitydata[0]
                });
            }
        }
    }

    handleAddGroupUser = async (groupid: string) => {
        debugger;

        let res = await this.props.userStore.getEntityList({ SearchPhrase: '', RequesterUserId: this.props.userStore.userid, GroupId: groupid });

        this.props.userStore.userById.groupId = groupid;

        this.setState({ ...this.state, showsearch: false, groupid: groupid, entitydata: res.items[0] });
    }


    onHanleResetForm = async () => {
        
        await this.props.onCancel();

        this.setState({ ...this.state, showsearch: true, groupid: '' });

        this.props.form.resetFields();
    }


    render() {

        const { id, visible } = this.props;

        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={this.onHanleResetForm} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="pos">
                            <div className={(this.state.showsearch) ? '' : 'hidden'}>
                                <UserEntityTree onHandleAddGroupUser={this.handleAddGroupUser} />
                            </div>
                            <div className={(this.state.showsearch) ? 'hidden' : ''}>
                                <UserEntitydata id={id} selgroupid={this.state.groupid} treeentitydata={this.state.entitydata} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);

