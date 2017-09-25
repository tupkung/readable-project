import React, {Component} from 'react';
import {FaPlusCircle, FaArrowDown, FaArrowUp} from 'react-icons/lib/fa';
import {connect} from 'react-redux';
import {
    fetchPosts, 
    changeCategoryFilter,
    changeOrderVoteScore,
    changeOrderTimeStamp} from '../actions';

import {withRouter} from 'react-router-dom';
import NewPostFormModal from '../components/NewPostFormModal';
import PostCard from '../components/PostCard';



class PostList extends Component {
    state = {
        isNewPostClick: false
    };

    constructor(props){
        super(props);

        this.openNewPostModal = this.openNewPostModal.bind(this);
        this.clearFilterCategory = this.clearFilterCategory.bind(this);
        this.orderByVoteScore = this.orderByVoteScore.bind(this);
        this.orderByTimeStamp = this.orderByTimeStamp.bind(this);
        this.onCloseNewPostModal = this.onCloseNewPostModal.bind(this);
    }

    componentDidMount() {
        const {fetchPosts} = this.props;
        fetchPosts();
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

    openNewPostModal(event) {
        event.preventDefault();
        this.setState({
            isNewPostClick: true
        });
    }

    onCloseNewPostModal() {
        this.setState({
            isNewPostClick: false
        });
    }

    render() {
        const {posts, orderVoteScore, orderTimeStamp} = this.props;
        const {isNewPostClick} = this.state;

        return (
            <div>
                <nav className="panel">
                <div className="panel-heading">
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
                    
                    
                </div>
                <div className="panel-tabs">
                    <a onClick={this.clearFilterCategory}>show all</a>
                    <a onClick={this.orderByVoteScore}>vote score {orderVoteScore === "" ? "" : (orderVoteScore === "asc" ? <FaArrowDown/> : <FaArrowUp/>)}</a>
                    <a onClick={this.orderByTimeStamp}>timestamp {orderTimeStamp === "" ? "" : (orderTimeStamp === "asc" ? <FaArrowDown/> : <FaArrowUp/>)}</a>
                </div>
                </nav>
                
                {
                    posts.map(post=>{
                        post.body = null;
                        return (
                            <PostCard post={post} key={post.id}/>
                        );
                    })
                }

                <NewPostFormModal
                    openModal={isNewPostClick}
                    onCloseModal={this.onCloseNewPostModal}
                />

                

                
            </div>
        );
    }
}

const mapStateToProps = ({post, category}) => ({
    posts: post.posts,
    orderVoteScore: post.orderVoteScore,
    orderTimeStamp: post.orderTimeStamp,
    category: post.category
});

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    changeCategoryFilter: (category) => dispatch(changeCategoryFilter(category)),
    changeOrderVoteScore: () => dispatch(changeOrderVoteScore()),
    changeOrderTimeStamp: () => dispatch(changeOrderTimeStamp())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList));