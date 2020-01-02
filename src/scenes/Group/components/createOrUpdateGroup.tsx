
import * as React from 'react';

import { Form, Drawer, Row, Col, Button, Input, Select, message, Icon, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import GroupStore from '../../../stores/groupStore';

import rules from './createOrUpdateGroup.validation';
import commonconst from '../../../lib/commonconst';


//#region Local State and Property
export interface ICreateOrUpdateGroupProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    id: string;
    level: number;
    levelName: string;
    entitydata: string[]
}

export interface IGroupProps {
    groupStore: GroupStore;
}

const { Option } = Select;

@inject(Stores.GroupStore)
@observer
class CreateOrUpdateGroup extends React.Component<IGroupProps & ICreateOrUpdateGroupProps> {

    state = {
        isSuccessMsgShow: false,
        isAllDisable: false,
        successMsg: '',
        childrenstate: [],
        childrencity: []
    };

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {

                const datastate = this.props.groupStore.groupState.items.filter(p => p.countryId === this.props.groupStore.grById.countryId).map(item => <Option key={item.stateId}>{item.stateName}</Option>);

                const datacity = this.props.groupStore.groupCity.items.filter(p => p.stateId === this.props.groupStore.grById.stateId).map(item => <Option key={item.cityId}>{item.cityName}</Option>);

                this.setState({
                    ...this.state, isSuccessMsgShow: false, isAllDisable: false, successMsg: '', childrenstate: datastate, childrencity: datacity
                });
            }
        }
    }

    handleAllEnable = () => {

        this.setState({ ...this.state, isAllDisable: false });
    }

    handleChange = () => {
        this.setState({
            isSuccessMsgShow: false,
            isAllDisable: false,
            successMsg: '',
        })
    }

    handleCountryChange = (value: any) => {
        debugger;
        var data = this.props.groupStore.groupState.items.filter(p => p.countryId === value).map(item => <Option key={item.stateId}>{item.stateName}</Option>);

        this.props.form.setFieldsValue({ 'stateId': '', 'cityId': '' })

        this.setState({ ...this.state, childrenstate: data, childrencity: [] });
    }

    handleStateChange = (value: any) => {
        debugger;
        var data = this.props.groupStore.groupCity.items.filter(p => p.stateId === value).map(item => <Option key={item.cityId}>{item.cityName}</Option>);

        this.props.form.setFieldsValue({ 'cityId': '' })

        this.setState({ ...this.state, childrencity: data });
    }

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({
            ...this.state, isSuccessMsgShow: false, isAllDisable: false, successMsg: '',
        });
    }


    handleDataExists = async (rule, value, callback) => {

        switch (this.props.level) {
            case 1:
                await this.props.groupStore.checkIsGroup1NameInUse({ group1Id: this.props.groupStore.grById.groupId, group1Name: value });

                (this.props.groupStore.grExists === 'true') ? callback() : callback('Group name is already exist');
                break;
            case 2:
                await this.props.groupStore.checkIsGroup2NameInUse({ group1Id: this.props.groupStore.grById.groupParentId, group2Id: this.props.groupStore.grById.groupId, group2Name: value });

                (this.props.groupStore.grExists === 'true') ? callback() : callback('Group name is already exist');
                break;
            case 3:
                await this.props.groupStore.checkIsGroup3NameInUse({ group2Id: this.props.groupStore.grById.groupParentId, group3Id: this.props.groupStore.grById.groupId, group3Name: value });

                (this.props.groupStore.grExists === 'true') ? callback() : callback('Group name is already exist');
                break;
            case 4:
                await this.props.groupStore.checkIsGroup4NameInUse({ group3Id: this.props.groupStore.grById.groupParentId, group4Id: this.props.groupStore.grById.groupId, group4Name: value });

                (this.props.groupStore.grExists === 'true') ? callback() : callback('Group name is already exist');
                break;
            case 5:
                await this.props.groupStore.checkIsGroup5NameInUse({ group4Id: this.props.groupStore.grById.groupParentId, group5Id: this.props.groupStore.grById.groupId, group5Name: value });

                (this.props.groupStore.grExists === 'true') ? callback() : callback('Group name is already exist');
                break;
        }
    }

    //ADD EDIT GROUP DATA
    handleCreate = async () => {

        this.props.form.validateFields(async (err: any, values: any) => {

            if (err) { return; }
            else {
                debugger;

                let data = ({ requesterUserId: this.props.groupStore.userid, groupId: this.props.groupStore.grById.groupId, groupParentId: this.props.groupStore.grById.groupParentId, ...values });
                let res = '';

                switch (this.props.level) {
                    case 1:
                        res = await this.props.groupStore.saveGroup1Data(data);
                        break;
                    case 2:
                        res = await this.props.groupStore.saveGroup2Data(data);
                        break;
                    case 3:
                        res = await this.props.groupStore.saveGroup3Data(data);
                        break;
                    case 4:
                        res = await this.props.groupStore.saveGroup4Data(data);
                        break;
                    case 5:
                        res = await this.props.groupStore.saveGroup5Data(data);
                        break;
                }

                this.setState({ isAllDisable: true, isSuccessMsgShow: true, successMsg: (this.props.groupStore.grById.groupId) ? commonconst.MESSAGES.GROUPEDITSUCCESS : commonconst.MESSAGES.GROUPADDSUCCESS });

                message.success(res);
            }
        });
    };


    render() {

        if (this.props.groupStore.grById === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;

        const { visible, levelName, level, entitydata } = this.props;

        const { grById } = this.props.groupStore;

        const childrencountry = this.props.groupStore.groupCountry.items.map(item => <Option key={item.countryId}>{item.countryName}</Option>);


        return (

            <Drawer title={'Add/Edit ' + levelName} width={360} onClose={this.onHanleResetForm} visible={visible}>

                <div>

                    <Row className={(this.state.isSuccessMsgShow) ? 'antd-row mb10' : 'antd-row mb10 hidden'} >
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                            <div className="successMsg">
                                <div className="successText">
                                    <div className="heading">
                                        <h3>{this.state.successMsg}</h3>
                                    </div>
                                </div>
                                <div className="ant-clearfix"></div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                        <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>

                            <div className="treeinlinestructure">

                                {(entitydata !== undefined && entitydata[0]) ?

                                    <ul className="treeentityinline">

                                        <li><a href="#" className="links"><span className="treeIcon"></span><span className="text">{entitydata[0]}</span><span className={(entitydata[1]) ? "arrowicon" : "arrowicon hidden"}><Icon type="right" /></span></a></li>

                                        <li><a href="#" className="links"><span className="text">{entitydata[1]}</span><span className={(entitydata[2]) ? "arrowicon" : "arrowicon hidden"}><Icon type="right" /></span></a></li>

                                        <li><a href="#" className="links"><span className="text">{entitydata[2]}</span><span className={(entitydata[3]) ? "arrowicon" : "arrowicon hidden"}><Icon type="right" /></span></a></li>

                                        <li><a href="#" className="links"><span className="text">{entitydata[3]}</span></a></li>

                                        <li className={this.state.isAllDisable === true ? 'floatRight' : 'floatRight hidden'}><a className="editEntityIcon" onClick={this.handleAllEnable}></a></li>

                                    </ul>

                                    : ""
                                }

                            </div>

                        </Col>
                    </Row>

                    {/* <div className="hrLine mb15"></div> */}

                    <Row className="antd-row">
                        <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <label>{levelName + ((level === 5) ? ' ID' : ' Name')} <span className="start">*</span> </label>
                                {getFieldDecorator('groupName', { initialValue: grById.groupName, rules: [{ required: true, message: 'Group name is required!' }, { validator: this.handleDataExists }] })(<Input placeholder={levelName + ((level === 5) ? ' ID' : ' Name')} name="groupName" className={this.state.isAllDisable ? 'disabled' : ''} onChange={this.handleChange} />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                    <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <label>{'Country'} <span className="start">*</span> </label>
                                <div>
                                    {getFieldDecorator('countryId', { initialValue: grById.countryId, rules: rules.country })(
                                        <Select showSearch optionFilterProp="children" placeholder="Please select country" className={this.state.isAllDisable ? 'disabled' : ''} onChange={this.handleCountryChange} >
                                            {childrencountry}
                                        </Select>
                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                    <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <label>{'State'} <span className="start">*</span> </label>
                                <div>
                                    {getFieldDecorator('stateId', { initialValue: grById.stateId, rules: rules.state })(
                                        <Select showSearch optionFilterProp="children" placeholder="Please select state" className={this.state.isAllDisable ? 'disabled' : ''} onChange={this.handleStateChange}>
                                            {this.state.childrenstate}
                                        </Select>
                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                    <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <label>{'City'} <span className="start">*</span> </label>
                                <div>
                                    {getFieldDecorator('cityId', { initialValue: grById.cityId, rules: rules.city })(
                                        <Select showSearch optionFilterProp="children" placeholder="Please select city" className={this.state.isAllDisable ? 'disabled' : ''} onChange={this.handleChange}>
                                            {this.state.childrencity}
                                        </Select>
                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                    <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <label>{'Zip Code'} </label>
                                {getFieldDecorator('zipCode', { initialValue: grById.zipCode })(<Input placeholder='Zip Code' name="zipCode" className={this.state.isAllDisable ? 'disabled' : ''} onChange={this.handleChange} />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className={(level === 5) ? "antd-row" : "antd-row hidden"}>
                    <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <label>{'Location'} </label>
                                {getFieldDecorator('location', { initialValue: grById.location })(<Input placeholder='Location' name="location" className={this.state.isAllDisable ? 'disabled' : ''} onChange={this.handleChange} />)}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row className="antd-row">
                    <Col lg={{ span: 24  }} sm={{ span: 24  }} md={{ span: 24  }} xs={{ span: 24  }}>
                            <FormItem>
                                <div className="switchbutton">
                                    <div><label>{'Status'} <span className="start">*</span> </label></div>
                                    <label className="mr8">{'Inactive'}</label>

                                    {getFieldDecorator('status', { initialValue: grById.status, valuePropName: "checked" })(
                                        <Switch onChange={this.handleChange} />
                                    )}
                                    <label className="ml8">{'Active'}</label>

                                </div>
                            </FormItem>
                        </Col>
                    </Row>

                    {/* <div className="hrLine mb15"></div> */}
                    <div className="btnfooterContainer">
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <ul className="bulkImpListing">
                                        <li>
                                        <Button onClick={this.handleCreate} className={this.state.isAllDisable ? 'ant-btn-primary disabled' : 'ant-btn-primary'} type="primary">Submit</Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                </div>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateGroupProps>()(CreateOrUpdateGroup);

