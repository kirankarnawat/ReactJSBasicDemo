import * as React from 'react';
//import { inject, observer } from 'mobx-react';

import { Row, Col } from 'antd';


class GroupHierarchy extends React.Component {
    render() {
        return (
            <Row className="antd-row antdCustomRow">
                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass20">
                    <div className="mngGroupBox">
                        <div className="mngGroupBoxHeader">
                            <div className="floatleft">
                                <h4 id="Name_Group1">Cardinal</h4>
                            </div>
                            <div className="floatright">
                                <a href="#"><span className="icon iconUser">&nbsp;</span></a>
                            </div>
                        </div>
                        <div className="managegroupbody">
                            <ul className="mngGrouplisting">
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li className="inactive">
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </Col>
                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass20">
                    <div className="mngGroupBox activemngGroupBox">
                        <div className="mngGroupBoxHeader">
                            <div className="floatleft">
                                <h4 id="Name_Group1">Association</h4>
                            </div>
                            <div className="floatright">
                                <a href="#"><span className="icon iconUser">&nbsp;</span></a>
                            </div>
                        </div>
                        <div className="managegroupbody">
                            <ul className="mngGrouplisting">
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li className="active">
                                    <a href="#">
                                        <span className="text "> Medicine Franchisee</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </Col>
                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass20">
                    <div className="mngGroupBox activemngGroupBox">
                        <div className="mngGroupBoxHeader">
                            <div className="floatleft">
                                <h4 id="Name_Group1">Brand</h4>
                            </div>
                            <div className="floatright">
                                <a href="#"><span className="icon iconUser">&nbsp;</span></a>
                            </div>
                        </div>
                        <div className="managegroupbody">
                            <ul className="mngGrouplisting">
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li className="active">
                                    <a href="#">
                                        <span className="text "> Medicine Franchisee</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </Col>
                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass20">
                    <div className="mngGroupBox activemngGroupBox">
                        <div className="mngGroupBoxHeader">
                            <div className="floatleft">
                                <h4 id="Name_Group1">Pharmacy</h4>
                            </div>
                            <div className="floatright">
                                <a href="#"><span className="icon iconUser">&nbsp;</span></a>
                            </div>
                        </div>
                        <div className="managegroupbody">
                            <ul className="mngGrouplisting">
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li className="active">
                                    <a href="#">
                                        <span className="text "> Medicine Franchisee</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </Col>
                <Col lg={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }} className="customeclass20">
                    <div className="mngGroupBox activemngGroupBox">
                        <div className="mngGroupBoxHeader">
                            <div className="floatleft">
                                <h4 id="Name_Group1">NCPDP</h4>
                            </div>
                            <div className="floatright">
                                <a href="#"><span className="icon iconUser">&nbsp;</span></a>
                            </div>
                        </div>
                        <div className="managegroupbody">
                            <ul className="mngGrouplisting">
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text "> Medicine Franchisee</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text ">  Cardinal Health</span>
                                        <span className="iconNo">
                                            <span className="editIcon2"></span>
                                            <span className="no">2</span>
                                            <span className="icon"></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </Col>
            </Row>

        )
    };
}

export default GroupHierarchy;