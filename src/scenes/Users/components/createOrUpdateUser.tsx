import * as React from 'react';

import { Form, Tabs, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import UserEntitydata from './userEntityData';
import UserEntityTree from './userEntityTree';

const TabPane = Tabs.TabPane;

//#region Local State and Property
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onHandleAutoSearch: (value: string) => void;
    id: string;
}

class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {

    state = {
        showsearch: (this.props.id === "") ? true : false,
        groupid: ''
    };

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({
                    showsearch: (this.props.id === "") ? true : false,
                });
            }
        }
    }

    handleAddGroupUser = (groupid: string) => {
        this.setState({ showsearch: false, groupid: groupid  });
    }


    onHanleResetForm = () => {
        this.setState({ showsearch: true, groupid: '' });
        this.props.onCancel();
    }

    render() {

        const { visible, onHandleAutoSearch, id } = this.props;

        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={this.onHanleResetForm} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="sysId">system ID: 00006</div>
                        <div className="pos">
                            <div className={(this.state.showsearch) ? '' : 'hidden'}>
                                <UserEntityTree onHandleAutoSearch={onHandleAutoSearch} onHandleAddGroupUser={this.handleAddGroupUser} />
                            </div>
                            <div className={(this.state.showsearch) ? 'hidden' : ''}>
                                <UserEntitydata id={id} selgroupid={this.state.groupid} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);

