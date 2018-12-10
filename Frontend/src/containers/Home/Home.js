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
        results: [],
        error: false
    }
    searchBar=React.createRef();

    clickSearch = event => {
        let url = 'http://3.16.29.66:8080/PhillyGastronomer/' 
            + (this.state.status === 'searchBar' ? 'SearchForRestaurant' : 'filter');
        const searchQuery = {
            params: {
                name: this.state.query
            }
        };
        console.log(searchQuery);
        axios.get(url, searchQuery)
            .then(response => {
                console.log(response.data);
                this.setState({results: response.data });
            })
            .catch( error => {
                console.log( error );
                this.setState({error: true});
            } );;
        this.searchBar.current.clearValue();
    }

    selectTab(event) {
        this.setState({status: event});
        this.setState({results: []});
    }

    onUpdate(event) {
        this.setState({query: event});
    }

    render () {
        let restaurants = null;
        if (!this.state.error) {
            restaurants = (this.state.results).map( item => {
                // process price_range
                switch (item.price_range){
                    case 5:
                        item.price_range = '$$$$$';
                        break;
                    case 4:
                        item.price_range = '$$$$';
                        break;
                    case 3:
                        item.price_range = '$$$';
                        break;
                    case 2:
                        item.price_range = '$$';
                        break;
                    case 1:
                        item.price_range = '$';
                        break;
                }
                // remove quotes in address
                item.address = item.address.replace(/"/g, "");
                // process happy_hour
                if (typeof(item['happyhour']) == 'undefined'){item.happyhour='N/A';}
                else if (typeof(item['details']) != 'undefined') {item.happyhour=item.happyhour + '; Details: ' + item.details}
                // process transit_score
                if (typeof(item['transit_score']) == 'undefined'){item.transit_score='N/A';}
                // process walk_score
                if (typeof(item['walk_score']) == 'undefined'){item.walk_score='N/A';}
                // process bike_score
                if (typeof(item['bike_score']) == 'undefined'){item.bike_score='N/A';}
                // process food_quality
                if (typeof(item['food_quality']) == 'undefined'){item.food_quality='N/A';}
                // process service_quality
                if (typeof(item['service_quality']) == 'undefined'){item.service_quality='N/A';}
                return (
                    <RestaurantCard 
                        key={item.name}
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
            <ProjectJumbotron/>
            <Tabs activeKey={this.state.status} onSelect={this.selectTab.bind(this)} id="tabs" className={classes.tabs}>
                <Tab eventKey="searchBar" title="Search a restaurant">
                    <SearchBar ref={this.searchBar} onUpdate={this.onUpdate.bind(this)}></SearchBar>
                </Tab>
                <Tab eventKey="filter" title="Filter restaurants">
                    <Filter onUpdate={this.onUpdate.bind(this)}></Filter>
                </Tab>
            </Tabs>
            <ButtonToolBar className={classes.buttonToolBar}>
                <Button className={classes.searchButton} onClick={this.clickSearch}>Search</Button>
            </ButtonToolBar>
            <div>
                {restaurants}
            </div>
            </div>
        );
    }
};

export default Home;