import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import {fetchPost, fetchPostComments} from '../actions';
import {FaPlusCircle} from 'react-icons/lib/fa';
import {connect} from 'react-redux'; 
import {withRouter} from 'react-router-dom';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList';
import NewCommentFormModal from '../components/NewCommentFormModal';
import {Redirect} from 'react-router-dom';


/**
 * @description Represents a Post detail page.
 */
class PostDetailContainer extends Component {
    
    state = {
        isClickNewComment: false, 
        isPostLoading: true
    };

    constructor(props){
        super(props);

        this.openNewCommentModal = this.openNewCommentModal.bind(this);
        this.onCloseCommentModal = this.onCloseCommentModal.bind(this);

        const {fetchPost, fetchPostComments} = this.props;
        const {id} = this.props.match.params;
        fetchPost(id).then(()=>{
            this.setState({
                isPostLoading: false
            });
        });
        fetchPostComments(id);
    }

    openNewCommentModal(event){
        event.preventDefault();
        this.setState({
            isClickNewComment: true
        });
    }

    onCloseCommentModal() {
        this.setState({
            isClickNewComment: false
        });
    }

    render(){
        const {post, comments} = this.props;
        const {isClickNewComment, isPostLoading} = this.state;
        return (
                <div className="container is-fluid">
                    <Navbar/>
    
    
                    <nav className="panel" style={{marginTop: "5px"}}>
                        <div className="panel-heading">
                            <div className="columns is-mobile">
                                <div className="column">
                                    Post Detail
                                </div>
                                <div className="column" style={{textAlign: "right"}}>
                                    
                                </div>
                            </div>
                        </div>
                        
                        
                    </nav>
                    { (post !== undefined) ?
                            <PostCard post={post}/>
                            : ""
                        }
                    <nav className="panel" style={{marginTop: "5px"}}>
                        <div className="panel-heading">
                            <div className="columns is-mobile">
                                <div className="column">
                                    Comments
                                </div>
                                <div className="column" style={{textAlign: "right"}}>
                                    <button className="button " 
                                        style={{backgroundColor: "#55acee", 
                                            color: "white", 
                                            borderColor: "transparent"}}
                                        onClick={this.openNewCommentModal}>
                                        <span className="icon" >
                                            <FaPlusCircle/>
                                        </span>
                                        <span>
                                            New Comment
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </nav>
                    <CommentList comments={comments}/>
                    <NewCommentFormModal openModal={isClickNewComment} onCloseModal={this.onCloseCommentModal} parentId={post && post.id}/>

                    {
                        ( (post && !post.error) || isPostLoading) ? "" : <Redirect to={'/error/page/404'}/>
                    }
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
)(PostDetailContainer));