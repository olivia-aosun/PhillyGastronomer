import React, { Component } from 'react';
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
        results: [],
        error: false
    }
    searchBar = React.createRef();
    filter = React.createRef();

    clickSearch = _ => {
        let url = 'http://3.16.29.66:8080/PhillyGastronomer/';
        let searchQuery = { params: {} };
        if (this.state.status === 'searchBar') {
            url = url + 'SearchForRestaurant';
            searchQuery.params = { name: this.state.query };
        } else {
            url = url + 'filter';
            const originalOptions = this.state.query;
            if (originalOptions.rating !== '') { searchQuery.params.rating = originalOptions.rating; }
            if (originalOptions.category !== '') { searchQuery.params.category = originalOptions.category; }
            if (originalOptions.price_range !== '') { searchQuery.params.price_range = originalOptions.price_range; }
            if (originalOptions.food_quality !== '') { searchQuery.params.food_quality = originalOptions.food_quality; }
            if (originalOptions.service_quality !== '') { searchQuery.params.service_quality = originalOptions.service_quality; }
            if (originalOptions.transit_score !== '') { searchQuery.params.transit_score = originalOptions.transit_score; }
            if (originalOptions.bike_score !== '') { searchQuery.params.bike_score = originalOptions.bike_score; }
            if (originalOptions.walk_score !== '') { searchQuery.params.walk_score = originalOptions.walk_score; }
            if (originalOptions.happy_hour !== '') { searchQuery.params.happy_hour = originalOptions.happy_hour; }
        }
        let results = [];
        axios.get(url, searchQuery)
            .then(response => {
                console.log(response);
                results = response.data;
                let transformedResults = results.map((item) => {
                    let transformedItem = item;
                    // process price_range
                    switch (transformedItem.price_range) {
                        case 4:
                            transformedItem.price_range = '$$$$';
                            break;
                        case 3:
                            transformedItem.price_range = '$$$';
                            break;
                        case 2:
                            transformedItem.price_range = '$$';
                            break;
                        case 1:
                            transformedItem.price_range = '$';
                            break;
                    }
                    // remove quotes in address
                    transformedItem.address = transformedItem.address.replace(/"/g, "");
                    // process happy_hour
                    if (typeof (transformedItem['happyhour']) == 'undefined') { transformedItem.happyhour = 'N/A'; }
                    else if (typeof (transformedItem['details']) != 'undefined') { transformedItem.happyhour = transformedItem.happyhour + '; Details: ' + transformedItem.details }
                    // process transit_score
                    if (typeof (transformedItem['transit_score']) == 'undefined') { transformedItem.transit_score = 'N/A'; }
                    // process walk_score
                    if (typeof (transformedItem['walk_score']) == 'undefined') { transformedItem.walk_score = 'N/A'; }
                    // process bike_score
                    if (typeof (transformedItem['bike_score']) == 'undefined') { transformedItem.bike_score = 'N/A'; }
                    // process food_quality
                    if (typeof (transformedItem['food_quality']) == 'undefined') { transformedItem.food_quality = 'N/A'; }
                    // process service_quality
                    if (typeof (transformedItem['service_quality']) == 'undefined') { transformedItem.service_quality = 'N/A'; }
                    return transformedItem;
                });
                this.setState({results: transformedResults});
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: true });
            });
        this.searchBar.current.clearValue();
        this.filter.current.clearValue();
    }

    selectTab(event) {
        this.setState({ status: event });
        this.setState({ results: [] });
    }

    onUpdate(event) {
        this.setState({ query: event });
    }

    render() {
        let restaurants = null;
        console.log(this.state.results);
        if (!this.state.error) {
            restaurants = (this.state.results).map((item, index) => {
                return (
                    <RestaurantCard
                        key={index}
                        name={item.name}
                        address={item.address}
                        rating={item.rating}
                        price_range={item.price_range}
                        category={item.category}
                        transit_score={item.transit_score}
                        walk_score={item.walk_score}
                        bike_score={item.bike_score}
                        happy_hour={item.happyhour}
                        food_quality={item.food_quality}
                        service_quality={item.service_quality}
                    />
                );
            });
        }
        return (
            <div>
                <ProjectJumbotron />
                <Tabs activeKey={this.state.status} onSelect={this.selectTab.bind(this)} id="tabs" className={classes.tabs}>
                    <Tab eventKey="searchBar" title="Search a restaurant">
                        <SearchBar ref={this.searchBar} onUpdate={this.onUpdate.bind(this)}></SearchBar>
                    </Tab>
                    <Tab eventKey="filter" title="Filter restaurants">
                        <Filter ref={this.filter} onUpdate={this.onUpdate.bind(this)}></Filter>
                    </Tab>
                </Tabs>
                <ButtonToolBar className={classes.buttonToolBar}>
                    <Button className={classes.searchButton} onClick={this.clickSearch}>Search</Button>
                </ButtonToolBar>
                <div >
                    {restaurants}
                </div>
            </div>
        );
    }
};

export default Home;