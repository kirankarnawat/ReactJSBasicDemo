
// #region
import * as React from 'react';

import { Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

import Stores from '../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../stores/contentrepositoryStore';

// #endregion

// #region Local State and Property
export interface IContentRepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

// #endregion


@inject(Stores.ContentRepositoryStore)
@observer
class Course extends React.Component<IContentRepositoryProps> {

    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col
                        className={'dashboardCard'}
                        xs={{ offset: 1, span: 22 }}
                        sm={{ offset: 1, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        DASHBOARD
          </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Course;
