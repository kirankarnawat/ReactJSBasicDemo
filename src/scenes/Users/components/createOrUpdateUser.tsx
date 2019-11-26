import * as React from 'react';

import { Form, Tabs, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import UserEntitydata from './userEntityData';
import UserEntityTree from './userEntityTree';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';
import { GetJobRolesResponse } from '../../../services/user/dto/Response/getJobRolesResponse';

const TabPane = Tabs.TabPane;

//#region Local State and Property
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    onHandleAutoSearch: (value: string) => void;
    autoDataRef: GetUserEntityListResponse[];
    jobRole: GetJobRolesResponse[];
}

class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {

    state = {
        showsearch: (this.props.modalType === 'create' ? true : false),
        showgroupdata: (this.props.autoDataRef) ? this.props.autoDataRef.filter(p => p.groupId === this.props.form.getFieldValue("groupId")) : []
    };

    handleAddGroupUser = (groupid: string) => {
        this.setState({ showsearch: false, });
        let res = (this.props.autoDataRef) ? this.props.autoDataRef.filter(p => p.groupId === groupid) : [];
        this.state.showgroupdata = res;
    }

    render() {

        const { visible, onCancel, onCreate, onHandleAutoSearch, autoDataRef, jobRole } = this.props;
        debugger;
        

        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={onCancel} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="sysId">system ID: 00006</div>
                        <div className="pos">
                            <div className={(this.state.showsearch) ? '' : 'hidden'}>
                                <UserEntityTree searchData={autoDataRef} onHandleAutoSearch={onHandleAutoSearch} onHandleAddGroupUser={this.handleAddGroupUser} />
                            </div>
                            <div className={(this.state.showsearch) ? 'hidden' : ''}>
                                <UserEntitydata onCreate={onCreate} userJobRole={jobRole} userGroupInfo={this.state.showgroupdata} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);

