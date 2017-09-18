import React, {Component} from 'react';
import {FaAngleDoubleRight, FaSearch} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {fetchCategories, searchCategories, searchPostsByCategory, clearFilterCategoryFromPosts} from '../actions';
import {connect} from 'react-redux';

class CategoriesPanel extends Component {

    constructor(props){
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.clearFilterCategory = this.clearFilterCategory.bind(this);
    }

    componentDidMount() {
        const {fetchCategories} = this.props;
        fetchCategories();
    }

    onSearch(event) {
        event.preventDefault();
        const {fetchCategories, searchCategories} = this.props;
        const query = event.target.value;
        if(query.length > 0){
            searchCategories(query);
        }else{
            fetchCategories();
        }
        
    }

    selectCategory(event, category) {
        event.preventDefault();
        const {searchPostsByCategory} = this.props;
        searchPostsByCategory(category.name);
    }

    clearFilterCategory(event) {
        event.preventDefault();
        const {clearFilterCategoryFromPosts} = this.props;
        clearFilterCategoryFromPosts();
    }

    render() {
        const {categories} = this.props;

        return (
            <nav className="panel">
                <p className="panel-heading">
                    Categories
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                    <input className="input is-small" type="text" placeholder="search" onKeyUp={this.onSearch}/>
                    <span className="icon is-small is-left">
                        <FaSearch/>
                    </span>
                    </p>
                </div>
                {
                    categories.map((category) => (
                        <a className="panel-block" key={category.path} onClick={(event) => this.selectCategory(event, category)}>
                            <span className="panel-icon">
                                <FaAngleDoubleRight/>
                            </span>
                            {capitalize(category.name)}
                        </a>
                    ))
                }
                <div className="panel-block">
                    <button className="button is-primary is-outlined is-fullwidth" onClick={this.clearFilterCategory}>
                        reset all filters
                    </button>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({category}) => ({
    categories: category.categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    searchCategories: (query) => dispatch(searchCategories(query)),
    searchPostsByCategory: (category) => dispatch(searchPostsByCategory(category)),
    clearFilterCategoryFromPosts: () => dispatch(clearFilterCategoryFromPosts())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesPanel);