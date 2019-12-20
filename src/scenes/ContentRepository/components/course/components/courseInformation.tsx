import * as React from 'react';

import { Upload, Col, Icon, Input, Select, Row, DatePicker, Switch } from 'antd';
const { Dragger } = Upload;
import FormItem from 'antd/lib/form/FormItem';

class CourseInformation extends React.Component {

    render() {
        const { Option } = Select;
        const { TextArea } = Input;
        function onChange(date, dateString) {
            console.log(date, dateString);
        }
        return (
            <div className="pos">
                <Row className="antd-row">
                    <Col xs={{ span: 16 }} sm={{ span: 16 }} md={{ span: 16 }} lg={{ span: 16 }}>
                        <FormItem>
                            <label>{'Category'} <span className="start">*</span> </label>
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <label>{'Title'} <span className="start">*</span> </label>
                            <Input placeholder="Title" />
                        </FormItem>
                        <FormItem>
                            <label>{'Description'} <span className="start">*</span> </label>
                            <TextArea rows={4} style={{ height: 117 }} />
                        </FormItem>

                    </Col>
                    <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}>
                        <FormItem>
                            <label>{'Course ID'} <span className="start">*</span> </label>
                            <Input placeholder="Course ID" />
                        </FormItem>
                        <FormItem>
                            <div className="switchbutton">
                                <div><label>{'Show Header Image'} </label></div>
                                <label className="mr8">{'No'}</label>
                                <Switch />
                                <label className="ml8">{'Yes'}</label>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Col className="bulkUpload">
                                <label>{'Banner '} <span className="start">*</span> </label>
                                <Dragger style={{ height: 100 }}>
                                    <p className="hintText"><Icon type="paper-clip" /> <span className="coloraddfile">Add file </span> or drop file here</p>
                                </Dragger>
                                <div className="noteText mt10">Note: - Dimensions should not exceed - 260 X 130 pixels.</div>
                            </Col>
                        </FormItem>
                    </Col>
                </Row>
                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <FormItem>
                            <Col className="bulkUpload">
                                <label>{'Upload (upto 500 MB) '} <span className="start">*</span> </label>
                                <Dragger>
                                    <p className="hintText"><Icon type="paper-clip" /> <span className="coloraddfile">Add file </span> or drop file here</p>
                                </Dragger>
                                <div className="noteText mt10">Note: - Upload one Zip file (upto 700 MB) as your SCORM Content.</div>
                            </Col>
                        </FormItem>
                        <FormItem>
                            <ul className="Coursecontrollist">
                                <li>
                                    <div><label>{'Contact Hours'} <span className="start">*</span> </label></div>
                                    <Input addonAfter="Hr" className="mr8" style={{ width: 100 }} />
                                    <Input addonAfter="Min" style={{ width: 100 }} />
                                </li>
                                <li>
                                    <div><label>{'Expiry'} <span className="start">*</span> </label></div>
                                    <DatePicker onChange={onChange} />
                                </li>
                                <li>
                                    <div><label>{'Price'} <span className="start">*</span> </label></div>
                                    <Input addonAfter="$" />
                                </li>

                            </ul>
                        </FormItem>
                    </Col>
                </Row>
                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}>
                        <FormItem>
                            <label>{'Indicate launch preference '} <span className="start">*</span> </label>
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 16 }} lg={{ span: 16 }}>
                        <FormItem>
                            <ul className="Coursecontrollist">
                                <li>
                                    <div className="switchbutton">
                                        <div><label>{'Status'} </label></div>
                                        <label className="mr8">{'Inactive'}</label>
                                        <Switch />
                                        <label className="ml8">{'Active'}</label>
                                    </div>
                                </li>
                                <li><div className="switchbutton">
                                    <div><label>{'Apply Certificate'} </label></div>
                                    <label className="mr8">{'No'}</label>
                                    <Switch />
                                    <label className="ml8">{'Yes'}</label>
                                </div></li>
                                <li>
                                    <div className="switchbutton">
                                        <div><label>{'Include In Catalog'} </label></div>
                                        <label className="mr8">{'No'}</label>
                                        <Switch />
                                        <label className="ml8">{'Yes'}</label>
                                    </div>
                                </li>
                            </ul>

                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    };
}

export default CourseInformation;
