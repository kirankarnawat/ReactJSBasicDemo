import * as React from 'react';

import { inject, observer } from 'mobx-react';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
import { Col, Input, Form } from 'antd';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';

const { Search } = Input;

export interface IUserProps {
    userStore: UserStore;
}

export interface IEntityTreeProp extends FormComponentProps{
    onHandleAutoSearch: (value: string) => void;
    onHandleAddGroupUser: (value: string) => void;
}


@inject(Stores.UserStore)
@observer
class userEntityTree extends React.Component<IUserProps & IEntityTreeProp> {   

    render() {

        const { onHandleAutoSearch, onHandleAddGroupUser } = this.props;
        const searchData = (this.props.userStore.userentity !== undefined) ? this.props.userStore.userentity.items : [];

        const child =
            searchData.map((item, index) => (
                <ul className="tree" key={index.toString()}>
                    <li className="mt0">
                        <a className="fristlink"><span className="treeIcon"></span> <span className="">{item.group1Name} </span> <span className="groupicon"></span><span className="values"></span></a>
                            <ul>
                            <li>
                                <a><span className="">{item.group2Name} </span> <span className="groupicon"></span><span className="values"></span></a>
                                    <ul>
                                    <li><a> <span className="">{item.group3Name} </span> <span className="groupicon"></span><span className="values"></span></a>
                                        <ul>
                                            <li className="highlighted"><a><span className="">{item.group4Name} </span> <span className="groupicon"></span><span className="values"></span><span className="adduserIcon" id={item.groupId} onClick={() => onHandleAddGroupUser(item.groupId)}></span></a> 
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

export default Form.create<IEntityTreeProp>()(userEntityTree);

