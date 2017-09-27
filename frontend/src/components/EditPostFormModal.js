import React from 'react';

const EditPostFormModal = ({isEditPostClick, closeEditPostModal, postData, saveEditPost, handleInputChange}) => (
    <div className={"modal " + (isEditPostClick ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Edit Post</p>
                <button className="delete" aria-label="close" onClick={closeEditPostModal}></button>
            </header>
            <form onSubmit={saveEditPost}>
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
            </section>
            <footer className="modal-card-foot">
                <button type="submit" className="button is-success">Save</button>
                <button className="button" onClick={closeEditPostModal}>Cancel</button>
            </footer>
            </form>
        </div>
    </div>
);

export default EditPostFormModal;