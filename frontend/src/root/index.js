import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import {FaRocket} from 'react-icons/lib/fa';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeCategoryFilter} from '../actions';

/**
 * @description Represents a root page
 */
class Root extends Component {

    componentDidMount(){
        const {changeCategoryFilter} = this.props;
        changeCategoryFilter("");
    }

    render() {
        return (
            <div className="container is-fluid">
                <Navbar/>
                <section className="hero is-white">
                    <div className="hero-body">
                        <div className="columns">
                            <div className="column" style={{textAlign:"center"}}>
                                <FaRocket size={52}/>
                            </div>
                            <div className="column is-11">
                                <p className="title">
                                Readable Project
                                </p>
                                <p className="subtitle">
                                Everything you need to learn to <strong>create a web application</strong> with React
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="columns">
                    <div className="column">
                        <PostList/>
                    </div>
                </div>
            </div>
        );
    }    
}

const mapDispatchToProps = (dispatch) => ({
    changeCategoryFilter: (query) => dispatch(changeCategoryFilter(query))
});

export default withRouter(connect(
    null,
    mapDispatchToProps
)(Root));