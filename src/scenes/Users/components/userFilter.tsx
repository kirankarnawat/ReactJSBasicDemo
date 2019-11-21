import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Drawer, Button, Switch, DatePicker,AutoComplete } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';

//const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    userStore: UserStore;
    result: GetUserEntityListResponse[];
}
const { Option } = AutoComplete;
@inject(Stores.UserStore)
@observer
class UserFilter extends React.Component<ICreateOrUpdateUserProps> {
    state = {
        confirmDirty: false,
        filtermodalVisible: false,
        bulkmodalVisible: false,
        userId: '',
        result: [],
        firstName: '',
        groupId: '',
        searchOnGroupId:'',
        status: null,
        jobCodeId:'',
        hiringDateFrom:null,
        hiringDateTo:null,
        roleChangeDateFrom:null,
        roleChangeDateTo:null

    };
   //run on start
   async componentDidMount() {
    await this.props.userStore.initFilter();
    await this.getAll();
}
    compareToFirstPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };   
    async getAll() {
        debugger;
        await this.props.userStore.getAll({ ...this.props.userStore.filters });
    }
    handleAutoSearch = (value: string) => {        
        let result: GetUserEntityListResponse[];
        if (!value || this.props.userStore.userentity.items.find(p => p.groupName.toLowerCase().indexOf(value.toLowerCase()) === -1)) {
            result = [];
        } else {
            result = this.props.userStore.userentity.items;
        }
        this.setState({ result });
    };

    onCreate = async (e:any)=>{
        debugger;        
        const form = this.props.form;        
        this.props.userStore.filters.firstName =  form.getFieldsValue().firstName;       
        this.props.userStore.filters.lastName =  form.getFieldsValue().lastName;       
        this.props.userStore.filters.emailAddress =  form.getFieldsValue().emailAddress; 
        this.props.userStore.filters.jobCodeId =  form.getFieldsValue().jobCodeId;       
        //this.props.userStore.filters.hiringDateFrom =  form.getFieldsValue().hiringDateFrom?form.getFieldsValue().hiringDateFrom.format("DD/MM/YYYY"):"";
        this.props.userStore.filters.hiringDateFrom =  form.getFieldsValue().hiringDateFrom?form.getFieldsValue().hiringDateFrom.format():"";
        this.props.userStore.filters.hiringDateTo =  form.getFieldsValue().hiringDateTo?form.getFieldsValue().hiringDateTo.format():"";       
        this.props.userStore.filters.roleChangeDateFrom =  form.getFieldsValue().roleChangeDateFrom?form.getFieldsValue().roleChangeDateFrom.format():"";       
        this.props.userStore.filters.roleChangeDateTo =  form.getFieldsValue().roleChangeDateTo?form.getFieldsValue().roleChangeDateTo.format():"";       
        this.props.userStore.filters.status =  form.getFieldsValue().status;
        await this.getAll();        
    };
    handleReset = () => {
        this.props.form.resetFields();
      };
      groupSelect = (value:any,option:any)=> { 
        this.props.userStore.filters.groupId = option?option.key.split("~")[0]:"";
        this.props.userStore.filters.searchOnGroupId = option?option.key.split("~")[1]:"";
    } 
    groupChange = (value:any,option:any)=> { 
        this.props.userStore.filters.groupId = "";
        this.props.userStore.filters.searchOnGroupId = "";
    } 
    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel,  } = this.props;
        const { result } = this.state;
        const children = result.map(item => <Option ></Option>);

        return (
            <Drawer title={'Advanced Filter'} width={320} onClose={onCancel} visible={visible} className="filterpopup">
                <div className="filterBody">
                    <div className="filterForm">
                        <div className="antd-row">
                            <div className="ant-col-24">
                                <div className="clearFilter">
                                    <span className="cleText">Clear all Filters</span>
                                    <span className="cleIcon" onClick={this.handleReset}></span>
                                </div>
                            </div>
                        </div>

                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label>{'FirstName'}  </label>
                                    {getFieldDecorator('firstName')(<Input placeholder='First Name' name="firstName"  />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'LastName'}  </label>
                                    {getFieldDecorator('lastName')(<Input placeholder='Last Name' name="lastName"  />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Email'}  </label>
                                    {getFieldDecorator('emailAddress')(<Input placeholder='Email Address' />)}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Group'}</label>
                                    <AutoComplete placeholder="Group 1/ Group 2/ Group 3" onSelect={this.groupSelect}   onSearch={this.handleAutoSearch}>
                                                {children}
                                            </AutoComplete>
                                   
                                    {/* <Input placeholder='Group 1/ Group 2/ Group 3' name="groupId" /> */}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Job Code'}</label>
                                    {getFieldDecorator('jobCodeId')(<Input placeholder='Job Code' />)}
                                    {/* <Input placeholder='Job Code' /> */}
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Hiring Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li> 
                                            {getFieldDecorator('hiringDateFrom')(<DatePicker placeholder='Hiring Date' />)}
                                                {/* <DatePicker placeholder='Hiring Date' /> */}
                                                </li>
                                            <li className="width10per">To</li>
                                            <li> {getFieldDecorator('hiringDateTo')(<DatePicker placeholder='Hiring Date' />)}</li>
                                            {/* <li> <DatePicker placeholder='Hiring Date' /></li> */}
                                        </ul>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <label className="floatleft">{'Role Change Date'}</label>
                                    <div>
                                        <ul className="filterdatelist">
                                            <li> 
                                            {getFieldDecorator('roleChangeDateFrom')(<DatePicker placeholder='Role Change Date' />)}
                                                {/* <DatePicker placeholder='Role Change Date' /> */}
                                                </li>
                                            <li className="width10per">To</li>
                                            <li> 
                                            {getFieldDecorator('roleChangeDateTo')(<DatePicker placeholder='Role Change Date' />)}
                                                {/* <DatePicker placeholder='Role Change Date' /> */}
                                            </li>
                                        </ul>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                        <div className="antd-row">
                            <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                <FormItem>
                                    <div><label>{'Status'}</label></div>
                                    <div className="switchbutton">
                                        <label className="mr8">{'Active'}</label>  
                                        {getFieldDecorator('status')(<Switch />)} 
                                          <label className="ml8">{'Inactive'}
                                         </label>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                    <div className="buttonfooter">
                        <div className="bulkImpFooter">
                            <div className="antd-row">
                                <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                                    <div className="filterFooter">
                                        <Button onClick={this.onCreate} type="primary">Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(UserFilter);
