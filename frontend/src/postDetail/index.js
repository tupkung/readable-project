import React, {Component} from 'react';

export default class PostDetail extends Component {
    render(){
        return (
            <div>
                <h1>Post Detail {this.props.match.params.id}</h1>
            </div>
        );
    }
}