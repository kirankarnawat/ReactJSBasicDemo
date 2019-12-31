
import * as React from 'react';

import { Form, Drawer, Row, Col, Button, Input, Select, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

import rules from './createOrUpdateGroup.validation';


//#region Local State and Property
export interface ICreateOrUpdateGroupProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    id: string;
    level: number;
    levelId: string;
    levelName: string;
}

export interface IGroupProps {
    groupStore: GroupStore;
}

const { Option } = Select;

@inject(Stores.GroupStore)
@observer
class CreateOrUpdateGroup extends React.Component<IGroupProps & ICreateOrUpdateGroupProps> {

    state = {

    };

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({
                    ...this.state,
                });
            }
        }
    }

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ ...this.state, });

        this.props.form.resetFields();
    }

    //ADD EDIT GROUP DATA
    handleCreate = async() => {
        this.props.form.validateFields(async (err: any, values: any) => {
            if (err) { return; }
            else {
                debugger;

                let res = '';

                switch (this.props.level) {
                    case 1:
                        res = await this.props.groupStore.saveGroup1Data({ ...values });
                        break;
                    case 2:
                        res = await this.props.groupStore.saveGroup2Data({ ...values });
                        break;
                    case 3:
                        res = await this.props.groupStore.saveGroup3Data({ ...values });
                        break;
                    case 4:
                        res = await this.props.groupStore.saveGroup4Data({ ...values });
                        break;
                    case 5:
                        res = await this.props.groupStore.saveGroup5Data({ ...values });
                        break;
                }

                message.success(res);
            }
        });
    };


    render() {

        if (this.props.groupStore.grById === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;

        const { visible, levelName, level } = this.props;

        const { grById } = this.props.groupStore;

        const childrencountry = this.props.groupStore.groupCountry.items.map(item => <Option key={item.countryId}>{item.countryName}</Option>);

        const childrenstate = this.props.groupStore.groupState.items.filter(p => p.countryId === grById.countryId).map(item => <Option key={item.stateId}>{item.stateName}</Option>);

        const childrencity = this.props.groupStore.groupCity.items.filter(p => p.stateId === grById.stateId).map(item => <Option key={item.cityId}>{item.cityName}</Option>);

        return (

            <Drawer title={'Add/Edit ' + levelName} width={560} onClose={this.onHanleResetForm} visible={visible}>

                <div>

                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <div className="treeinlinestructure">
                                {/*
                                    (treeentitydata !== undefined) ?
                                        <ul className="treeentityinline">

                                            <li><a href="#" className="links"><span className="treeIcon"></span><span className="text">{treeentitydata.group1Name}</span><span className={(treeentitydata.group2Name !== null) ? "arrowicon" : "arrowicon hidden"}><Icon type="right" /></span></a></li>

                                            <li><a href="#" className="links"><span className="text">{treeentitydata.group2Name}</span><span className={(treeentitydata.group3Name !== null) ? "arrowicon" : "arrowicon hidden"}><Icon type="right" /></span></a></li>

                                            <li><a href="#" className="links"><span className="text">{treeentitydata.group3Name}</span><span className={(treeentitydata.group4Name !== null) ? "arrowicon" : "arrowicon hidden"}><Icon type="right" /></span></a></li>

                                            <li><a href="#" className="links"><span className="text">{treeentitydata.group4Name}</span></a></li>

                                            <li className={this.state.isAllDisable === true ? 'floatRight' : 'floatRight hidden'}><a className="editEntityIcon" onClick={this.handleAllEnable}></a></li>

                                        </ul>
                                        : ""
                                */}
                            </div>
                        </Col>
                    </Row>

                    <div className="hrLine mb15"></div>

                    <Row className="antd-row">
                        <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                            <FormItem>
                                <label>{levelName + (level === 5) ? 'ID' : ' Name'} <span className="start">*</span> </label>
                                {getFieldDecorator('groupName', { initialValue: grById.groupName, rules: rules.groupname })(<Input placeholder={levelName + (level === 5) ? ' ID' : ' Name'} name="groupName" />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                        <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                            <FormItem>
                                <label>{'Country'} <span className="start">*</span> </label>
                                <div>
                                    {getFieldDecorator('countryId', { initialValue: grById.countryId, rules: rules.country })(
                                        <Select placeholder="Please select country" >
                                            {childrencountry}
                                        </Select>
                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                        <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                            <FormItem>
                                <label>{'State'} <span className="start">*</span> </label>
                                <div>
                                    {getFieldDecorator('stateId', { initialValue: grById.stateId, rules: rules.state })(
                                        <Select placeholder="Please select state">
                                            {childrenstate}
                                        </Select>
                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                        <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                            <FormItem>
                                <label>{'City'} <span className="start">*</span> </label>
                                <div>
                                    {getFieldDecorator('stateId', { initialValue: grById.cityId, rules: rules.city })(
                                        <Select placeholder="Please select state" >
                                            {childrencity}
                                        </Select>
                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className={(level === 5) ? "antd-row" : "antd-row hidden"}>
                        <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                            <FormItem>
                                <label>{'Location'} <span className="start">*</span> </label>
                                {getFieldDecorator('location', { initialValue: grById.location })(<Input placeholder='Location' name="location" />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                        <Col lg={{ span: 12 }} sm={{ span: 12 }} md={{ span: 12 }} xs={{ span: 12 }}>
                            <FormItem>
                                <label>{'Zip Code'} <span className="start">*</span> </label>
                                {getFieldDecorator('zipCode', { initialValue: grById.zipCode })(<Input placeholder='Zip Code' name="zipCode" />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <div className="hrLine mb15"></div>

                    <div className="buttonfooter">
                        <div className="antd-row">
                            <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                                <div className="bulkImpFooter">
                                    <ul className="bulkImpListing">
                                        <li>
                                            <Button onClick={this.handleCreate} className='ant-btn-primary' type="primary">Submit</Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateGroupProps>()(CreateOrUpdateGroup);

