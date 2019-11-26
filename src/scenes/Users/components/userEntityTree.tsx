import * as React from 'react';

import FormItem from 'antd/lib/form/FormItem';
import { Col, Input } from 'antd';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';

const { Search } = Input;

export interface IEntityTreeProp {
    onHandleAutoSearch: (value: string) => void;
    searchData: GetUserEntityListResponse[],
    onHandleAddGroupUser: (value: string) => void;
}


class userEntityTree extends React.Component<IEntityTreeProp> {   

    render() {

        const { onHandleAutoSearch, searchData, onHandleAddGroupUser } = this.props;

        const child =
            searchData.map((item) => (
                <ul className="tree">
                    <li className="mt0">
                        <a className="fristlink"><span className="treeIcon"></span> <span className="">{item.group1Name} </span> <span className="groupicon"></span><span className="values"></span></a>
                            <ul>
                            <li>
                                <a><span className="">{item.group2Name} </span> <span className="groupicon"></span><span className="values"></span></a>
                                    <ul>
                                    <li><a> <span className="">{item.group3Name} </span> <span className="groupicon"></span><span className="values"></span></a>
                                        <ul>
                                            <li className="highlighted"><a><span className="">{item.group4Name} </span> <span className="groupicon"></span><span className="values"></span><span className="adduserIcon" onClick={() => onHandleAddGroupUser(item.groupId)}></span></a> 
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            ))

        return (
            <div>
                <div className="antd-row">
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <FormItem>
                            <label>{'Search User Group'} <span className="start">*</span> </label>
                            <div className="rel">
                                <Search placeholder="Group 1/ Group 2/ Group 3" onSearch={onHandleAutoSearch} />
                            </div>
                        </FormItem>
                    </Col>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                        <div className="treedigram">
                            {child}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default userEntityTree;

