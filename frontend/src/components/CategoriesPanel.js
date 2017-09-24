import React, {Component} from 'react';
import {FaAngleDoubleRight, FaSearch, FaArrowDown, FaArrowUp} from 'react-icons/lib/fa';
import {capitalize} from '../utils/helpers';
import {fetchCategories, 
    searchCategories, 
    changeCategoryFilter,
    changeOrderVoteScore,
    changeOrderTimeStamp} from '../actions';
import {connect} from 'react-redux';

class CategoriesPanel extends Component {

    

    constructor(props){
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.clearFilterCategory = this.clearFilterCategory.bind(this);
        this.orderByVoteScore = this.orderByVoteScore.bind(this);
        this.orderByTimeStamp = this.orderByTimeStamp.bind(this);
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

    clearFilterCategory(event) {
        event.preventDefault();
        const {changeCategoryFilter} = this.props;
        changeCategoryFilter("");
    }

    orderByVoteScore(event) {
        event.preventDefault();
        const {changeOrderVoteScore} = this.props;
        changeOrderVoteScore();
    }

    orderByTimeStamp(event) {
        event.preventDefault();
        const {changeOrderTimeStamp} = this.props;
        changeOrderTimeStamp();
    }

    render() {
        const {categories, orderVoteScore, orderTimeStamp} = this.props;

        return (
            <nav className="panel">
                <p className="panel-heading">
                    Categories
                </p>
                <p className="panel-tabs">
                    <a onClick={this.clearFilterCategory}>show all</a>
                    <a onClick={this.orderByVoteScore}>vote score {orderVoteScore === "" ? "" : (orderVoteScore === "asc" ? <FaArrowDown/> : <FaArrowUp/>)}</a>
                    <a onClick={this.orderByTimeStamp}>timestamp {orderTimeStamp === "" ? "" : (orderTimeStamp === "asc" ? <FaArrowDown/> : <FaArrowUp/>)}</a>
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

const mapStateToProps = ({category, post}) => ({
    categories: category.categories,
    orderVoteScore: post.orderVoteScore,
    orderTimeStamp: post.orderTimeStamp
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    searchCategories: (query) => dispatch(searchCategories(query)),
    changeCategoryFilter: (category) => dispatch(changeCategoryFilter(category)),
    changeOrderVoteScore: () => dispatch(changeOrderVoteScore()),
    changeOrderTimeStamp: () => dispatch(changeOrderTimeStamp())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesPanel);