import React, {Component} from 'react';
import {FaInfoCircle, FaTimesCircleO} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {connect} from 'react-redux';
import {deletePost} from '../actions';
import {fetchPosts} from '../actions';


class PostsCard extends Component {
    state = {
        isRemoveClick: false,
        selectedPost: {}
    };

    constructor(props){
        super(props);

        this.removePost = this.removePost.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
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

    render() {
        const {posts} = this.props;
        const {isRemoveClick} = this.state;

        return (
            <div>
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
                                                    <small>{(new Date(post.timestamp)).toString()}</small>
                                                </p>
                                            </div>
                                            </div>
                                            <div className="column">
                                                <nav className="level">
                                                    <div className="level-left">
                                                        <div className="level-item has-text-centered">
                                                            <div>
                                                                <p className="heading">Votes</p>
                                                                <p className="title">{post.voteScore}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </nav>
                                            </div>
                                            <div className="column">
                                                <button className="button is-danger is-outlined" onClick={(event) => this.openConfirmModal(event,post)}>
                                                    <span>Delete</span>
                                                    <span className="icon is-small">
                                                        <FaTimesCircleO />
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

const mapStateToProps = ({post}) => ({
    posts: post.posts
});

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    removePost: (id) => dispatch(deletePost(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsCard);