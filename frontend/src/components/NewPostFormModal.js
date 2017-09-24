import React from 'react';
import {capitalize} from '../utils/helpers';

const NewPostFormModal = ({isNewPostClick, closeNewPostModal, saveNewPost, postData, handleInputChange, categories}) => (
    <div className={"modal " + (isNewPostClick ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">New Post</p>
                <button className="delete" aria-label="close" onClick={closeNewPostModal}></button>
            </header>
            <form onSubmit={saveNewPost}>
            <section className="modal-card-body">
                
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input name="title" className={"input "+(postData.titleIsValid ? "" : "is-danger")} type="text" placeholder="Title" value={postData.title} onChange={handleInputChange}/>
                    </div>
                    <p className={"help is-danger " + (postData.titleIsValid ? "hidden" : "")}>This title is required</p>
                </div>
                <div className="field">
                    <label className="label">Body</label>
                    <div className="control">
                        <textarea name="body" className={"textarea "+(postData.bodyIsValid ? "" : "is-danger")} type="text" placeholder="Body" value={postData.body} onChange={handleInputChange}></textarea>
                    </div>
                    <p className={"help is-danger " + (postData.bodyIsValid ? "hidden" : "")}>This body is required</p>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                    <div className={"select " + (postData.categoryIsValid ? "": "is-danger")}>
                        <select name="category" value={postData.category} onChange={handleInputChange}>
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
                </div>
                <div className="field">
                    <label className="label">Author</label>
                    <div className="control">
                        <input name="author" className={"input " + (postData.authorIsValid ? "" : "is-danger")} type="text" placeholder="Author" value={postData.author} onChange={handleInputChange}/>
                    </div>
                    <p className={"help is-danger " + (postData.authorIsValid ? "hidden" : "")}>This author is required</p>
                </div>
                
            </section>
            <footer className="modal-card-foot">
                <button type="submit" className="button is-success">Save</button>
                <button className="button" onClick={closeNewPostModal}>Cancel</button>
            </footer>
            </form>
        </div>
    </div>
);

export default NewPostFormModal;