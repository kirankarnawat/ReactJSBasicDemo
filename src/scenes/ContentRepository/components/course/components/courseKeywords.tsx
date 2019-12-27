import * as React from 'react';

import { Col, Input, Row, Tag, Form, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';

import { inject, observer } from 'mobx-react';
import commonconst from '../../../../../lib/commonconst';

import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';


export interface IContentrepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

export interface ICourseKeywordsProps extends FormComponentProps {
    id: string;
}


@inject(Stores.ContentRepositoryStore)
@observer
class CourseKeywords extends React.Component<IContentrepositoryProps & ICourseKeywordsProps>
{

    onHandleAddTag = async (event) => {

        this.props.form.validateFields(async (err: any, values: any) => {

            if (err) { return; }
            else {

                var res = await this.props.contentrepositoryStore.addCourseKeyword({
                    courseId: this.props.contentrepositoryStore.courseById.courseId, creatorName: this.props.contentrepositoryStore.userid,
                    keyWord: event.target.value, requesterUserId: this.props.contentrepositoryStore.userid
                });

                (res) ? message.success(commonconst.MESSAGES.KEYWORDADDSUCCESS) : message.error(commonconst.MESSAGES.COMMONERROR);

                this.props.form.resetFields();
            }
        });
    }

    onHandleRemoveTag = async (value: string) => {

        var res = await this.props.contentrepositoryStore.removeCourseKeyword({ id: value });

        (res) ? message.success(commonconst.MESSAGES.KEYWORDDELSUCCESS) : message.error(commonconst.MESSAGES.COMMONERROR);
    }

    handleDataExists = async (rule, value, callback) => {

        if (value) {

            var res = await this.props.contentrepositoryStore.checkIsCourseKeywordInUse({ CourseId: this.props.contentrepositoryStore.courseById.courseId, Keyword: value });

            (res === 'true') ? callback() : callback(commonconst.MESSAGES.KEYWORDEXISTS);
        }
        else {
            callback('Required')
        }
    }

    render() {

        if (this.props.contentrepositoryStore.courseById === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;
        const { courseById } = this.props.contentrepositoryStore;

        const child = courseById.listCourseMasterKeyWord.map(items => <Tag key={items.courseKeyWordId} closable onClose={() => this.onHandleRemoveTag(items.courseKeyWordId)}>{items.keyWord}</Tag>)

        return (
            <div>
                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <FormItem>
                            <label>{'Add Keyword'} <span className="start">*</span> </label>
                            {getFieldDecorator('keyword', { initialValue: '', rules: [{ validator: this.handleDataExists }] })(<Input placeholder="Add Keyword" onPressEnter={this.onHandleAddTag} />)}
                        </FormItem>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <FormItem>
                            <label>{'Add Keyword'} <span className="start">*</span> </label>
                            <div className="tagsBox">
                                {child}
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    };
}


export default Form.create<ICourseKeywordsProps>()(CourseKeywords);
