import React, {Component} from 'react';
import Filter from './Filter/Filter';
import SearchBar from './SearchBar/SearchBar';
import ProjectJumbotron from '../../components/ProjectJumbotron/ProjectJumbotron';
import { Tabs, Tab, Button } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import classes from './Home.css';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import axios from 'axios';  

class Home extends Component {
    state = {
        status: 'searchBar',
        query: null,
        results: []
    }

    clickSearch = event => {
        let url = 'http://3.16.29.66:8080/PhillyGastronomer/' + 
            (this.state.status === 'searchBar' ? 'searchRestaurant' : 'filter');
        console.log(url);
        console.log(this.state.query);
        axios.get(url, this.state.query)
            .then(response => {
                console.log(response);
                // const dataBack = response.data.slice(0, 6);
                // this.setState({results: dataBack });
            });
    }

    selectTab(event) {
        this.setState({status: event});
    }

    onUpdate(event) {
        console.log('val:' + event);
        this.setState({query: event});
        console.log('query:' + JSON.stringify(this.state.query));
    }

    render () {
        return (
            <div>
            <ProjectJumbotron/>
            <Tabs activeKey={this.state.status} onSelect={this.selectTab.bind(this)} id="tabs" className={classes.tabs}>
                <Tab eventKey="searchBar" title="Search a restaurant">
                    <SearchBar onUpdate={this.onUpdate.bind(this)}></SearchBar>
                </Tab>
                <Tab eventKey="filter" title="Filter restaurants">
                    <Filter onUpdate={this.onUpdate.bind(this)}></Filter>
                </Tab>
            </Tabs>
            <ButtonToolBar className={classes.buttonToolBar}>
                <Button className={classes.searchButton} onClick={this.clickSearch}>Search</Button>
            </ButtonToolBar>
            </div>
        );
    }
};

export default Home;