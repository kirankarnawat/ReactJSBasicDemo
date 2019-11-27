import * as React from 'react';
import { Form, Input, Button, Drawer, Row, Col } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;

}
class ResetPassword extends React.Component<ICreateOrUpdateUserProps> {
    render() {
        const { visible, onCancel } = this.props;
        const { onCreate } = this.props;
        return (
            <Drawer title={'Reset Password'} width={300} onClose={onCancel} visible={visible}>
                <div className="successMsg"><div className="successText"><div className="heading"><h3>User created successfully</h3></div></div><div className="ant-clearfix"></div></div>
                <div className="mt20">
                <Row className="antd-row">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <FormItem>
                            <label>{'New Password'} <span className="start">*</span> </label>
                            <Input placeholder='New Password' />
                        </FormItem>
                    </Col>
                </Row>
                <Row className="antd-row">
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <FormItem>
                            <label>{'Confirm Password'} <span className="start">*</span> </label>
                            <Input placeholder='Confirm Password' />
                        </FormItem>
                    </Col>
                </Row>
                <div className="btnfooterContainer">
                    <div className="antd-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <ul className="bulkImpListing">
                                <li>
                                    <Button onClick={onCreate} className="ant-btn-primary" type="primary">Submit</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </Drawer>
        )
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(ResetPassword);