import * as React from 'react';

import { inject, observer } from 'mobx-react';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
import { Col, Input, Form, Empty} from 'antd';

import Stores from '../../../stores/storeIdentifier';
import UserStore from '../../../stores/userStore';
import { GetUserEntityListResponse } from '../../../services/user/dto/Response/getUserEntityListResponse';

const { Search } = Input;

export interface IUserProps {
    userStore: UserStore;
}

export interface IEntityTreeProp extends FormComponentProps {
    onHandleAddGroupUser: (value: string) => void;
}

export interface IEntityTreeState {
    result: GetUserEntityListResponse[];
    searchvalue: string;
}


@inject(Stores.UserStore)
@observer
class userEntityTree extends React.Component<IUserProps & IEntityTreeProp, IEntityTreeState> {

    constructor(props) {
        super(props);
        this.state = { result: [], searchvalue: '' }
    }

    handleAutoSearch = async (value: string) => {

        let searchresult: GetUserEntityListResponse[];

        if (value && this.props.userStore) {

            let data = await this.props.userStore.getEntityList({ SearchPhrase: value, RequesterUserId: this.props.userStore.userid, GroupId: '' });

            searchresult = data.items;
        }
        else {
            searchresult = [];
        }

        this.setState({ ...this.state, result: searchresult });
    };

    handleChange = (event) => {

        this.setState({ ...this.state, searchvalue: event.target.value });
    };


    render() {

        const { onHandleAddGroupUser } = this.props;

        const { result } = this.state;

        const child =
            result.map((item, index) => (
                <ul className="tree" key={index.toString()}>
                    <li className="mt0">
                        <a className="fristlink"><span className="treeIcon"></span> <span className="">{item.group1Name} </span> <span className="groupicon"></span><span className="values"></span>
                            <span className={item.group2Name !== null ? 'adduserIcon hidden' : 'adduserIcon'} id={item.groupId} onClick={() => { onHandleAddGroupUser(item.groupId); this.setState({ ...this.state, result: [], searchvalue: '' }); }}></span>
                        </a>
                        <ul className={item.group2Name !== null ? '' : 'hidden'}>
                            <li>
                                <a><span className="">{item.group2Name} </span> <span className="groupicon"></span><span className="values"></span>
                                    <span className={item.group3Name !== null ? 'adduserIcon hidden' : 'adduserIcon'} id={item.groupId} onClick={() => { onHandleAddGroupUser(item.groupId); this.setState({ ...this.state, result: [], searchvalue: '' }); }}></span>
                                </a>
                                <ul className={item.group3Name !== null ? '' : 'hidden'}>
                                    <li>
                                        <a> <span className="">{item.group3Name} </span> <span className="groupicon"></span><span className="values"></span>
                                            <span className={item.group4Name !== null ? 'adduserIcon hidden' : 'adduserIcon'} id={item.groupId} onClick={() => { onHandleAddGroupUser(item.groupId); this.setState({ ...this.state, result: [], searchvalue: '' }); }}></span>
                                        </a>
                                        <ul className={item.group4Name !== null ? '' : 'hidden'}>
                                            <li className="highlighted">
                                                <a><span className="">{item.group4Name} </span> <span className="groupicon"></span><span className="values"></span>
                                                    <span className='adduserIcon' id={item.groupId} onClick={() => { onHandleAddGroupUser(item.groupId); this.setState({ ...this.state, result: [], searchvalue: '' }); }}></span></a>
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
                                <Search placeholder="Group 1/ Group 2/ Group 3" onSearch={this.handleAutoSearch} value={this.state.searchvalue} onChange={this.handleChange} />
                            </div>
                        </FormItem>
                    </Col>
                </div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                        <div className="treedigram">
                            {child.length > 0 ? child : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Form.create<IEntityTreeProp>()(userEntityTree);

