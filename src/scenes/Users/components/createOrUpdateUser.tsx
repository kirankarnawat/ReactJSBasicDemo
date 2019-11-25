import * as React from 'react';
import { Form, Tabs, Drawer, Button} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import UserEntitydata from './userEntityData';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';
import UserEntityTree from './userEntityTree';
const TabPane = Tabs.TabPane;
//#region Local State and Property
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
    autoDataRef: GetUserEntityListResponse[];
    onGroupSelect: (option: any) => void;
    onGroupChange: () => void;
    onHandleAutoSearch: (value: string) => void;
}
class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {
    render() {
        const { visible, onCancel, onCreate, onGroupSelect, onGroupChange, onHandleAutoSearch, autoDataRef } = this.props;
        return (
            <Drawer title={'Add/Edit User'} width={560} onClose={onCancel} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="sysId">system ID: 00006</div>
                        <div className="pos">

                            {<div><UserEntityTree
                                autoDataRef={autoDataRef}
                                onGroupSelect={onGroupSelect}
                                onGroupChange={onGroupChange}
                                onHandleAutoSearch={onHandleAutoSearch}
                            /></div>}
                            <div><UserEntitydata /> </div>
                        </div>

                        <div className="buttonfooter">
                            <div className="antd-row">
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                                    <div className="bulkImpFooter">
                                        <ul className="bulkImpListing">
                                            <li>
                                                <Button onClick={onCreate} className="ant-btn-primary" type="primary">Submit</Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={''} key={''}>

                        {/* <FormItem>
                            {getFieldDecorator('roleNames', { valuePropName: 'value' })(<CheckboxGroup options={options} />)}
                        </FormItem> */}
                    </TabPane>
                </Tabs>



            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(CreateOrUpdateUser);

