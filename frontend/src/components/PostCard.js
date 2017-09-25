import React, {Component} from 'react';
import {FaInfoCircle, FaTimesCircleO, FaChevronUp, FaChevronDown, FaEdit,  } from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {connect} from 'react-redux';
import {deletePost, 
    editPost, 
    votePostUp, 
    votePostDown} from '../actions';
import moment from 'moment';
import {withRouter, Link, Redirect} from 'react-router-dom';
import ConfirmRemovePostModal from '../components/ConfirmRemovePostModal';
import EditPostFormModal from '../components/EditPostFormModal';

class PostCard extends Component {

    state = {
        isRemoveClick: false,
        isEditPostClick: false,
        selectedPost: {},
        postData: {
            title: "",
            titleIsValid: false,
            body: "",
            bodyIsValid: false,
            author: "",
            authorIsValid: false,
            category: "",
            categoryIsValid: false
        }
    };

    constructor(props){
        super(props);

        this.openEditPostModal = this.openEditPostModal.bind(this);
        this.saveEditPost = this.saveEditPost.bind(this);
        this.votePostUp = this.votePostUp.bind(this);
        this.votePostDown = this.votePostDown.bind(this);
        this.validatePost = this.validatePost.bind(this);
        this.clearPostForm = this.clearPostForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.closeEditPostModal = this.closeEditPostModal.bind(this);
        this.removePost = this.removePost.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
    }

    clearPostForm() {
        this.setState({
            postData: {
                title: "",
                titleIsValid: false,
                body: "",
                bodyIsValid: false,
                author: "",
                authorIsValid: false,
                category: "",
                categoryIsValid: false
            }
        });
    }

    handleInputChange(event) {
        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let postData = this.state.postData;
        if(value !== "") {
            postData[name+"IsValid"] = true;
        }else{
            postData[name+"IsValid"] = false;
        }
        postData[name] = value;
        this.setState({
            postData
        });
    }

    validatePost() {
        let result = true;
        const {postData} = this.state;
        result &= postData.bodyIsValid & postData.titleIsValid & postData.authorIsValid & postData.categoryIsValid;
        return result;
    }

    removePost(event) {
        event.preventDefault();
        const {removePost} = this.props;
        const {selectedPost} = this.state;
        removePost(selectedPost.id);
        this.closeConfirmModal(event);
    }

    openConfirmModal(event, selectedPost) {
        event.preventDefault();

        this.setState({
            isRemoveClick: true,
            selectedPost
        });
    }

    closeConfirmModal(event) {
        event.preventDefault();
        this.setState({
            isRemoveClick: false,
            selectedPost: {}
        });
    }

    closeEditPostModal(event) {
        event.preventDefault();
        this.setState({
            isEditPostClick: false
        });
    }

    openEditPostModal(event, post) {
        event.preventDefault();
        const postData = Object.assign({}, post, {titleIsValid: true,bodyIsValid: true,authorIsValid: true,categoryIsValid: true});
        this.setState({
            isEditPostClick: true,
            postData
        });
    }

    saveEditPost(event) {
        event.preventDefault();
        if(this.validatePost()){
            const {editPost} = this.props;
            let {postData} = this.state;
            editPost(postData);
            this.clearPostForm();
            this.closeEditPostModal(event);
        }
    }

    votePostUp(event, id){
        event.preventDefault();
        const {votePostUp} = this.props;
        votePostUp(id);
    }

    votePostDown(event, id){
        event.preventDefault();
        const {votePostDown} = this.props;
        votePostDown(id);
    }
    
    render() {
        const {post} = this.props;
        const {isEditPostClick, isRemoveClick} = this.state;
        if(!post){
            return <Redirect to="/"/>
        }
        return (
            
            <div>
            <div className="box " style={(post.isNew ? {backgroundColor: "#F5F5F5"} : {})} key={post.id}>
            
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
                                <p>
                                    {post.body ? post.body : ""}
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
                                                        onClick={(event) => this.votePostUp(event, post.id)}
                                                    >
                                                    <span className="icon is-small">
                                                        <FaChevronUp  style={{cursor: "hand"}} />
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
                                                        onClick={(event) => this.votePostDown(event, post.id)}
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

            <EditPostFormModal 
                    isEditPostClick={isEditPostClick} 
                    postData={this.state.postData} 
                    closeEditPostModal={this.closeEditPostModal} 
                    saveEditPost={this.saveEditPost}
                    handleInputChange={this.handleInputChange}
                />

            <ConfirmRemovePostModal
                isRemoveClick={isRemoveClick}
                closeConfirmModal={this.closeConfirmModal}
                removePost={this.removePost}
            />
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    removePost: (id) => dispatch(deletePost(id)),
    votePostUp: (id) => dispatch(votePostUp(id)),
    votePostDown: (id) => dispatch(votePostDown(id)),
    editPost: (postData) => dispatch(editPost(postData))
});

export default withRouter(connect(
    null,
    mapDispatchToProps
)(PostCard));