import './index.less';

import * as React from 'react';

import { Icon, Layout, Menu } from 'antd';

import { appRouters } from '../../components/Router/router.config';
import storageService from '../../services/storageService';

const { Sider } = Layout;

const { SubMenu } = Menu;

export interface ISiderMenuProps {
    path: any;
    collapsed: boolean;
    onCollapse: any;
    history: any;
}


const SiderMenu = (props: ISiderMenuProps) => {
    const { collapsed, history, onCollapse } = props;
  
    let result = storageService.getUserCookie();
    let dtfeatures = (result.features !== undefined) ? result.features : [];

    return (
        <Sider trigger={null} className={'sidebar'} width={200} collapsible collapsed={collapsed} onCollapse={onCollapse}>

            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                {appRouters
                    .filter((item: any) => !item.isLayout && item.showInMenu && !item.parentFeatureId && dtfeatures.filter(e => e['featureId'] === item.featureId).length > 0)
                    .map((route: any, index: number) => {

                        var len = appRouters
                            .filter((item1: any) => !item1.isLayout && item1.showInMenu && item1.parentFeatureId == route.featureId && dtfeatures.filter(e => e['featureId'] === item1.featureId).length > 0).length;

                        if (len == 0) {
                            return (
                                <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                                    <Icon type={route.icon} />
                                    <span>{route.title}</span>
                                </Menu.Item>
                            );
                        }
                        else {
                            return (
                                <SubMenu key={route.path}
                                    title={<span>
                                        <Icon type={route.icon} />
                                        <span>{route.title}</span>
                                    </span>}>
                                    {
                                        appRouters
                                            .filter((item1: any) => !item1.isLayout && item1.showInMenu && item1.parentFeatureId == route.featureId && dtfeatures.filter(e => e['featureId'] === item1.featureId).length > 0)
                                            .map((route1: any, index: number) => {
                                                return (
                                                    <Menu.Item key={route1.path} onClick={() => history.push(route1.path)}>
                                                        <Icon type={route1.icon} />
                                                        <span>{route1.title}</span>
                                                    </Menu.Item>
                                                );
                                            })
                                    }
                                </SubMenu>
                            );
                        }
                    })
                }
            </Menu>
        </Sider>
    );
};

export default SiderMenu;
