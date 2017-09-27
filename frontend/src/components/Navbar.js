import React, {Component} from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {FaHome} from 'react-icons/lib/fa';
import {fetchCategories} from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {capitalize} from '../utils/helpers';

class Navbar extends Component {
    
    componentDidMount() {
        const {fetchCategories} = this.props;
        fetchCategories();
    }

    render(){
        const {categories} = this.props;

        return(
            <nav className="navbar is-dark">
                    <div className="navbar-brand">
                        <div className="navbar-item" >
                            <img src={logo} width="60" height="60" alt="" />
                        </div>
                    </div>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            <FaHome size={22}/>&nbsp;&nbsp;Home
                        </Link>
                        {
                            categories.map(category=>(
                                <Link to={`/${category.path}`} className="navbar-item" key={category.path}>
                                    {capitalize(category.name)}
                                </Link>
                            ))
                        }
                    </div>
            </nav>
        );
    }
}

const mapStateToProps = ({category}) => ({
    categories: category.categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar));