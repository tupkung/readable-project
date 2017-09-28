import React, {Component} from 'react';
import {FaTimesCircleO, FaChevronUp, FaChevronDown, FaEdit,FaCommentO  } from 'react-icons/lib/fa';
import {connect} from 'react-redux';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import ConfirmRemoveModal from '../components/ConfirmRemoveModal';
import {voteCommentUp, voteCommentDown, deleteComment, editComment} from '../actions';
import EditCommentFormModal from '../components/EditCommentFormModal';

/**
 * @description Represents the Comment card
 */
class CommentCard extends Component {
    state = {
        isRemoveClick: false,
        isEditCommentClick: false,
        selectedComment: {},
        commentData: {
            body: "",
            bodyIsValid: false
        }
    };

    constructor(props){
        super(props);

        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.voteUp = this.voteUp.bind(this);
        this.voteDown = this.voteDown.bind(this);
        this.closeEditCommentModal = this.closeEditCommentModal.bind(this);
        this.saveEditComment = this.saveEditComment.bind(this);
        this.validateComment = this.validateComment.bind(this);
        this.openEditCommentModal = this.openEditCommentModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearCommentForm = this.clearCommentForm.bind(this);
    }

    clearCommentForm() {
        this.setState({
            commentData: {
                body: "",
                bodyIsValid: false
            }
        });
    }

    voteUp(event, id){
        event.preventDefault();
        const {voteCommentUp} = this.props;
        voteCommentUp(id);
    }

    voteDown(event, id){
        event.preventDefault();
        const {voteCommentDown} = this.props;
        voteCommentDown(id);
    }

    openConfirmModal(event, comment){
        event.preventDefault();
        this.setState({
            isRemoveClick: true,
            selectedComment: comment
        });
    }

    closeConfirmModal(event) {
        event.preventDefault();
        this.setState({
            isRemoveClick: false,
            selectedComment: {}
        });
    }

    removeComment(event) {
        event.preventDefault();
        const {deleteComment} = this.props;
        const {selectedComment} = this.state;
        deleteComment(selectedComment.id);
        this.closeConfirmModal(event);
    }

    closeEditCommentModal(event) {
        event.preventDefault();
        this.setState({
            isEditCommentClick: false
        });
    }

    validateComment() {
        let result = true;
        const {commentData} = this.state;
        result &= commentData.bodyIsValid;
        return result;
    }

    openEditCommentModal(event, comment) {
        event.preventDefault();
        const commentData = Object.assign({}, comment, {bodyIsValid: true});
        this.setState({
            isEditCommentClick: true,
            commentData
        });
    }

    saveEditComment(event) {
        event.preventDefault();
        if(this.validateComment()){
            const {editComment} = this.props;
            const {commentData} = this.state;
            editComment(commentData);
            this.clearCommentForm();
            this.closeEditCommentModal(event);
        }
    }

    handleInputChange(event) {
        event.preventDefault();
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let {commentData} = this.state;
        if(value !== "") {
            commentData[name+"IsValid"] = true;
        }else{
            commentData[name+"IsValid"] = false;
        }
        commentData[name] = value;
        this.setState({
            commentData
        });
    }

    render() {
        const {comment} = this.props;
        const {isRemoveClick, isEditCommentClick, commentData} = this.state;
        return (
            <div>
                <div className="box"style={(comment.isNew ? {backgroundColor: "#F5F5F5"} : {})} key={comment.id}>
                    <div className="media">
                        <div className="media-left">
                            <figure className="icon is-48x48" style={{color:"#00D1B2"}}>
                                <FaCommentO size={48}/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="columns">
                                <div className="column is-10">
                                    <div className="content">
                                        <div>
                                            {comment.body}
                                        </div>
                                        <p>
                                        <small>submitted {moment(new Date(comment.timestamp)).startOf('hour').fromNow()}  by {comment.author}</small>
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
                                                            onClick={(event) => this.voteUp(event, comment.id)}
                                                        >
                                                        <span className="icon is-small">
                                                            <FaChevronUp  style={{cursor: "hand"}} />
                                                        </span>
                                                        </button>
                                                    </p>
                                                    <p className="title">{comment.voteScore}</p>
                                                    <p>
                                                        <button className="button is-primary is-outlined"style={{borderColor:"transparent", 
                                                            borderTopLeftRadius: "30px", 
                                                            borderTopRightRadius: "30px", 
                                                            borderBottomLeftRadius: "30px", 
                                                            borderBottomRightRadius: "30px"}}
                                                            onClick={(event) => this.voteDown(event, comment.id)}
                                                        >
                                                        <span className="icon is-small">
                                                            <FaChevronDown  style={{cursor: "hand"}}/>
                                                        </span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                                <div className="column" style={{paddingTop: "25px"}}>
                                    <button className="button is-success is-outlined" style={{borderColor:"transparent", 
                                        borderTopLeftRadius: "30px", 
                                        borderTopRightRadius: "30px", 
                                        borderBottomLeftRadius: "30px", 
                                        borderBottomRightRadius: "30px"}} onClick={(event) => this.openEditCommentModal(event,comment)}>
                                        
                                        <span className="icon is-small">
                                            <FaEdit size={28}/>
                                        </span>
                                    </button>
                                    <button className="button is-danger is-outlined" style={{borderColor:"transparent", 
                                        borderTopLeftRadius: "30px", 
                                        borderTopRightRadius: "30px", 
                                        borderBottomLeftRadius: "30px", 
                                        borderBottomRightRadius: "30px"}} onClick={(event) => this.openConfirmModal(event,comment)}>
                                        
                                        <span className="icon is-small">
                                            <FaTimesCircleO size={28}/>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <EditCommentFormModal
                    isEditCommentClick={isEditCommentClick} 
                    commentData={commentData} 
                    closeEditCommentModal={this.closeEditCommentModal} 
                    saveEditComment={this.saveEditComment}
                    handleInputChange={this.handleInputChange}
                />
                <ConfirmRemoveModal
                    isRemoveClick={isRemoveClick}
                    closeConfirmModal={this.closeConfirmModal}
                    onRemoveClick={this.removeComment}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    voteCommentUp: (id) => dispatch(voteCommentUp(id)),
    voteCommentDown: (id) => dispatch(voteCommentDown(id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    editComment: (comment) => dispatch(editComment(comment))
});

export default withRouter(connect(
    null,
    mapDispatchToProps
)(CommentCard));