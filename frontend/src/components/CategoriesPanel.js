import React, {Component} from 'react';
import {FaAngleDoubleRight, FaSearch} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {fetchCategories, 
    searchCategories, 
    changeCategoryFilter} from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class CategoriesPanel extends Component {

    

    constructor(props){
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
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
        const {changeCategoryFilter} = this.props;
        changeCategoryFilter(category.name);
    }


    render() {
        const {categories, orderVoteScore, orderTimeStamp} = this.props;

        return (
            <nav className="panel">
                <p className="panel-heading">
                    Categories
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                    <input className="input is-small" type="text" placeholder="search category" onKeyUp={this.onSearch}/>
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
            </nav>
        );
    }
}

const mapStateToProps = ({category, post}) => ({
    categories: category.categories,
    orderVoteScore: post.orderVoteScore,
    orderTimeStamp: post.orderTimeStamp
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    searchCategories: (query) => dispatch(searchCategories(query)),
    changeCategoryFilter: (category) => dispatch(changeCategoryFilter(category))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesPanel));