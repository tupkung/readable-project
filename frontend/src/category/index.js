import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';

export default class Category extends Component {



    render(){
        const {match} = this.props;
        const categoryName = match.params.category;
        return (
            <div className="container is-fluid">
                <Navbar />
                <div className="columns">
                    <div className="column">
                        <PostList 
                            categoryName={categoryName}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

