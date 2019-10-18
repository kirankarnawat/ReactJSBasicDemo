import * as React from 'react';

import { Checkbox, Form, Input, Tabs, Drawer, Button } from 'antd';

import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import rules from './createOrUpdateUser.validation';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateUserProps extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  roles: GetRoles[];
}

class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {
  state = {
    confirmDirty: false,
  };

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

  render() {
    const { roles } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, onCreate } = this.props;

    const options = roles.map((x: GetRoles) => {
      var test = { label: x.displayName, value: x.normalizedName };
      return test;
    });

    return (
<Drawer  title={'User'} width={720}  onClose={onCancel} visible={visible}>
     
        <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
          <TabPane tab={'User'} key={'user'}>
            <FormItem label={'Name'} {...formItemLayout}>
              {getFieldDecorator('name', { rules: rules.name })(<Input />)}
            </FormItem>
            <FormItem label={'Surname'} {...formItemLayout}>
              {getFieldDecorator('surname', { rules: rules.surname })(<Input />)}
            </FormItem>
            <FormItem label={'UserName'} {...formItemLayout}>
              {getFieldDecorator('userName', { rules: rules.userName })(<Input />)}
            </FormItem>
            <FormItem label={'Email'} {...formItemLayout}>
              {getFieldDecorator('emailAddress', { rules: rules.emailAddress })(<Input />)}
            </FormItem>
            {this.props.modalType === 'edit' ? (
              <FormItem label={'Password'} {...formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
            ) : null}
            {this.props.modalType === 'edit' ? (
              <FormItem label={'ConfirmPassword'} {...formItemLayout}>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'ConfirmPassword',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
            ) : null}
            <FormItem label={'IsActive'} {...tailFormItemLayout}>
              {getFieldDecorator('isActive', { valuePropName: 'checked' })(<Checkbox>Aktif</Checkbox>)}
            </FormItem>
          </TabPane>
          <TabPane tab={'Roles'} key={'rol'}>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('roleNames', { valuePropName: 'value' })(<CheckboxGroup options={options} />)}
            </FormItem>
          </TabPane>
        </Tabs>
        
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onCreate} type="primary">
              Submit
            </Button>

      </Drawer>
    );
  }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);
