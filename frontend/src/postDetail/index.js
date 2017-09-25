import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import {fetchPost, fetchPostComments} from '../actions';
import {connect} from 'react-redux'; 
import {capitalize} from '../utils/helpers';
import moment from 'moment';
import {withRouter, Link} from 'react-router-dom';
import {FaInfoCircle, FaTimesCircleO, FaPlusCircle, FaCommentingO, FaChevronUp, FaChevronDown, FaEdit,  FaArrowDown, FaArrowUp} from 'react-icons/lib/fa';


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
                    <div className="box">
                        <div className="media">
                            <div className="media-left">
                            <figure className="icon is-48x48" style={{color:"#00D1B2"}}>
                                <FaInfoCircle size={48}/>
                            </figure>
                            </div>
                            <div className="media-content">
                                <div className="columns">
                                    <div className="column is-10">
                                    <div className="content">
                                        <p>
                                            <strong><Link to={`/postDetail/${post.id}`}>{post.title}</Link></strong>
                                            <br/>
                                            <small>submitted {moment(new Date(post.timestamp)).startOf('hour').fromNow()} by {post.author} </small> 
                                            <span className="tag is-info is-rounded">{capitalize(post.category)}</span>
                                        </p>
                                    </div>
                                    </div>
                                    <div className="column">
                                        <nav className="level">
                                            <div className="level-left">
                                                <div className="level-item has-text-centered">
                                                    <div>
                                                        <p className="heading">Votes</p>
                                                        <p>
                                                            <button className="button is-primary is-outlined"style={{borderColor:"transparent", 
                                                                borderTopLeftRadius: "30px", 
                                                                borderTopRightRadius: "30px", 
                                                                borderBottomLeftRadius: "30px", 
                                                                borderBottomRightRadius: "30px"}}
                                                            >
                                                            <span className="icon is-small">
                                                                <FaChevronUp onClick={(event) => this.votePostUp(event, post.id)} style={{cursor: "hand"}} />
                                                            </span>
                                                            </button>
                                                        </p>
                                                        <p className="title">{post.voteScore}</p>
                                                        <p>
                                                            <button className="button is-primary is-outlined"style={{borderColor:"transparent", 
                                                                borderTopLeftRadius: "30px", 
                                                                borderTopRightRadius: "30px", 
                                                                borderBottomLeftRadius: "30px", 
                                                                borderBottomRightRadius: "30px"}}
                                                            >
                                                            <span className="icon is-small">
                                                                <FaChevronDown onClick={(event) => this.votePostDown(event, post.id)} style={{cursor: "hand"}}/>
                                                            </span>
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="column" style={{paddingTop: "25px"}}>
                                        <button className="button is-primary is-outlined"style={{borderColor:"transparent", 
                                                borderTopLeftRadius: "30px", 
                                                borderTopRightRadius: "30px", 
                                                borderBottomLeftRadius: "30px", 
                                                borderBottomRightRadius: "30px"}}
                                                >
                                                <span className="icon is-small">
                                                    <FaCommentingO size={28}/>
                                                </span>
                                        </button>
                                        <button className="button is-success is-outlined" style={{borderColor:"transparent", 
                                            borderTopLeftRadius: "30px", 
                                            borderTopRightRadius: "30px", 
                                            borderBottomLeftRadius: "30px", 
                                            borderBottomRightRadius: "30px"}} onClick={(event) => this.openEditPostModal(event,post)}>
                                            
                                            <span className="icon is-small">
                                                <FaEdit size={28}/>
                                            </span>
                                        </button>
                                        <button className="button is-danger is-outlined" style={{borderColor:"transparent", 
                                            borderTopLeftRadius: "30px", 
                                            borderTopRightRadius: "30px", 
                                            borderBottomLeftRadius: "30px", 
                                            borderBottomRightRadius: "30px"}} onClick={(event) => this.openConfirmModal(event,post)}>
                                            
                                            <span className="icon is-small">
                                                <FaTimesCircleO size={28}/>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
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