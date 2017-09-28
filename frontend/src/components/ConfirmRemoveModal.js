import React from 'react';

/**
 * @description Represents a confirm remove modal
 * @param {boolean} isRemoveClick - For checking to user is click remove button.
 * @param {function} closeConfirmModal - Call-back function to be called when user click Close or Cancel button in the modal.
 * @param {function} onRemoveClick - Call-back function to be called when user click Yes button in the modal.
 */
const ConfirmRemoveModal = ({isRemoveClick, closeConfirmModal, onRemoveClick}) => (
    <div className={"modal " + (isRemoveClick ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">Please confirm</p>
            <button className="delete" aria-label="close" onClick={closeConfirmModal}></button>
            </header>
            <section className="modal-card-body">
                <p className="title has-text-danger">Do you want to delete?</p>
            </section>
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={onRemoveClick}>Yes</button>
            <button className="button" onClick={closeConfirmModal}>Cancel</button>
            </footer>
        </div>
    </div>
);


export default ConfirmRemoveModal;