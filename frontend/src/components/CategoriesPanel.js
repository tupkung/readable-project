import React, {Component} from 'react';
import {FaAngleDoubleRight, FaSearch} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';

export default class CategoriesPanel extends Component {
    render() {
        const {data} = this.props;

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
                {
                    data.map((category) => (
                        <a className="panel-block" key={category.path}>
                            <span className="panel-icon">
                                <FaAngleDoubleRight/>
                            </span>
                            {capitalize(category.name)}
                        </a>
                    ))
                }
            </nav>
        );
    }
}