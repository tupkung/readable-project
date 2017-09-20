import React, {Component} from 'react';
import {FaAngleDoubleRight, FaSearch, FaArrowDown, FaArrowUp} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {fetchCategories, searchCategories, searchPostsByCategory, clearFilterCategoryFromPosts, fetchPosts} from '../actions';
import {connect} from 'react-redux';

class CategoriesPanel extends Component {

    

    constructor(props){
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.clearFilterCategory = this.clearFilterCategory.bind(this);
        this.orderByVoteScore = this.orderByVoteScore.bind(this);
        this.orderByTimeStamp = this.orderByTimeStamp.bind(this);
        this.clearLocalState = this.clearLocalState.bind(this);
        this.state = {
            orderVoteScore: 2,
            orderTimeStamp: 0,
            searchCategories: ""
        };
    }

    clearLocalState() {
        this.setState({
            orderVoteScore: 2,
            orderTimeStamp: 0,
            searchCategories: ""
        });
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
        const {orderVoteScore, orderTimeStamp} = this.state;
        const byTimeStamp = (orderVoteScore === 0 ? true : false);
        const sortFactor = (byTimeStamp ? orderTimeStamp : orderVoteScore);
        searchPostsByCategory(category.name, sortFactor, byTimeStamp);
        this.setState({
            searchCategories: category.name
        });
    }

    clearFilterCategory(event) {
        event.preventDefault();
        const {clearFilterCategoryFromPosts} = this.props;
        clearFilterCategoryFromPosts();
        this.clearLocalState();
    }

    orderByVoteScore(event) {
        event.preventDefault();
        const {fetchPosts} = this.props;
        const {orderVoteScore, searchCategories} = this.state;
        const sortFactor = (orderVoteScore === 2 ? 0 : orderVoteScore + 1);
        if(searchCategories.length === 0){
            fetchPosts(sortFactor);
        }else{
            searchPostsByCategory(searchCategories, sortFactor);
        }
        
        this.setState({
            orderVoteScore: sortFactor,
            orderTimeStamp: 0
        });
    }

    orderByTimeStamp(event) {
        event.preventDefault();
        const {fetchPosts} = this.props;
        const {orderTimeStamp, searchCategories} = this.state;
        const sortFactor = (orderTimeStamp === 2 ? 0 : orderTimeStamp + 1);
        if(searchCategories.length === 0) {
            fetchPosts(sortFactor, true);
        }else{
            searchPostsByCategory(searchCategories, sortFactor, true);
        }
        
        this.setState({
            orderVoteScore: 0,
            orderTimeStamp: sortFactor
        });
    }

    render() {
        const {categories} = this.props;
        const {orderVoteScore, orderTimeStamp} = this.state;

        return (
            <nav className="panel">
                <p className="panel-heading">
                    Categories
                </p>
                <p className="panel-tabs">
                    <a onClick={this.clearFilterCategory}>show all</a>
                    <a onClick={this.orderByVoteScore}>vote score {orderVoteScore === 0 ? "" : (orderVoteScore === 1 ? <FaArrowDown/> : <FaArrowUp/>)}</a>
                    <a onClick={this.orderByTimeStamp}>timestamp {orderTimeStamp === 0 ? "" : (orderTimeStamp === 1 ? <FaArrowDown/> : <FaArrowUp/>)}</a>
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
                {/* <div className="panel-block">
                    <button className="button is-primary is-outlined is-fullwidth" >
                        reset all filters
                    </button>
                </div> */}
            </nav>
        );
    }
}

const mapStateToProps = ({category}) => ({
    categories: category.categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: (sortFactor) => dispatch(fetchPosts(sortFactor)),
    searchCategories: (query) => dispatch(searchCategories(query)),
    searchPostsByCategory: (category) => dispatch(searchPostsByCategory(category)),
    clearFilterCategoryFromPosts: () => dispatch(clearFilterCategoryFromPosts())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesPanel);