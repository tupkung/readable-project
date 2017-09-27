import React from 'react';

const EditCommentFormModal = ({isEditCommentClick, closeEditCommentModal, commentData, saveEditComment, handleInputChange}) => (
    <div className={"modal " + (isEditCommentClick ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Edit Comment</p>
                <button className="delete" aria-label="close" onClick={closeEditCommentModal}></button>
            </header>
            <form onSubmit={saveEditComment}>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Body</label>
                        <div className="control">
                            <textarea name="body" className={"textarea "+(commentData.bodyIsValid ? "" : "is-danger")} type="text" placeholder="Body" value={commentData.body} onChange={handleInputChange}></textarea>
                        </div>
                        <p className={"help is-danger " + (commentData.bodyIsValid ? "hidden" : "")}>This body is required</p>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success">Save</button>
                    <button className="button" onClick={closeEditCommentModal}>Cancel</button>
                </footer>
            </form>
        </div>
    </div>
);

export default EditCommentFormModal;