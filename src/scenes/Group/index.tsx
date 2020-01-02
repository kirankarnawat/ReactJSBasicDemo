
import * as React from 'react';

import { Tabs, Col, Row, Card } from 'antd';

import { inject, observer } from 'mobx-react';

import GroupHierarchy from '../Group/components/groupHierarchy';
import GroupSystemRole from '../Group/components/groupSystemRole';

import Stores from '../../stores/storeIdentifier';
import GroupStore from '../../stores/groupStore';
import commonconst from '../../lib/commonconst';

const TabPane = Tabs.TabPane;

export interface IGroupProps {
    groupStore: GroupStore;
}


@inject(Stores.GroupStore)
@observer
class MainGroupContent extends React.Component<IGroupProps> {  

    // start up event
    async componentDidMount() {

        await this.props.groupStore.getLevelMasterData({ LookupType: commonconst.LOOKUPS.LEVELMASTER });

        await this.props.groupStore.getGroupLookups();

        await this.props.groupStore.getAllGroup1Data();
    }

    render() {

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