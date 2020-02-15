import './app.scss'
var React = require('react')
var ReactDOM = require('react-dom')
import Component from './component'

ReactDOM.hydrate(
    <Component
        todo_list={list}
    />, document.getElementById('react-app')
);
