import React, {Component} from 'react';
import {capitalize} from '../utils/helpers';
import {createNewPost} from '../actions';
import {withRouter} from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import {connect} from 'react-redux';

/**
 * @description Represents a new post form modal
 */
class NewPostFormModal extends Component {
    state = {
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

        this.closeNewPostModal = this.closeNewPostModal.bind(this);
        this.saveNewPost = this.saveNewPost.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validatePost = this.validatePost.bind(this);
        this.clearPostForm = this.clearPostForm.bind(this);
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
    

    closeNewPostModal(event) {
        event.preventDefault();
        const {onCloseModal} = this.props;
        onCloseModal();
    }

   

    saveNewPost(event) {
        event.preventDefault();
        if(this.validatePost()){
            let {postData} = this.state;
            const {createPost, category} = this.props;
            postData.id = uuidv1();
            postData.timestamp = Date.now();
            postData.category = (category.length > 0) ? category : postData.category;
            createPost(Object.assign({}, postData));
            this.clearPostForm();
            this.closeNewPostModal(event);
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

    validatePost() {
        let result = true;
        const {postData} = this.state;
        const {category} = this.props;
        result &= postData.bodyIsValid & postData.titleIsValid & postData.authorIsValid & (category.length === 0) ? postData.categoryIsValid : true;
        return result;
    }

    render(){
        const {openModal, categories, category} = this.props;
        const {postData} = this.state;
        return (
            <div className={"modal " + (openModal ? "is-active" : "")}>
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
                                <input name="title" className={"input "+(postData.titleIsValid ? "" : "is-danger")} type="text" placeholder="Title" value={postData.title} onChange={this.handleInputChange}/>
                            </div>
                            <p className={"help is-danger " + (postData.titleIsValid ? "hidden" : "")}>This title is required</p>
                        </div>
                        <div className="field">
                            <label className="label">Body</label>
                            <div className="control">
                                <textarea name="body" className={"textarea "+(postData.bodyIsValid ? "" : "is-danger")} type="text" placeholder="Body" value={postData.body} onChange={this.handleInputChange}></textarea>
                            </div>
                            <p className={"help is-danger " + (postData.bodyIsValid ? "hidden" : "")}>This body is required</p>
                        </div>
                        {
                            (category.length === 0) ? 
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control">
                                    <div className={"select " + (postData.categoryIsValid ? "": "is-danger")}>
                                        <select name="category" value={postData.category} onChange={this.handleInputChange}>
                                            <option value="">---Select Category---</option>
                                            {
                                                categories.map(category=>(
                                                    <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <p className={"help is-danger " + (postData.categoryIsValid ? "hidden" : "")}>This category is required</p>
                            </div>:""
                        }
                        
                        <div className="field">
                            <label className="label">Author</label>
                            <div className="control">
                                <input name="author" className={"input " + (postData.authorIsValid ? "" : "is-danger")} type="text" placeholder="Author" value={postData.author} onChange={this.handleInputChange}/>
                            </div>
                            <p className={"help is-danger " + (postData.authorIsValid ? "hidden" : "")}>This author is required</p>
                        </div>
                        
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" className="button is-success">Save</button>
                        <button className="button" onClick={this.closeNewPostModal}>Cancel</button>
                    </footer>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({category, post}) => ({
    categories: category.categories,
    category: post.category
});
const mapDispatchToProps = (dispatch) => ({
    createPost: (postData) => dispatch(createNewPost(postData))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPostFormModal));