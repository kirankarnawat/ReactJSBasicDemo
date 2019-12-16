import './index.less';
import * as React from 'react';

import { Col, Menu, Dropdown, Icon, Tooltip, Popover } from 'antd';
import { Link } from 'react-router-dom';

import ChangePassword from '../../scenes/Users/components/changePassword'

export interface IUserState {
    changepassModalVisible: boolean;
}
export interface IHeaderProps {
    collapsed?: any;
    toggle?: any;
}


export class Header extends React.Component<IHeaderProps, IUserState> {

    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            changepassModalVisible: false
        };
    }

    changepassFormRef: any;

    savechangepassFormRef = (formRef: any) => {
        this.changepassFormRef = formRef;
    };

    //FILER DRAWER
    async changepassModalOpen() {
        this.changepassModal();
    }

    //FILTER USER DATA
    handleAdvFilter = () => {
        const form = this.changepassFormRef.props.form;
        form.validateFields(async (err: any, values: any) => {
            this.setState({ changepassModalVisible: false });
            form.resetFields();
        });
    }

    changepassModal = () => {
        this.setState({
            changepassModalVisible: !this.state.changepassModalVisible
        });
    };

    render() {

        const userDropdownMenu = (
            <Menu className="topMenu">
                <Menu.Item>
                    <Link to="">
                        <span className="circle">PA</span>
                        <span> {'PA'}</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.changepassModalOpen()}>
                        <span className="changepassIcon"></span>
                        <span>{'ChangePassword'}</span>
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/logout">
                        <span className="logoutIcon"></span>
                        <span> {'Logout'}</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );

        const help = <span>Help</span>;

        const setting = <span>Setting</span>;

        const notification = <span>Notification</span>;

        const content = (
            <div className="settingmenu">
                <ul>
                    <li><a href="#">Configure Admin Rights</a></li>
                    <li><Link to="/bulkImportHistory">Bulk Import History</Link></li>
                </ul>
            </div>
        );

        return (
            <Col className={'header-container'}>
                <div className="navbarLeft">
                    <div className="admintext">Super Admin</div>
                </div>
                <Col className="togglebtn">
                    <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.toggle} />
                </Col>
                <div className="logoDiv">
                    <img src={require('../../images/main-logo.png')} alt="logo" />
                </div>
                <div className="navbarRight">
                    <Col>
                        <div className="navbarRightList">
                            <ul className="reset">
                                <li> <Tooltip placement="top" title={help}> <a href="#" className="helpIconIcon"> </a></Tooltip></li>
                                <li><Tooltip placement="top" title={setting}><Popover className="settingPopup" placement="bottomRight" content={content} trigger="click"><a href="#" className="settingIcon"></a></Popover></Tooltip></li>
                                <li><Tooltip placement="top" title={notification}><a href="#" className="bellIcon"></a></Tooltip></li>
                                <li>
                                    <Dropdown trigger={['click']} overlay={userDropdownMenu}>
                                        <a href="#" className="circle" >PA</a>
                                    </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </div>

                <ChangePassword
                    visible={this.state.changepassModalVisible}
                    onCancel={() =>
                        this.setState({
                            changepassModalVisible: false,
                        })
                    }
                />

            </Col>

        );
    }
}

export default Header;
