import * as React from 'react';

import { Col, Input, Row, Tag, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';

import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';


export interface IContentrepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

export interface ICourseInformationState {

}

export interface ICourseKeywordsProps extends FormComponentProps {
  
}


@inject(Stores.ContentRepositoryStore)
@observer
class CourseKeywords extends React.Component<ICourseKeywordsProps, ICourseInformationState>
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
                                <Tag closable >Bloodbrone</Tag>
                                <Tag closable >Pathogen</Tag>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>

        )
    };
}


export default Form.create<ICourseKeywordsProps>()(CourseKeywords);
