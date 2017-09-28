import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';

/**
 * @description Represents a post list of each category page
 */
export default class CategoryContainer extends Component {
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

