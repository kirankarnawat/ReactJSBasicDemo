
import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Upload, Col, Icon, Input, Select, Row, DatePicker, Switch, Button, Form, message, InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';
import { FormComponentProps } from 'antd/lib/form';

import moment from 'moment';
import commonconst from '../../../../../lib/commonconst';
import AppConsts from '../../../../../lib/appconst';

import rules from './courseInformation.validation';

const { Dragger } = Upload;

const { Option } = Select;

const { TextArea } = Input;

const dateFormat = AppConsts.dateFormat;

export interface IContentrepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

export interface ICourseInformationProp extends FormComponentProps {
    id: string;
}

export interface ICourseInformationState {

    isSuccessMsgShow: boolean;
    successMsg: string;
    isShowHeaderImg: boolean;
    isAllDisable: boolean;
}

const uploadimgprops = {

    name: 'imgfile',
    accept: '.png,.jpg,.jpeg,.bmp,.gif',
    multiple: false,

    onChange(info) {

        const { status } = info.file;

        if (status === 'done') {

            message.success(`${info.file.name} file uploaded successfully.`);
        }
        else if (status === 'error') {

            message.warning(`${info.file.name} file is set for upload.`);
        }
    },
};

const uploadzipprops = {

    name: 'zipfile',
    accept: '.zip',
    multiple: false,

    onChange(info) {

        const { status } = info.file;

        if (status === 'done') {

            message.success(`${info.file.name} file uploaded successfully.`);
        }
        else if (status === 'error') {

            message.warning(`${info.file.name} file is set for upload.`);
        }
    },
};

@inject(Stores.ContentRepositoryStore)
@observer
class CourseInformation extends React.Component<IContentrepositoryProps & ICourseInformationProp, ICourseInformationState> {

    constructor(props) {

        super(props);

        this.state = {
            isSuccessMsgShow: false,
            successMsg: '',
            isShowHeaderImg: (this.props.contentrepositoryStore.courseById) ? this.props.contentrepositoryStore.courseById.showCourseHeaderImage : false,
            isAllDisable: false,
        };
    }

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.id !== prevProps.id) {
            if (this.props.id !== "") {
                this.setState({
                    ...this.state, isSuccessMsgShow: false, isAllDisable: false, successMsg: '', isShowHeaderImg: this.props.contentrepositoryStore.courseById.showCourseHeaderImage
                });
            }
        }
    }

    onBeforeUploadImg(info) {

        const isImg = info.type === "image/jpg" || info.type === "image/jpeg" || info.type === "image/png" || info.type === "image/gif" || info.type === "image/bmp";
        if (!isImg) {
            message.error('You can only upload image file!');
        }
        return isImg;
    }


    onBeforeUploadZip(info) {

        const isZip = info.type === "application/x-zip-compressed";
        if (!isZip) {
            message.error('You can only upload zip file!');
        }
        return isZip;
    }


    handleDataExists = async (rule, value, callback) => {

        await this.props.contentrepositoryStore.checkIsCourseNameInUse({ CourseId: this.props.contentrepositoryStore.courseById.courseId, CourseName: value });

        (this.props.contentrepositoryStore.courseExists === 'true') ? callback() : callback('Course name is already exist');
    }

    handleChange = () => {
        this.setState({ ...this.state, isAllDisable: false, isSuccessMsgShow: false, successMsg: '' })
    }

    handleHeaderImgChange = (checked: boolean, event: Event) => {

        console.log(checked);
        this.setState({ ...this.state, isAllDisable: false, isSuccessMsgShow: false, successMsg: '', isShowHeaderImg: checked });
    }

    handleAllEnable = () => {
        this.setState({ ...this.state, isAllDisable: false });
    }

    disabledDate = (current) => {
        return current < moment().endOf('day');
    }

    //ADD EDIT COURSE DATA
    handleCreate = () => {
        this.props.form.validateFields(async (err: any, values: any) => {
            debugger;
            if (err) { return; }
            else {

                debugger;

                var cntzip = (values["uploadedFile"] && values["uploadedFile"].fileList.length > 0) ? values["uploadedFile"].fileList.length : -1;
                var cntimg = (values["headerImage"] && values["headerImage"].fileList.length > 0) ? values["headerImage"].fileList.length : -1;

                var res = await this.props.contentrepositoryStore.uploadCourse({ courseId: this.props.id, uploadedFile: (cntzip === -1) ? null : values["uploadedFile"].fileList[cntzip - 1].originFileObj, uploadedHeaderImage: (cntimg === -1) ? null : values["headerImage"].fileList[cntimg - 1].originFileObj });

                if (res.courseId !== null) {

                    var headerFileName = (cntimg === -1) ? '' : values["headerImage"].fileList[cntimg - 1].originFileObj.name;
                    var headerExisting = this.props.contentrepositoryStore.courseById.courseHeaderImage;

                    var filename = (headerFileName) ? headerFileName : (headerExisting ? headerExisting : '');

                    await this.props.contentrepositoryStore.addeditCourse({ courseId: res.courseId, requesterUserId: this.props.contentrepositoryStore.userid, courseHeaderImage: filename, ...values });

                    this.setState({ isAllDisable: true, successMsg: (this.props.id === '') ? commonconst.MESSAGES.COURSEADDSUCCESS : commonconst.MESSAGES.COURSEEDITSUCCESS, isSuccessMsgShow: true });
                }
                else {
                    message.error(res.errorMessage);
                }
            }
        });
    };

    render() {

        if (this.props.contentrepositoryStore.courseById === undefined) return (<div></div>);

        const { getFieldDecorator } = this.props.form;
        const { courseById } = this.props.contentrepositoryStore;

        const childrencat = this.props.contentrepositoryStore.coursecategory.map(item => <Option key={item.courseCategoryId}>{item.courseCategoryName}</Option>);
        const childrenHH = this.props.contentrepositoryStore.courseDurationHH.map(item => <Option key={item.lookUpValue}>{item.lookUpName}</Option>);
        const childrenMM = this.props.contentrepositoryStore.courseDurationMM.map(item => <Option key={item.lookUpValue}>{item.lookUpName}</Option>);
        const childrenLaunch = this.props.contentrepositoryStore.courseLaunchPreference.map(item => <Option key={item.lookUpValue}>{item.lookUpName}</Option>);

        return (

            <div className="pos">

                <Row className={(this.state.isSuccessMsgShow) ? 'antd-row mb10' : 'antd-row mb10 hidden'} >
                    <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
                        <div className="successMsg">
                            <div className="successText">
                                <div className="heading">
                                    <h3>{this.state.successMsg}</h3>
                                </div>
                            </div>
                            <div className="ant-clearfix"></div>
                        </div>
                    </Col>
                </Row>

                <div>
                    <span className={this.state.isAllDisable === true ? 'floatRight' : 'floatRight hidden'}><a className="editEntityIcon" onClick={this.handleAllEnable}></a></span>
                </div>

                <Row className="antd-row">

                    <Col xs={{ span: 16 }} sm={{ span: 16 }} md={{ span: 16 }} lg={{ span: 16 }}>

                        <FormItem>
                            <label>{'Category'} <span className="start">*</span> </label>
                            {getFieldDecorator('courseCategoryId', { initialValue: courseById.courseCategoryId, rules: rules.courseCategoryId })(
                                <Select showSearch placeholder="Select category" onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''}>
                                    {childrencat}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem>
                            <label>{'Title'} <span className="start">*</span> </label>
                            {getFieldDecorator('courseName', { initialValue: courseById.courseName, rules: [{ required: true, message: 'Course title is required!' }, { validator: this.handleDataExists }] })(<Input placeholder="Title" onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''} />)}
                        </FormItem>

                        <FormItem>
                            <label>{'Description'} </label>
                            {getFieldDecorator('courseDescription', { initialValue: courseById.courseDescription })(<TextArea rows={4} style={{ height: 117 }} onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''} />)}
                        </FormItem>

                    </Col>

                    <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}>

                        <FormItem>
                            <label>{'Course ID'} <span className="start">*</span> </label>
                            {getFieldDecorator('courseUniqueId', { initialValue: courseById.courseUniqueId, rules: rules.courseUniqueId })
                                (

                                <InputNumber
                                    size="small"
                                    placeholder="Course ID"
                                    min={0}
                                    maxLength={3}
                                    precision={0}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => (value !== undefined) ? value.replace(/\$\s?|(,*)/g, '') : 0}
                                    onChange={this.handleChange}
                                    className={this.state.isAllDisable ? 'disabled' : ''}
                                />
                                )
                            }
                        </FormItem>

                        <FormItem>
                            <div className="switchbutton">
                                <div><label>{'Show Header Image'} </label></div>
                                <label className="mr8">{'No'}</label>
                                {getFieldDecorator('showCourseHeaderImage', { initialValue: courseById.showCourseHeaderImage, valuePropName: "checked" })(<Switch onChange={this.handleHeaderImgChange} className={this.state.isAllDisable ? 'disabled' : ''} />)}
                                <label className="ml8">{'Yes'}</label>
                            </div>
                        </FormItem>

                        <FormItem>
                            <Col className="bulkUpload">

                                <label>{'Banner '} <span className={(this.state.isShowHeaderImg) ? "start" : "start hidden"}>*</span> </label>

                                {getFieldDecorator('headerImage', { rules: (this.state.isShowHeaderImg && !courseById.courseHeaderImage ) ? rules.headerImage : rules.norequired })
                                    (
                                    <Dragger {...uploadimgprops} beforeUpload={this.onBeforeUploadImg} style={{ height: 100 }} className={this.state.isAllDisable ? 'disabled' : ''}                                    >
                                        <p className="hintText"><Icon type="paper-clip" /> <span className="coloraddfile">Add file </span> or drop file here</p>
                                    </Dragger>
                                    )
                                }

                                <span className={(courseById.courseHeaderImage) ? "noteText" : "noteText hidden"}>
                                    <a href={courseById.courseHeaderImage} target="_blank">{"view image"}</a>
                                </span>

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

                                {getFieldDecorator('uploadedFile', { rules: (this.props.id === '') ? rules.uploadedFile : rules.norequired })
                                    (
                                    <Dragger {...uploadzipprops} beforeUpload={this.onBeforeUploadZip} className={this.state.isAllDisable ? 'disabled' : ''}>
                                        <p className="hintText"><Icon type="paper-clip" /> <span className="coloraddfile">Add file </span> or drop file here</p>
                                    </Dragger>
                                    )
                                }

                                <div className="noteText mt10">Note: - Upload one Zip file (upto 700 MB) as your SCORM Content.</div>
                            </Col>
                        </FormItem>


                        <ul className="Coursecontrollist">

                            <li>
                                <div><label>{'Contact Hours'} <span className="start">*</span> </label></div>

                                <FormItem>
                                    <span>
                                        {getFieldDecorator('courseDurationHH', { initialValue: courseById.courseDurationHH, rules: rules.courseDurationHH })
                                            (
                                            <Select showSearch placeholder="Select Hr" style={{ width: 100 }} onChange={this.handleChange} className={this.state.isAllDisable ? 'mr8 disabled' : 'mr8'}>
                                                {childrenHH}
                                            </Select>
                                            )
                                        }
                                    </span>
                                </FormItem>

                                <FormItem>
                                    <span>

                                        {getFieldDecorator('courseDurationMM', { initialValue: courseById.courseDurationMM, rules: [{ required: true, message: 'Course duration(in Min) is required' }] })
                                            (
                                            <Select showSearch placeholder="Select Min" style={{ width: 100 }} onChange={this.handleChange} className={this.state.isAllDisable ? 'mr8 disabled' : 'mr8'}>
                                                {childrenMM}
                                            </Select>
                                            )
                                        }
                                    </span>
                                </FormItem>

                            </li>

                            <li>
                                <FormItem>
                                    <div><label>{'Expiry'} </label></div>

                                    {getFieldDecorator('expiryDate', { initialValue: (courseById.expiryDate !== null ? moment(courseById.expiryDate, dateFormat) : undefined) })
                                        (
                                        <DatePicker format={dateFormat} disabledDate={this.disabledDate} placeholder='Expiry Date' name="expiryDate" onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''} />
                                        )
                                    }
                                </FormItem>
                            </li>

                            <li>
                                <FormItem>
                                    <div><label>{'Price'} </label></div>

                                    {getFieldDecorator('coursePrice', { initialValue: courseById.coursePrice })
                                        (

                                        <InputNumber
                                            size="small"
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => (value !== undefined) ? value.replace(/\$\s?|(,*)/g, '') : 0}
                                            onChange={this.handleChange}
                                            className={this.state.isAllDisable ? 'disabled' : ''}
                                        />

                                        )
                                    }
                                </FormItem>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Row className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}>
                        <FormItem>
                            <label>{'Indicate launch preference '} <span className="start">*</span> </label>

                            {getFieldDecorator('launchPreference', { initialValue: courseById.launchPreference, rules: rules.launchPreference })
                                (

                                <Select showSearch placeholder="Select launch preference" onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''}>
                                    {childrenLaunch}
                                </Select>

                                )
                            }
                        </FormItem>
                    </Col>

                    <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 16 }} lg={{ span: 16 }}>


                        <ul className="Coursecontrollist">

                            <FormItem>
                                <li>
                                    <div className="switchbutton">
                                        <div><label>{'Status'} </label></div>
                                        <label className="mr8">{'Inactive'}</label>
                                        {getFieldDecorator('status', { initialValue: courseById.status, valuePropName: "checked" })
                                            (
                                            <Switch onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''} />
                                            )
                                        }
                                        <label className="ml8">{'Active'}</label>
                                    </div>
                                </li>
                            </FormItem>

                            <FormItem>
                                <li>
                                    <div className="switchbutton">
                                        <div><label>{'Apply Certificate'} </label></div>
                                        <label className="mr8">{'No'}</label>
                                        {getFieldDecorator('isPrintCertificate', { initialValue: courseById.isPrintCertificate, valuePropName: "checked" })
                                            (
                                            <Switch onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''} />
                                            )
                                        }
                                        <label className="ml8">{'Yes'}</label>
                                    </div>
                                </li>
                            </FormItem>

                            <FormItem>
                                <li>
                                    <div className="switchbutton">
                                        <div><label>{'Include In Catalog'} </label></div>
                                        <label className="mr8">{'No'}</label>
                                        {getFieldDecorator('isInCatalog', { initialValue: courseById.isInCatalog, valuePropName: "checked" })
                                            (
                                            <Switch onChange={this.handleChange} className={this.state.isAllDisable ? 'disabled' : ''} />
                                            )
                                        }
                                        <label className="ml8">{'Yes'}</label>
                                    </div>
                                </li>
                            </FormItem>
                        </ul>
                    </Col>
                </Row>
                <div className="buttonfooter">
                    <div className="antd-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="bulkImpFooter">
                                <ul className="bulkImpListing">
                                    <li>
                                        <Button type="primary" onClick={this.handleCreate} className={this.state.isAllDisable ? 'ant-btn-primary disabled' : 'ant-btn-primary'}>Submit</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Form.create<ICourseInformationProp>()(CourseInformation);
