import React, {Component} from 'react';
import {FaInfoCircle, FaTimesCircleO, FaPlusCircle, FaCommentingO, FaChevronUp, FaChevronDown} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {connect} from 'react-redux';
import {deletePost, createNewPost, fetchPosts, votePostUp, votePostDown} from '../actions';
import uuidv1 from 'uuid/v1';
import moment from 'moment';


class PostsCard extends Component {
    state = {
        isRemoveClick: false,
        isNewPostClick: false,
        selectedPost: {},
        newPost: {
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

        this.removePost = this.removePost.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeNewPostModal = this.closeNewPostModal.bind(this);
        this.saveNewPost = this.saveNewPost.bind(this);
        this.openNewPostModal = this.openNewPostModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateNewPost = this.validateNewPost.bind(this);
        this.votePostUp = this.votePostUp.bind(this);
        this.votePostDown = this.votePostDown.bind(this);
    }

    componentDidMount() {
        const {fetchPosts} = this.props;
        fetchPosts();
    }

    openConfirmModal(event, selectedPost) {
        event.preventDefault();

        this.setState({
            isRemoveClick: true,
            selectedPost
        });
    }

    removePost(event) {
        event.preventDefault();
        const {removePost} = this.props;
        const {selectedPost} = this.state;
        removePost(selectedPost.id);
        this.closeConfirmModal(event);
    }

    closeConfirmModal(event) {
        event.preventDefault();
        this.setState({
            isRemoveClick: false,
            selectedPost: {}
        });
    }

    closeNewPostModal(event) {
        event.preventDefault();
        this.setState({
            isNewPostClick: false
        });
    }

    openNewPostModal(event) {
        event.preventDefault();
        this.setState({
            isNewPostClick: true
        });
    }

    saveNewPost(event) {
        event.preventDefault();
        if(this.validateNewPost()){
            let {newPost} = this.state;
            const {createPost} = this.props;
            newPost.id = uuidv1();
            newPost.timestamp = Date.now();
            createPost(newPost);
            this.closeNewPostModal(event);
        }
    }

    handleInputChange(event) {
        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let newPost = this.state.newPost;
        if(value !== "") {
            newPost[name+"IsValid"] = true;
        }else{
            newPost[name+"IsValid"] = false;
        }
        newPost[name] = value;
        this.setState({
            newPost
        });
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

    validateNewPost() {
        let result = true;
        const {newPost} = this.state;
        result &= newPost.bodyIsValid & newPost.titleIsValid & newPost.authorIsValid & newPost.categoryIsValid;
        return result;
    }

    render() {
        const {posts, categories} = this.props;
        const {isRemoveClick, isNewPostClick} = this.state;

        return (
            <div>
                <nav className="navbar is-transparent">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <button className="button" 
                                        style={{backgroundColor: "#55acee", 
                                            color: "white", 
                                            borderColor: "transparent"}}
                                        onClick={this.openNewPostModal}>
                                        <span className="icon" >
                                            <FaPlusCircle/>
                                        </span>
                                        <span>
                                            New Post
                                        </span>
                                    </button>
                                </p>    
                            </div>
                        </div>
                        
                    </div>
                </nav>
                {
                    posts.map(post=>(
                        <div className="card" key={post.id}>
                            <div className="card-content">
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
                                                    <strong>{post.title}</strong>
                                                    <br/>
                                                    <small>by {post.author} </small> <span className="tag is-info is-rounded">{capitalize(post.category)}</span>
                                                    <br/>
                                                    <small>{(moment(new Date(post.timestamp)).endOf('day').fromNow()).toString()}</small>
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
                        </div>
                    ))
                }

                <div className={"modal " + (isNewPostClick ? "is-active" : "")}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">New Post</p>
                            <button className="delete" aria-label="close" onClick={this.closeNewPostModal}></button>
                        </header>
                        <form onSubmit={this.saveNewPost}>
                        <section className="modal-card-body">
                            
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input name="title" className={"input "+(this.state.newPost.titleIsValid ? "" : "is-danger")} type="text" placeholder="Text input" value={this.state.newPost.title} onChange={this.handleInputChange}/>
                                </div>
                                <p className={"help is-danger " + (this.state.newPost.titleIsValid ? "hidden" : "")}>This title is required</p>
                            </div>
                            <div className="field">
                                <label className="label">Body</label>
                                <div className="control">
                                    <input name="body" className={"input "+(this.state.newPost.bodyIsValid ? "" : "is-danger")} type="text" placeholder="Text input" value={this.state.newPost.body} onChange={this.handleInputChange}/>
                                </div>
                                <p className={"help is-danger " + (this.state.newPost.bodyIsValid ? "hidden" : "")}>This body is required</p>
                            </div>
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control">
                                <div className={"select " + (this.state.newPost.categoryIsValid ? "": "is-danger")}>
                                    <select name="category" value={this.state.newPost.category} onChange={this.handleInputChange}>
                                        <option value="">---Select Category---</option>
                                        {
                                            categories.map(category=>(
                                                <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                                            ))
                                        }
                                    </select>
                                    </div>
                                </div>
                                <p className={"help is-danger " + (this.state.newPost.categoryIsValid ? "hidden" : "")}>This category is required</p>
                            </div>
                            <div className="field">
                                <label className="label">Author</label>
                                <div className="control">
                                    <input name="author" className={"input " + (this.state.newPost.authorIsValid ? "" : "is-danger")} type="text" placeholder="Text input" value={this.state.newPost.author} onChange={this.handleInputChange}/>
                                </div>
                                <p className={"help is-danger " + (this.state.newPost.authorIsValid ? "hidden" : "")}>This author is required</p>
                            </div>
                            
                        </section>
                        <footer className="modal-card-foot">
                            <button type="submit" className="button is-success">Save</button>
                            <button className="button" onClick={this.closeNewPostModal}>Cancel</button>
                        </footer>
                        </form>
                    </div>
                </div>

                <div className={"modal " + (isRemoveClick ? "is-active" : "")}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Please confirm</p>
                        <button className="delete" aria-label="close" onClick={this.closeConfirmModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <p className="title has-text-danger">Do you want to delete post?</p>
                        </section>
                        <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.removePost}>Yes</button>
                        <button className="button" onClick={this.closeConfirmModal}>Cancel</button>
                        </footer>
                    </div>
                </div>

                
            </div>
        );
    }
}

const mapStateToProps = ({post, category}) => ({
    posts: post.posts,
    categories: category.categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: (id) => dispatch(deletePost(id)),
    createPost: (newPost) => dispatch(createNewPost(newPost)),
    votePostUp: (id) => dispatch(votePostUp(id)),
    votePostDown: (id) => dispatch(votePostDown(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsCard);