
import * as React from 'react';

import { Form, Tabs, Drawer,Button } from 'antd';



import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';
import CourseInformation from '../components/courseInformation'

const TabPane = Tabs.TabPane;


//#region Local State and Property
export interface ICreateOrUpdateCourseProps extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    id: string;
}

export interface IContentRepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}


@inject(Stores.ContentRepositoryStore)
@observer
class CreateOrUpdateCourse extends React.Component<IContentRepositoryProps & ICreateOrUpdateCourseProps> {

    state = {
        showkeyword: false,
    };

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({ ...this.state, showsearch: false });
            }
        }
    }

    onHanleResetForm = async () => {

        await this.props.onCancel();

        //this.setState({ ...this.state, showsearch: true, groupid: '' });
    }


    render() {

        const { visible } = this.props;
        

        return (
            <Drawer title={'Add/Edit SCORM Content'} width={600} onClose={this.onHanleResetForm} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'Course Information'} key={'UserInformation'}>
                        <CourseInformation />
                        <div className="buttonfooter">
                            <div className="antd-row">
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                                    <div className="bulkImpFooter">
                                        <ul className="bulkImpListing">
                                            <li>
                                                <Button type="primary">Submit</Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={'KeyWords'} key={'KeyWords'}>

                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateCourseProps>()(CreateOrUpdateCourse);

