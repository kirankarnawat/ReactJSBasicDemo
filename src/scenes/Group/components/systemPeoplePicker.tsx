
import * as React from 'react';

import { Form, Drawer, Col, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';
import { SystemUserResponse } from '../../../services/group/dto/Response/systemUserResponse';


//#region Local State and Property
export interface IGroupProps {
    groupStore: GroupStore;
}

export interface ISystemPeoplePickerProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    systemusers: SystemUserResponse[];
}

const { Search } = Input

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
            <Drawer title={'People Picker'} width={340} onClose={this.onHanleResetForm} visible={visible}>
                <div className="peopleEditPgs">
                    <div className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <FormItem>
                                <label>{'People Search'} <span className="start">*</span> </label>
                                <Search placeholder="First Name / Last Name / Email Address" allowClear={true}>
                                </Search>
                            </FormItem>
                        </Col>
                    </div>
                    <div className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <FormItem>
                                <label>{'Association/ Brand/ Pharmacy/ NCPDP'} <span className="start">*</span> </label>
                                <Search placeholder="Association/ Brand/ Pharmacy/ NCPDP" allowClear={true}>
                                </Search>
                            </FormItem>
                        </Col>
                    </div>
                    <div className="antd-row">
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                            <ul className="peopleList">
                                <li>
                                    <span className="textData">
                                        <h6>Super Admin</h6>
                                        <p>Cardinal Health</p>
                                    </span>
                                    <span className="rightCont"><span className="floatright"><span className="icon iconUser"></span></span></span>
                                </li>
                                <li>
                                    <span className="textData">
                                        <h6>Super Admin</h6>
                                        <p>Cardinal Health</p>
                                    </span>
                                    <span className="rightCont"><span className="floatright"><span className="icon iconUser"></span></span></span>
                                </li>
                                <li>
                                    <span className="textData">
                                        <h6>Super Admin</h6>
                                        <p>Cardinal Health</p>
                                    </span>
                                    <span className="rightCont"><span className="floatright"><span className="icon iconUser"></span></span></span>
                                </li>
                            </ul>
                        </Col>
                    </div>
                </div>

            </Drawer>
        );
    }
}

export default Form.create<ISystemPeoplePickerProps>()(SystemPeoplePicker);

