import * as React from 'react';

import { Card } from 'antd';

class contentRepository extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
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
                    <div className="conReposWrapp pt7per">
                        <ul className="conRepoListing">
                            <li className="scormLi">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/SCORM.png')} /></div>
                                            <div className="text">
                                                <h1>SCORM 1.2</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <h2>
                                              
                                                11 <span>Courses</span>
                                            </h2>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="manualTemp">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/manual-templates.png')} /></div>
                                            <div className="text">
                                                <h1>Manual Templates</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <h2>
                                                98 <span>Templates</span>

                                            </h2>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="quizAss">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/quiz.png')} /></div>
                                            <div className="text">
                                                <h1>Quiz/Assessments</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <h2>
                                                3  <span>Quiz/Assessments</span>

                                            </h2>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="survey">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/survey.png')} /></div>
                                            <div className="text">
                                                <h1>Surveys</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <h2>
                                                3 <span>Surveys</span>
                                            </h2>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="conReposWrapp pbP15">
                        <ul className="conRepoListing centerconRep">
                            <li className="mediaBox">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/media.png')} /></div>
                                            <div className="text">
                                                <h1>Media</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <ul className="conRepListing">
                                                <li>
                                                    <h2>73 <span>Videos</span></h2>
                                                </li>
                                                <li>
                                                    <h2>95 <span>PDF</span></h2>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="events">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/events.png')} /></div>
                                            <div className="text">
                                                <h1>Events</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <h2>
                                                113 <span>Events</span>
                                            </h2>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="newsletter">
                                <a href="#">
                                    <div className="conReposBox">
                                        <div className="conReposBoxHead">
                                            <div className="icon"><img src={require('../../images/newsletter.png')} /></div>
                                            <div className="text">
                                                <h1>NewsLetter</h1>
                                            </div>
                                        </div>
                                        <div className="conReposBoxFooter">
                                            <h2>
                                                53 <span>NewsLetter</span>

                                            </h2>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </Card>
        );

    };
}



export default contentRepository;