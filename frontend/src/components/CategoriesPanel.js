import React, {Component} from 'react';
import {FaAngleDoubleRight, FaSearch} from 'react-icons/lib/fa';

export default class CategoriesPanel extends Component {
    render() {
        return (
            <nav className="panel">
                <p className="panel-heading">
                    Categories
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                    <input className="input is-small" type="text" placeholder="search"/>
                    <span className="icon is-small is-left">
                        <FaSearch/>
                    </span>
                    </p>
                </div>
                <a className="panel-block">
                    <span className="panel-icon">
                        <FaAngleDoubleRight/>
                    </span>
                    React
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <FaAngleDoubleRight/>
                    </span>
                    Redux
                </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <FaAngleDoubleRight/>
                    </span>
                    Udacity
                </a>
            </nav>
        );
    }
}