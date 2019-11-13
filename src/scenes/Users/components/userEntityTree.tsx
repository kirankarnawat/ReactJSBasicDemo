
import * as React from 'react';

import { Icon } from 'antd';

class userEntityTree extends React.Component {
    render() {
        return (
            <div>
                <div className="antd-row">
                    <div className="ant-col-lg-24 ant-col-sm-24 ant-col-md-24 ant-col-xs-24">
                        <div className="treedigram">
                            <ul className="tree">
                                <li className="mt0">
                                    <a className="fristlink"><span className="treeIcon"><Icon type="apartment" /></span> <span className="">Cardinal Health </span> <span className="groupicon"><Icon type="usergroup-add" /></span><span className="values">4,923</span></a>
                                    <ul>
                                        <li>
                                            <a><span className="">Ball And Foodstores </span> <span className="groupicon"><Icon type="usergroup-add" /></span><span className="values">2,573</span></a>
                                            <ul>
                                                <li><a> <span className="">Pharmacy 5</span> <span className="groupicon"><Icon type="usergroup-add" /></span><span className="values">534</span></a>
                                                    <ul>
                                                        <li className="highlighted"><a><span className="">NCPDP 13</span> <span className="groupicon"><Icon type="usergroup-add" /></span><span className="values">15</span> <span className="adduserIcon"></span></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="treeinlinestructure">
                <ul className="treeentityinline">
                    <li><a href="#" className="links"><span className="icontree"><Icon type="apartment" /></span><span className="text">Cardinal Health</span></a></li>
                    <li><a href="#" className="links"><span className="text">Ball and Food Stores</span></a></li>
                    <li><a href="#" className="links"><span className="text">Pharmacy 5</span></a></li>
                    <li><a href="#" className="links"><span className="text">NCPDP 13</span></a></li>
                </ul>
            </div>
            </div>
            
        );
    };
}

export default userEntityTree;

