import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import {fetchPost, fetchPostComments} from '../actions';
import {connect} from 'react-redux'; 
import {withRouter} from 'react-router-dom';
import PostCard from '../components/PostCard';



class PostDetail extends Component {
    componentDidMount(){
        const {fetchPost, fetchPostComments} = this.props;
        const {id} = this.props.match.params;
        fetchPost(id);
        fetchPostComments(id);
    }
    render(){
        const {post, comments} = this.props;
        //console.log(this.props);
        return (
            <div className="container is-fluid">
                <Navbar/>


                <nav className="panel" style={{marginTop: "5px"}}>
                    <p className="panel-heading">
                        Post Detail
                    </p>
                    {/* <div className="panel-block"> */}
                    { (post !== undefined) ?
                        <PostCard post={post}/>
                        : ""}
                    {/* </div>  */}
                    
                </nav>
                <nav className="panel" style={{marginTop: "5px"}}>
                    <p className="panel-heading">
                        Comments
                    </p>
                    <div className="panel-block">

                    </div>
                </nav>
                <div className="box">
                <article className="media">
                    <div className="media-left">
                    <figure className="image is-64x64">
                        <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image"/>
                    </figure>
                    </div>
                    <div className="media-content">
                    <div className="content">
                        <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                        </p>
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                        <a className="level-item">
                            <span className="icon is-small"><i className="fa fa-reply"></i></span>
                        </a>
                        <a className="level-item">
                            <span className="icon is-small"><i className="fa fa-retweet"></i></span>
                        </a>
                        <a className="level-item">
                            <span className="icon is-small"><i className="fa fa-heart"></i></span>
                        </a>
                        </div>
                    </nav>
                    </div>
                </article>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({postDetail, comment}) => ({
    post: postDetail.post,
    comments: comment.comments
});

const mapDispatchToProps = (dispatch) => ({
    fetchPost: (id) => dispatch(fetchPost(id)),
    fetchPostComments: (id) => dispatch(fetchPostComments(id))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));