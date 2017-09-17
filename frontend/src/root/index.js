import React, {Component} from 'react';
import CategoriesPanel from '../components/CategoriesPanel';
import Navbar from '../components/Navbar';
import PostsCard from '../components/PostsCard';
import {FaRocket} from 'react-icons/lib/fa';
import {fetchCategories, fetchPosts} from '../actions';
import {connect} from 'react-redux';

class Root extends Component {
    state = {};

    componentDidMount() {
        const {fetchCategories, fetchPosts} = this.props;
        fetchCategories();
        fetchPosts();
    }

    render() {
        const {categories, posts} = this.props;
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
                    <div className="column is-one-quarter">
                        <CategoriesPanel data={categories}/>
                    </div>
                    <div className="column">
                        <PostsCard data={posts}/>
                    </div>
                </div>
            </div>
        );
    }    
}

const mapStateToProps = ({category, post}) => ({
    categories: category.categories,
    posts: post.posts
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);