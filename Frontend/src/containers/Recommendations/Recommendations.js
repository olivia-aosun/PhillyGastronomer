import React, { Component } from 'react';

class Recommendations extends Component{

    state = {
        lon: null,
        lat: null
    }

    getGeoLoation = _ => {
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //       onPositionUpdated,
        //       onLoadPositionFailed, {
        //         maximumAge: 60000
        //       });
        //     showLoadingMessage('Retrieving your location...');
        //   } else {
        //     onLoadPositionFailed();
        //   }
    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
                <h1>Recommendations</h1>
            </div>
        );
    }   
}

export default Recommendations;