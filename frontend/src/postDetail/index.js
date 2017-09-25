import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import {fetchPost, fetchPostComments} from '../actions';
import {FaPlusCircle} from 'react-icons/lib/fa';
import {connect} from 'react-redux'; 
import {withRouter} from 'react-router-dom';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList';



class PostDetail extends Component {

    constructor(props){
        super(props);

        this.openNewCommentModal = this.openNewCommentModal.bind(this);
    }

    openNewCommentModal(){
        console.log("open modal");
        //TODO: implement open modal
    }

    componentDidMount(){
        const {fetchPost, fetchPostComments} = this.props;
        const {id} = this.props.match.params;
        fetchPost(id);
        fetchPostComments(id);
    }

    render(){
        const {post, comments} = this.props;
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