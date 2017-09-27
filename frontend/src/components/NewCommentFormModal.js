import React, {Component} from 'react';
import uuidv1 from 'uuid/v1';
import {createNewComment} from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class NewCommentFormModal extends Component {
    state = {
        commentData: {
            body: "",
            bodyIsValid: false,
            author: "",
            authorIsValid: false
        }
    };

    constructor(props){
        super(props);

        this.closeNewCommentModal = this.closeNewCommentModal.bind(this);
        this.clearCommentForm = this.clearCommentForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateComment = this.validateComment.bind(this);
        this.saveNewComment = this.saveNewComment.bind(this);
    }

    clearCommentForm() {
        this.setState({
            commentData: {
                body: "",
                bodyIsValid: false,
                author: "",
                authorIsValid: false
            }
        });
    }

    closeNewCommentModal(event) {
        event.preventDefault();
        const {onCloseModal} = this.props;
        onCloseModal();
    }

    saveNewComment(event) {
        event.preventDefault();
        if(this.validateComment()){
            let {commentData} = this.state;
            let {parentId} = this.props;
            const {createComment} = this.props;
            
            commentData.id = uuidv1();
            commentData.timestamp = Date.now();
            commentData.parentId = parentId;
            createComment(Object.assign({}, commentData));
            this.clearCommentForm();
            this.closeNewCommentModal(event);
        }
    }

    handleInputChange(event) {
        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let commentData = this.state.commentData;
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

    validateComment() {
        let result = true;
        const {commentData} = this.state;
        result &= commentData.bodyIsValid & commentData.authorIsValid;
        return result;
    }

    render() {
        const {openModal} = this.props;
        const {commentData} = this.state;
        return (
            <div>
                <div className={"modal " + (openModal ? "is-active" : "")}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">New Comment</p>
                            <button className="delete" aria-label="close" onClick={this.closeNewCommentModal}></button>
                        </header>
                        <form onSubmit={this.saveNewComment}>
                        <section className="modal-card-body">

                            <div className="field">
                                <label className="label">Body</label>
                                <div className="control">
                                    <textarea name="body" className={"textarea "+(commentData.bodyIsValid ? "" : "is-danger")} type="text" placeholder="Body" value={commentData.body} onChange={this.handleInputChange}></textarea>
                                </div>
                                <p className={"help is-danger " + (commentData.bodyIsValid ? "hidden" : "")}>This body is required</p>
                            </div>
                            
                            <div className="field">
                                <label className="label">Author</label>
                                <div className="control">
                                    <input name="author" className={"input " + (commentData.authorIsValid ? "" : "is-danger")} type="text" placeholder="Author" value={commentData.author} onChange={this.handleInputChange}/>
                                </div>
                                <p className={"help is-danger " + (commentData.authorIsValid ? "hidden" : "")}>This author is required</p>
                            </div>
                            
                        </section>
                        <footer className="modal-card-foot">
                            <button type="submit" className="button is-success">Save</button>
                            <button className="button" onClick={this.closeNewCommentModal}>Cancel</button>
                        </footer>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createComment: (newComment) => dispatch(createNewComment(newComment))
});

export default withRouter(connect(
    null,
    mapDispatchToProps
)(NewCommentFormModal));