import * as React from 'react';

import { Col, Input, Row, Tag } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

// import { inject, observer } from 'mobx-react';




// @inject(Stores.ContentRepositoryStore)
// @observer



export interface IContentrepositoryProps {
    //contentrepositoryStore: ContentRepositoryStore;
}

export interface ICourseInformationState {

}
function log(e) {
    console.log(e);
  }

class KeyWords extends React.Component<IContentrepositoryProps, ICourseInformationState>
{

    render() {
        return (
            <div>
                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <FormItem>
                            <label>{'Add Keyword'} <span className="start">*</span> </label>
                            <Input placeholder="Add Keyword" />
                        </FormItem>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <FormItem>
                            <label>{'Add Keyword'} <span className="start">*</span> </label>
                            <div className="tagsBox">
                                <Tag closable  onClose={log}>Bloodbrone</Tag>
                                <Tag closable  onClose={log}>Pathogen</Tag>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>

        )
    };
}


export default KeyWords;
