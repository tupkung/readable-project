import React, {Component} from 'react';
import {FaInfoCircle, FaTimesCircleO, FaPlusCircle, FaCommentingO, FaChevronUp, FaChevronDown, FaEdit,  FaArrowDown, FaArrowUp} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {connect} from 'react-redux';
import {deletePost, 
    createNewPost, 
    editPost, 
    fetchPosts, 
    votePostUp, 
    votePostDown,
    changeCategoryFilter,
    changeOrderVoteScore,
    changeOrderTimeStamp} from '../actions';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import EditPostFormModal from '../components/EditPostFormModal';
import NewPostFormModal from '../components/NewPostFormModal';
import ConfirmRemovePostModal from '../components/ConfirmRemovePostModal';


class PostsCard extends Component {
    state = {
        isRemoveClick: false,
        isNewPostClick: false,
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

        this.removePost = this.removePost.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeNewPostModal = this.closeNewPostModal.bind(this);
        this.closeEditPostModal = this.closeEditPostModal.bind(this);
        this.saveNewPost = this.saveNewPost.bind(this);
        this.saveEditPost = this.saveEditPost.bind(this);
        this.openNewPostModal = this.openNewPostModal.bind(this);
        this.openEditPostModal = this.openEditPostModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validatePost = this.validatePost.bind(this);
        this.votePostUp = this.votePostUp.bind(this);
        this.votePostDown = this.votePostDown.bind(this);
        this.clearPostForm = this.clearPostForm.bind(this);
        this.clearFilterCategory = this.clearFilterCategory.bind(this);
        this.orderByVoteScore = this.orderByVoteScore.bind(this);
        this.orderByTimeStamp = this.orderByTimeStamp.bind(this);
    }

    componentDidMount() {
        const {fetchPosts} = this.props;
        fetchPosts();
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

    closeEditPostModal(event) {
        event.preventDefault();
        this.setState({
            isEditPostClick: false
        });
    }

    openNewPostModal(event) {
        event.preventDefault();
        this.setState({
            isNewPostClick: true
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

    saveNewPost(event) {
        event.preventDefault();
        if(this.validatePost()){
            let {postData} = this.state;
            const {createPost} = this.props;
            postData.id = uuidv1();
            postData.timestamp = Date.now();
            createPost(Object.assign({}, postData));
            this.clearPostForm();
            this.closeNewPostModal(event);
        }
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

    validatePost() {
        let result = true;
        const {postData} = this.state;
        result &= postData.bodyIsValid & postData.titleIsValid & postData.authorIsValid & postData.categoryIsValid;
        return result;
    }

    clearFilterCategory(event) {
        event.preventDefault();
        const {changeCategoryFilter} = this.props;
        changeCategoryFilter("");
    }

    orderByVoteScore(event) {
        event.preventDefault();
        const {changeOrderVoteScore} = this.props;
        changeOrderVoteScore();
    }

    orderByTimeStamp(event) {
        event.preventDefault();
        const {changeOrderTimeStamp} = this.props;
        changeOrderTimeStamp();
    }

    render() {
        const {posts, categories, orderVoteScore, orderTimeStamp} = this.props;
        const {isRemoveClick, isNewPostClick, isEditPostClick} = this.state;

        return (
            <div>
                <nav className="panel">
                <p className="panel-heading">
                    <div className="columns is-mobile">
                        <div className="column">
                            Posts
                        </div>

                        <div className="column" style={{textAlign: "right"}}>
                        <button className="button " 
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
                    </div>
                    </div>
                    
                    
                </p>
                <p className="panel-tabs">
                    <a onClick={this.clearFilterCategory}>show all</a>
                    <a onClick={this.orderByVoteScore}>vote score {orderVoteScore === "" ? "" : (orderVoteScore === "asc" ? <FaArrowDown/> : <FaArrowUp/>)}</a>
                    <a onClick={this.orderByTimeStamp}>timestamp {orderTimeStamp === "" ? "" : (orderTimeStamp === "asc" ? <FaArrowDown/> : <FaArrowUp/>)}</a>
                </p>
                </nav>
                
                {
                    posts.map(post=>(
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
                                                    <strong>{post.title}</strong>
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
                    ))
                }

                <NewPostFormModal
                    isNewPostClick={isNewPostClick}
                    postData={this.state.postData}
                    closeNewPostModal={this.closeNewPostModal}
                    saveNewPost={this.saveNewPost}
                    handleInputChange={this.handleInputChange}
                    categories={categories}
                />

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

const mapStateToProps = ({post, category}) => ({
    posts: post.posts,
    categories: category.categories,
    orderVoteScore: post.orderVoteScore,
    orderTimeStamp: post.orderTimeStamp,
    category: post.category
});

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: (id) => dispatch(deletePost(id)),
    createPost: (postData) => dispatch(createNewPost(postData)),
    votePostUp: (id) => dispatch(votePostUp(id)),
    votePostDown: (id) => dispatch(votePostDown(id)),
    editPost: (postData) => dispatch(editPost(postData)),
    changeCategoryFilter: (category) => dispatch(changeCategoryFilter(category)),
    changeOrderVoteScore: () => dispatch(changeOrderVoteScore()),
    changeOrderTimeStamp: () => dispatch(changeOrderTimeStamp())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsCard));