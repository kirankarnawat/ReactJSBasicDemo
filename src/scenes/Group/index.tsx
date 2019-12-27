import * as React from 'react';

import { Tabs,Col, Row,Card } from 'antd';

/*import { inject, observer } from 'mobx-react';
import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';

import { inject, observer } from 'mobx-react';*/
import GroupHierarchy from '../Group/components/hierarchy';
import GroupSystemRole from '../Group/components/systemRole';

const TabPane = Tabs.TabPane;

//#region Local State and Property
export interface IGroupsProps {
    visible: boolean;
    onCancel: () => void;
    modalType: string;
    id: string;
}

/*
export interface IGroupsProps {
    contentrepositoryStore: ContentRepositoryStore;
}

@inject(Stores.ContentRepositoryStore)
@observer
*/

class MainGroupContent extends React.Component<IGroupsProps>
{
    state = {
        changestate: false,
    };

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({ ...this.state, changestate: true });
            }
        }
    }

    onHanleResetForm = async () => {

        await this.props.onCancel();

        this.setState({ ...this.state, changestate: false });
    }

    render() {

        //if (this.props.contentrepositoryStore.coursecategory === undefined) return (<div></div>);

       // const { visible } = this.props;

        return (
            <Card>
            <div>
                <div className="contentHeader">
                    <div className="conHeader">
                        <Row className="antd-row">
                            <Col className="floatleft"
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 24 }}
                                lg={{ span: 12 }}>
                                <div className="heading">
                                    <h2>Manage Groups</h2>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                
                    <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
                        <TabPane tab={'Hierarchy'} key={'UserInformation'}>
                            <GroupHierarchy />
                        </TabPane>

                        <TabPane tab={'System Role'} key={'System Role'}>
                            <GroupSystemRole />
                        </TabPane>
                    </Tabs>
                
            </div>
            </Card>
        );
    }
}

export default MainGroupContent