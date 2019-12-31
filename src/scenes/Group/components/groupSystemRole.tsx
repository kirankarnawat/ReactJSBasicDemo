
import * as React from 'react';

import { Form } from 'antd';

//import { inject, observer } from 'mobx-react';


class GroupSystemRole extends React.Component {

    render() {
        return (
            <div className="groupMainContainer">
             <div className="mainGroupBox"></div>
             <div className="blankbox"></div>
             <div className="mainGroupBox"></div>
            </div>

        )
    };
}

export default Form.create()(GroupSystemRole);