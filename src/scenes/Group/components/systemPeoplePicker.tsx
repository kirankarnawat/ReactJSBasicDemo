
import * as React from 'react';

import { Form, Tabs, Drawer} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';


//#region Local State and Property
export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemPeoplePickerProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
}

const { TabPane } = Tabs

@inject(Stores.GroupStore)
@observer
class SystemPeoplePicker extends React.Component<IGroupProps & ISystemPeoplePickerProps> {

    state = {
    };

    //async componentDidUpdate(prevProps, prevState) {

    //    if (this.props.id !== prevProps.id) {
    //        if (this.props.id !== "") {
    //            this.setState({
    //                ...this.state, showsearch: (this.props.id === "") ? true : false, entitydata: this.props.entitydata[0]
    //            });
    //        }
    //    }
    //}

    handleAddGroupUser = async (groupid: string) => {
        debugger;

        //let res = await this.props.userStore.getEntityList({ SearchPhrase: '', RequesterUserId: this.props.userStore.userid, GroupId: groupid });

        //this.props.userStore.userById.groupId = groupid;

        //this.setState({ ...this.state,});
    }


    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ ...this.state, showsearch: true, groupid: '' });

        this.props.form.resetFields();
    }


    render() {

        const { visible } = this.props;

        return (
            <Drawer title={'People Picker'} width={560} onClose={this.onHanleResetForm} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="pos">
                            
                        </div>
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ISystemPeoplePickerProps>()(SystemPeoplePicker);

