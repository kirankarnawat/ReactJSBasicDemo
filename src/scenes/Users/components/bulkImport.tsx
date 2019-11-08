import * as React from 'react';

import { Form,  Drawer, Upload,Row,Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';

const { Dragger } = Upload;

export interface ICreateOrUpdateUserProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    onCreate: () => void;
    roles: GetRoles[];
}

const uploadprops = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  };

class BulkImport extends React.Component<ICreateOrUpdateUserProps> {
    state = {
        confirmDirty: false,
    };

    render() {
        const { visible, onCancel } = this.props;
        return (
            <Drawer title={'Bulk Import'} width={560} onClose={onCancel} visible={visible}>
                    <div className="bulkUpload">
                        <div className="pos">
                    <Dragger {...uploadprops}>
                    <p className="hintText">Drag and Drop the xl sheet here</p>
                    <div className="decorated"><span>Or</span></div>
                    <button type="submit" className="ant-btn ant-btn-default">Browse</button>
                    </Dragger>
                    <Row className="antd-row">
                    <Col xs={{ span:24}} sm={{ span:24}} md={{ span:24}} lg={{ span:24}}>
                    <div className="downloadTemp">
                     <button type="submit" className="ant-btn ant-btn-primary">Download Template</button>
                      </div>
                      </Col>
                      </Row>
                     </div>
                      <Row className="antd-row">
                    <Col xs={{ span:24}} sm={{ span:24}} md={{ span:24}} lg={{ span:24}}>
                      <div className="buttonfooter">
                            <div className="bulkImpFooter">
                                <ul className="bulkImpListing">
                                    <li>
                                        <button type="submit" className="ant-btn ant-btn-primary">Submit</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </Col>
                      </Row>
                    </div>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateUserProps>()(BulkImport);
