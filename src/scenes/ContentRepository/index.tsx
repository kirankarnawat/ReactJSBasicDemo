
import * as React from 'react';

import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { appRouters } from '../../components/Router/router.config';
import storageService from '../../services/storageService';
import commonconst from '../../lib/commonconst';

import Stores from '../../stores/storeIdentifier';
import ContentRepositoryStore from '../../stores/contentrepositoryStore';
import { ContentRepositoryCountResponse } from '../../services/contentrepository/dto/Response/contentRepositoryCountResponse';

export interface IContentRepositoryProps {
    contentrepositoryStore: ContentRepositoryStore;
}

export interface IContentRepositoryState {
    counts: ContentRepositoryCountResponse;
}


@inject(Stores.ContentRepositoryStore)
@observer
class contentRepository extends React.Component<IContentRepositoryProps, IContentRepositoryState> {

    constructor(props) {
        super(props);
        this.state = {
            counts: { totalAssessments: 0, totalCourses: 0, totalEvents: 0, totalNewsletters: 0, totalPdfs: 0, totalSurveys: 0, totalTemplates: 0, totalVideos: 0 },
        }
    }

    async componentDidMount() {

        await this.props.contentrepositoryStore.initUserId();

        let res = await this.props.contentrepositoryStore.getContentRepositoryCount();

        this.setState({ ...this.state, counts: res });
    }

    render() {

        const { counts } = this.state;

        let result = storageService.getUserCookie();
        let dtfeatures = (result.features !== undefined) ? result.features : [];

        let contentmenu = dtfeatures.filter((item: any) => item.parentFeatureId === commonconst.PARENTFEATURE.PARENTFEATURE_CONTENTMANAGEMENT);
        const child = appRouters.filter((item: any) => item.parentFeatureId === commonconst.PARENTFEATURE.PARENTFEATURE_CONTENTMANAGEMENT && item.showInMenu === false && contentmenu.filter(e => e['featureId'] === item.featureId));

        const firstfour = (child.length > 0) ? child.slice(0, 4) : [];
        const secondfour = (child.length > 0) ? child.slice(4) : [];

        const countdata = (featureId: string, name: string) => {
            debugger;
            var tcount = 0, tcount1 = 0, tcount2 = 0;

            switch (featureId) {
                case commonconst.FEATURE.FEATURE_ASSESSMENTMANAGEMENT: tcount = counts.totalAssessments||0; return (<h2> {tcount} <span> {name} </span></h2>);
                case commonconst.FEATURE.FEATURE_COURSEMANAGEMENT: tcount = counts.totalCourses || 0; return (<h2> {tcount} <span> {'Courses'} </span></h2>);
                case commonconst.FEATURE.FEATURE_MEDIAMANAGEMENT: tcount1 = counts.totalVideos || 0; tcount2 = counts.totalPdfs || 0; return (<ul className="conRepListing"><li><h2> {tcount1} <span> Videos </span></h2></li><li><h2> {tcount2} <span> PDF </span></h2></li></ul>);
                case commonconst.FEATURE.FEATURE_NEWSLETTERMANAGEMENT: tcount = counts.totalNewsletters || 0; return (<h2> {tcount} <span> {name} </span></h2>);
                case commonconst.FEATURE.FEATURE_SURVEYSMANAGEMENT: tcount = counts.totalSurveys || 0; return (<h2> {tcount} <span> {name} </span></h2>);
                case commonconst.FEATURE.FEATURE_TEMPLATESMANAGEMENT: tcount = counts.totalTemplates || 0; return (<h2> {tcount} <span> {name} </span></h2>);
                case commonconst.FEATURE.FEATURE_WEBINARMANAGEMENT: tcount = counts.totalEvents || 0; return (<h2> {tcount} <span> {name} </span></h2>);
            }
        }

        return (
            <Card>
                <div>
                    <div className="antd-row">
                        <div className="ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24">
                            <div className="conHeader">
                                <div className="heading"><h2>Manage Content Repository</h2></div>
                            </div>
                        </div>
                    </div>

                    <div className="conReposWrapp">
                        <ul className="conRepoListing">
                            {
                                firstfour.map((route: any, index: number) => {
                                    return (

                                        <li key={route.featureId} className={route.class}>
                                            <Link to={route.path}>
                                                <div className="conReposBox">
                                                    <div className="conReposBoxHead">
                                                        <div className="icon"><img src={require('../../images/' + route.icon)} /></div>
                                                        <div className="text">
                                                            <h1>{route.name}</h1>
                                                        </div>
                                                    </div>
                                                    <div className="conReposBoxFooter">
                                                        {countdata(route.featureId, route.name)}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>

                    <div className="conReposWrapp pbP15">
                        <ul className="conRepoListing centerconRep">

                            {
                                secondfour.map((route: any, index: number) => {
                                    return (

                                        <li key={route.featureId} className={route.class}>
                                            <a href="#">
                                                <div className="conReposBox">
                                                    <div className="conReposBoxHead">
                                                        <div className="icon"><img src={require('../../images/' + route.icon)} /></div>
                                                        <div className="text">
                                                            <h1>{route.name}</h1>
                                                        </div>
                                                    </div>
                                                    <div className="conReposBoxFooter">
                                                        {countdata(route.featureId, route.name)}
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    );
                                })
                            }

                        </ul>
                    </div>

                </div>
            </Card>
        );

    };
}



export default contentRepository;