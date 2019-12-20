
// #region
import * as React from 'react';

import { Card, Col, Row, Table, Icon } from 'antd';
import { inject, observer } from 'mobx-react';

import Stores from '../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../stores/contentrepositoryStore';

import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { GetAllCourseResponse } from '../../../../services/contentrepository/dto/Response/getAllCourseResponse';

import AppConsts from '../../../../lib/appconst';
import { EntityDto } from '../../../../services/dto/entityDto';

import CourseQuickFilter from './components/courseQuickFilter';
import CreateOrUpdateCourse from './components/createOrUpdateCourse';

// #endregion

// #region Local State and Property
export interface IContentRepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

export interface ICourseState {
    modalVisible: boolean;
    courseId: string,
    courses: PagedResultDto<GetAllCourseResponse>;

}

const pagesize = AppConsts.pagesize;

// #endregion


@inject(Stores.ContentRepositoryStore)
@observer
class Course extends React.Component<IContentRepositoryProps, ICourseState > {

    constructor(props) {

        super(props);

        this.state = {

            modalVisible: false,
            courseId:'',
            courses: { items: [], totalCount: 0 }
        };
    }

    // #region GLOBALS

    createorupdatecourseFormRef: any;
    quickfilterFormRef: any;

    saveCreateOrUpdateCourseFormRef = (formRef: any) => {
        this.createorupdatecourseFormRef = formRef;
    };

    saveQuickfilterFormRef = (formRef: any) => {
        this.quickfilterFormRef = formRef;
    };

    // #endregion    // #region USER MANAGEMENT

    // start up event
    async componentDidMount() {

        await this.props.contentrepositoryStore.initFilter();

        await this.props.contentrepositoryStore.getCourseCategory();

        await this.getAll();
    }

    //get user data
    async getAll() {

        let res = await this.props.contentrepositoryStore.getAllCourses({ ...this.props.contentrepositoryStore.filters });

        this.setState({ ...this.state, courses: res });
    }

    //table management
    handleTableChange = async (pagination: any, filters: any, sorter: any) => {

        if (sorter.order) {
            this.props.contentrepositoryStore.setFilter({
                ...this.props.contentrepositoryStore.filters, sortExp: sorter.field + " " + (sorter.order == "ascend" ? "asc" : "desc")
            });
        }

        this.props.contentrepositoryStore.setFilter({ ...this.props.contentrepositoryStore.filters, pageIndex: pagination.current });

        await this.getAll();
    };

    // search
    handleSearch = async () => {
        await this.getAll();
    }

    // #endregion    // #region MODAL POP

    // show modal
    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    // #endregion


    // #region HANDLE CREATE-EDIT

    //ADD EDIT DRAWER OPEN
    async createOrUpdateCourseModalOpen(entityDto: EntityDto) {

        //let data;

        //if (entityDto.id === '') {
        //    await this.props.userStore.createUser();
        //    data = [];
        //} else {
        //    debugger;
        //    await this.props.userStore.getUserById({ userId: entityDto.id, requesterUserId: this.props.userStore.userid });
        //    let res = await this.props.userStore.getEntityList({ SearchPhrase: '', RequesterUserId: this.props.userStore.userid, GroupId: this.props.userStore.userById.groupId });
        //    data = (res !== undefined) ? res.items : [];
        //}

        //await this.props.userStore.getUserJobRoles();

        this.setState({ courseId: entityDto.id});
        this.Modal();
    }


    //ADD EDIT USER DATA
    onHandlecreateOrUpdateModalClose = async () => {

        this.setState({ modalVisible: false, courseId: "" });

        const form = this.createorupdatecourseFormRef.props.form;
        form.resetFields();

        await this.getAll();
    };

    // #endregion

    public render() {

        const { courses } = this.state;

        const columns = [
            {
                title: 'Course Name', dataIndex: 'courseName', sorter: true, key: 'courseName', width: 400, render: (text: string) => <div>{text}</div>
            },
            { title: 'Course Category', dataIndex: 'courseCategoryName', sorter: true, key: 'courseCategoryName', width: 200, render: (text: string) => <div>{text}</div> },
            { title: 'Created On', dataIndex: 'createdDateDisplay', sorter: true, key: 'createdDateDisplay', width: 200, render: (text: string) => <div>{text}</div> },

            {
                title: 'Duration', dataIndex: 'courseDurationHH', sorter: true, key: 'courseDurationHH', width: 200,
                render: (text, row) => {

                    if (row.CourseDurationHH == 0) {
                        return (<div>{(row.courseDurationMM < 9 ? "0" : "") + row.courseDurationMM + " mins"}</div>);
                    }
                    else {
                        return (<div>{(row.CourseDurationHH < 9 ? "0" : "") + row.CourseDurationHH + " hr " + (row.CourseDurationMM < 9 ? "0" : "") + row.CourseDurationMM + " mins"}</div>);
                    }
                }
            },

            {
                title: "Price (in $)" , dataIndex: 'coursePrice', sorter: true, key: 'coursePrice', width: 200, render: (text: string) => <div>{text}</div> },

            {
                title: 'Edit',
                width: 100, dataIndex: 'courseId', key: 'courseId',
                render: (text: string) => (
                    <div>
                        <div className="tablehoverbuttons"> <Icon type="ellipsis" className="ellipsisIcon" />
                            <div className="buttonshover">
                                <div className="editbtn" onClick={() => this.createOrUpdateCourseModalOpen({ id: text })} title="Edit Course"></div>
                            </div>
                        </div>
                    </div>
                ),
            },
        ];


        return (
            <Card>
                <Row>
                    <Col className="contentHeader">
                        <div className="conHeader">
                            <div className="antd-row">
                                <Col className="floatleft"
                                    xs={{ span: 24 }}
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}>

                                    <div className="heading">
                                        <h2>Manage Course</h2>
                                    </div>

                                </Col>
                                <Col className="push"
                                    xs={{ span: 24 }}
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}>
                                    <div className="floatright">
                                        <ul className="headerListing floatleft">
                                            <li className="active"><a href="#" onClick={() => this.createOrUpdateCourseModalOpen({ id: '' })}><span className="text">Add Course</span> <span className="icon iconUser">&nbsp;</span></a></li>
                                        </ul>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="filtercontainer">
                    <div className="conHeader">
                        <div className="tblFilter">
                            <div className="antd-row">
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-8">
                                    <div>
                                        <h6>Showing {courses.totalCount} of {(courses.totalCount > 0) ? courses.items[0].totalCount : 0} entries</h6>
                                    </div>
                                </div>
                                <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-16">
                                    <div className="rightContentdata">
                                        <CourseQuickFilter wrappedComponentRef={this.saveQuickfilterFormRef} handleSearch={this.handleSearch} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Row className="antd-row">
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 24, offset: 0 }}
                        lg={{ span: 24, offset: 0 }}
                        xl={{ span: 24, offset: 0 }}
                        xxl={{ span: 24, offset: 0 }}
                    >
                        <div className="tableContainer table-responsive">
                            <Table
                                rowKey={record => record.courseId}
                                size={'default'}
                                bordered={true}
                                columns={columns}
                                pagination={{ size: 'small', pageSize: pagesize, total: (courses !== undefined && courses.items.length > 0) ? courses.items[0].totalCount : 0, defaultCurrent: 1 }}
                                loading={courses === undefined ? true : false}
                                dataSource={courses === undefined ? [] : courses.items.slice()}
                                onChange={this.handleTableChange}
                                className="table"
                            />
                        </div>
                    </Col>
                </Row>

                <CreateOrUpdateCourse
                    wrappedComponentRef={this.saveCreateOrUpdateCourseFormRef}
                    visible={this.state.modalVisible}
                    onCancel={this.onHandlecreateOrUpdateModalClose}
                    modalType={this.state.courseId === '' ? 'create' : 'edit'}
                    id={this.state.courseId}
                />

            </Card>
        )
    };
}

export default Course;
