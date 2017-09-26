import React from 'react';


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