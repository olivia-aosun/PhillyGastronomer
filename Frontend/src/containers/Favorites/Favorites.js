import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

class Favorites extends Component{
    state = {
        results: [],
        error: false
    }

    componentDidMount() {
        let results = [];
        const query = {params: {user_id: this.props.user_id}};
        console.log(this.props.user_id);
        axios.get('http://3.16.29.66:8080/PhillyGastronomer/getFavorite', query)
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
                        default: break;
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

    }

    render(){
        let restaurants = null;
        console.log(this.state.results);
        if (!this.state.error) {
            restaurants = (this.state.results).map((item, index) => {
                return (
                    <RestaurantCard
                        key={index}
                        user_id={this.props}
                        id={item.item_id}
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
                        hasButton={false}
                    />
                );
            });
        }
        return (
            <div>
                <h1 style={{margin: 50, textAlign: "center"}}>Your favorite restaurants:</h1>
                {restaurants}
                
            </div>
        );
    }   
}

export default Favorites;