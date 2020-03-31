import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './index.css';
import App from './components/App';  // 导入App组件

import * as serviceWorker from './serviceWorker';

export default class Hello extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/:id" component={App} />
                </div>
            </Router>
        )
    }
}
ReactDOM.render(<Hello />, document.getElementById('app'));
serviceWorker.unregister();