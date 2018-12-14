import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

class Recommendations extends Component {

    state = {
        lon: null,
        lat: null,
        results: [],
        error: false,
    }

    getGeoLoation = _ => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.onPositionUpdated,
                this.getLocationFromIP, {
                    maximumAge: 60000
                });
        } else {
            this.getLocationFromIP();
        }
    }

    onPositionUpdated = (position) => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ lon: position.coords.longitude });
        this.loadNearbyItems();
    }

    // getLocationFromIP = _ => {
    //     console.log('navigator.geolocation is not available');
    //     // get location from http://ipinfo.io/json
    //     axios.get('http://ipinfo.io/json').then(response => {
    //         console.log(response);
    //           if ('loc' in response.data) {
    //             this.setState({lat: loc[0]});
    //             this.setState({lng: loc[1]});
    //           } else {
    //             console.warn('Getting location by IP failed.');
    //           }
    //         this.loadNearbyItems();
    //     });
    // }

    loadNearbyItems = _ => {
        console.log('lon: ' + this.state.lon + '; lat: ' + this.state.lat);

        const data = {
            params: {
                user_id: this.props.user_id,
                lon: this.state.lon,
                lat: this.state.lat
            }
        }

        axios.get('http://3.16.29.66:8080/PhillyGastronomer/recommendation', data).then(response => {
            console.log(response);
            let results = response.data;
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
                    case 0:
                        transformedItem.price_range = 'N/A';
                        break;
                    default: break;
                }
                let category = '';
                for (var i = 0; i < transformedItem.categories.length; i++) {
                    category += transformedItem.categories[i] + ' ';
                }
                transformedItem.categories = category;
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
            this.setState({ results: transformedResults });
        }).catch(error => {
            console.log(error);
            this.setState({ error: true });
        });
    }

    componentDidMount() {
        this.getGeoLoation();
    }

    render() {
        let restaurants = null;
        if (!this.state.error) {
            console.log(this.state.query);

            restaurants = (this.state.results).map((item, index) => {
                return (
                    <RestaurantCard
                        key={index}
                        user_id={this.props.user_id}
                        id={item.item_id}
                        name={item.name}
                        address={item.address}
                        rating={item.rating}
                        price_range={item.price_range}
                        category={item.categories}
                        transit_score={item.transit_score}
                        walk_score={item.walk_score}
                        bike_score={item.bike_score}
                        happy_hour={item.happyhour}
                        food_quality={item.food_quality}
                        service_quality={item.service_quality}
                        hasButton={true}
                    />
                );
            });
        }
        return (
            <div>
                <h1 style={{ margin: 50, textAlign: "center" }}>Recommendations</h1>
                {restaurants}
            </div>
        );
    }
}

export default Recommendations;