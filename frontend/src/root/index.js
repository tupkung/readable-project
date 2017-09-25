import React, {Component} from 'react';
import CategoriesPanel from '../components/CategoriesPanel';
import Navbar from '../components/Navbar';
import PostsCard from '../components/PostsCard';
import {FaRocket} from 'react-icons/lib/fa';


export default class Root extends Component {
    render() {
        return (
            <div className="container is-fluid">
                <Navbar/>
                <section className="hero is-white">
                    <div className="hero-body">
                        <div className="columns">
                            <div className="column" style={{textAlign:"center"}}>
                                <FaRocket size={52}/>
                            </div>
                            <div className="column is-11">
                                <p className="title">
                                Readable Project
                                </p>
                                <p className="subtitle">
                                Everything you need to learn to <strong>create a web application</strong> with React
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="columns">
                    <div className="column is-one-quarter">
                        <CategoriesPanel/>
                    </div>
                    <div className="column">
                        <PostsCard/>
                    </div>
                </div>
            </div>
        );
    }    
}