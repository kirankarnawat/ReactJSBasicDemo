import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import Stores from '../../../../../stores/storeIdentifier';
import ContentRepositoryStore from '../../../../../stores/contentrepositoryStore';

const { Option } = Select;

export interface IContentrepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

export interface ICourseQuickFilterProp extends FormComponentProps {
    handleSearch: () => void;
}

export interface ICourseQuickFilterState {
    switchvalue: boolean;
    namevalue: string;
    categoryvalue: string;
}


@inject(Stores.ContentRepositoryStore)
@observer
class CourseQuickFilter extends React.Component<IContentrepositoryProps & ICourseQuickFilterProp, ICourseQuickFilterState> {

    constructor(props) {

        super(props);

        this.state = {
            switchvalue: true, namevalue: '', categoryvalue: ''
        };
    }

    switchChange = e => {

        this.props.contentrepositoryStore.setFilter({ ...this.props.contentrepositoryStore.filters, status: e.target.checked ? true : false });

        this.setState({ ...this.state, switchvalue: e.target.checked ? true : false });
    }

    courseNameChange = (event: any) => {

        this.props.contentrepositoryStore.setFilter({ ...this.props.contentrepositoryStore.filters, courseName: event.target.value });

        this.setState({ ...this.state, namevalue: event.target.value });
    }

    courseCategoryChange = (data: any) => {

        this.props.contentrepositoryStore.setFilter({ ...this.props.contentrepositoryStore.filters, courseCategoryId: data });

        this.setState({ ...this.state, categoryvalue: data });
    }

    handleRefreshSearch = async () => {

        this.props.contentrepositoryStore.setFilter({ ...this.props.contentrepositoryStore.filters, status: true, courseCategoryId: '', courseName: '' });

        this.setState({ ...this.state, categoryvalue: '', namevalue: '', switchvalue: true });

        //parent load
        this.props.handleSearch();
    }
    

    render() {

        if (this.props.contentrepositoryStore.coursecategory === undefined) return (<div></div>);
        
        const { handleSearch } = this.props;

        const children = this.props.contentrepositoryStore.coursecategory.map(item => <Option key={item.courseCategoryId}>{item.courseCategoryName}</Option>);

        return (


            <ul className="filterlist">
                <li><div className="switchbutton mt5">
                    <label className="mr8">{'Inactive'} </label>
                    <label className="mr8 switch"><input type="checkbox" onChange={this.switchChange} checked={this.state.switchvalue} /> {/*<Checkbox onChange={this.switchChange} checked={this.state.switchvalue} />*/}<span className="slider round"></span></label>
                    <label className="mr8">{'Active'} </label>
                </div>
                </li>
                <li className="width227">
                    <Input placeholder="Course Name" allowClear={true} onChange={this.courseNameChange} value={this.state.namevalue} />
                </li>
                <li className="width227">
                    <Select placeholder="All Status" onChange={this.courseCategoryChange} value={this.state.categoryvalue}>
                        {children}
                    </Select>
                </li>
                <li>
                    <div className="searchbg" onClick={handleSearch} >
                        <span className="tabsearchbtn"></span>
                    </div>
                </li>
                <li><div className="refreshbg" onClick={this.handleRefreshSearch} ><span className="refreshbtn"></span></div></li>

            </ul>

        );
    }
}

export default Form.create<ICourseQuickFilterProp>()(CourseQuickFilter);
