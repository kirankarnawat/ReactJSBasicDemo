
import * as React from 'react';

import { Form, Tabs, Drawer } from 'antd';

import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';
import CourseInformation from '../components/courseInformation'

import CourseKeywords from '../components/courseKeywords'

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
        changestate: false,
        disableTab: this.props.id === "" ? true : false
    };

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({ ...this.state, changestate: true, disableTab: this.props.id === "" ? true : false });
            }
        }
    }

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ ...this.state, changestate: false, disableTab: true });
    }

    onHandleKeword = () => {
        this.setState({ ...this.state, disableTab: false  })
    }


    render() {

        if (this.props.contentrepositoryStore.coursecategory === undefined) return (<div></div>);

        const { visible } = this.props;

        return (

            <Drawer title={'Add/Edit SCORM Content'} width={600} destroyOnClose={true} onClose={this.onHanleResetForm} visible={visible}>

                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>

                    <TabPane tab={'Course Information'} key={'UserInformation'}>
                        <CourseInformation id={this.props.id} handleKeyword={this.onHandleKeword} />
                    </TabPane>

                    <TabPane tab={'Keywords'} key={'Keywords'} disabled={this.state.disableTab} >
                        <CourseKeywords id={this.props.id} />
                    </TabPane>

                </Tabs>

            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateCourseProps>()(CreateOrUpdateCourse);

