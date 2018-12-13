import React, { Component } from 'react';
import axios from 'axios';

class Recommendations extends Component {

    state = {
        lng: null,
        lat: null
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
        this.setState({ lng: position.coords.longitude });
        this.loadNearbyItems();
    }



    getLocationFromIP = _ => {
        console.log('navigator.geolocation is not available');
        // get location from http://ipinfo.io/json
        axios.get('http://ipinfo.io/json').then(response => {
            console.log(response);
            //   if ('loc' in result) {
            //     this.setState({lat: loc[0]});
            //     this.setState({lng: loc[1]});
            //   } else {
            //     console.warn('Getting location by IP failed.');
            //   }
            this.loadNearbyItems();
        });
    }

    loadNearbyItems = _ => {
        console.log('lng: ' + this.state.lng + '; lat: ' + this.state.lat);
        console.log('loadNearbyItems');

        // // The request parameters
        // var url = './search';
        // var params = 'user_id=' + user_id + '&lat=' + lat + '&lon=' + lng;
        // var data = null;

        // // make AJAX call
        // axios.get('GET', url + '?' + params, data,
        //     // successful callback
        //     function (res) {
        //         var items = JSON.parse(res);
        //         if (!items || items.length === 0) {
        //             showWarningMessage('No nearby item.');
        //         } else {
        //             listItems(items);
        //         }
        //     },
        //     // failed callback
        //     function () {
        //         showErrorMessage('Cannot load nearby items.');
        //     }
        // );
    }

    componentDidMount() {
        this.getGeoLoation();
    }

    render() {
        return (
            <div>
                <h1>Recommendations</h1>
            </div>
        );
    }
}

export default Recommendations;