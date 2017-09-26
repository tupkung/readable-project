import React, {Component} from 'react';
import uuidv1 from 'uuid/v1';

class CommentNewFormModal extends Component {

    render() {
        return (
            <div>
                <div className={"modal " + (openModal ? "is-active" : "")}>
                    <div className="modal-background"></div>
                    <div className="modal-card"></div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        );
    }
}