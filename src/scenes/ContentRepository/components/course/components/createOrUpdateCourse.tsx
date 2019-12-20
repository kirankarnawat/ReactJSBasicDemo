
import * as React from 'react';

import { Form, Tabs, Drawer } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';


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
                this.setState({...this.state, showsearch: false });
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
            <Drawer title={'Add/Edit Course'} width={560} onClose={this.onHanleResetForm} visible={visible}>
                <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                    <TabPane tab={'User Information'} key={'UserInformation'}>
                        <div className="pos">
                            
                        </div>
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

export default Form.create<ICreateOrUpdateCourseProps>()(CreateOrUpdateCourse);

