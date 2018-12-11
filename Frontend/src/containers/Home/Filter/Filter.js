import React, { Component } from 'react';
import { SplitButton, MenuItem } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import StarRatings from 'react-star-ratings';
import classes from './Filter.css';
import axios from 'axios'; 
 

class Filter extends Component {
    state = {
        options: {
            rating: '',
            category: '',
            price_range: '',
            food_quality: '',
            service_quality: '',
            transit_score: '',
            walk_score: '',
            bike_score: '',
            happy_hour: ''
        },
        error: false,
        categories:[]
    }

    componentDidMount(){
        axios.get('http://3.16.29.66:8080/PhillyGastronomer/category').then(response => {
            console.log(response);
            this.setState({categories: response.data});
        })
        .catch( error => {
            console.log( error );
            this.setState({error: true});
        });
    }

    selectRating(event) {
        var options = this.state.options;
        options.rating = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectCategory(event) {
        var options = this.state.options;
        options.category = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectPriceRange(event) {
        var options = this.state.options;
        options.price_range = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectFoodQuality(event) {
        var options = this.state.options;
        options.food_quality = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectServiceQuality(event) {
        var options = this.state.options;
        options.service_quality = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectTransitScore(event) {
        var options = this.state.options;
        options.transit_score = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectWalkScore(event) {
        var options = this.state.options;
        options.walk_score = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectBikeScore(event) {
        var options = this.state.options;
        options.bike_score = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    selectHappyHour(event) {
        var options = this.state.options;
        options.happy_hour = event;
        this.setState({ options: options });
        this.props.onUpdate(this.state.options);
    }

    clearValue() {
        var options = this.state.options;
        options.rating = '';
        options.category = '';
        options.price_range = '';
        options.food_quality = '';
        options.service_quality = '';
        options.transit_score = '';
        options.walk_score = '';
        options.bike_score = '';
        options.happy_hour = '';
        this.setState({options: options});
    }

    render() {
        let categories = <div><MenuItem key="American" eventKey="American">American</MenuItem>
            <MenuItem key="Mexican" eventKey="Mexican">Mexican</MenuItem>
            <MenuItem key="Asian" eventKey="Asian">Asian</MenuItem>
            <MenuItem key="Chinese" eventKey="Chinese">Chinese</MenuItem>
            <MenuItem key="Japanese" eventKey="Japanese">Japanese</MenuItem>
            <MenuItem key="Korean" eventKey="Korean">Korean</MenuItem></div>;
        if (!this.state.error) {
            categories = this.state.categories.map((category) => {
                return (<MenuItem key={category.category} eventKey={category.category}>{category.category}</MenuItem>);
            });
        } 
        return (
            <div>
                <ButtonToolBar className={classes.buttonToolBar}>
                    <SplitButton
                        title={'Rating: ' + this.state.options.rating}
                        onSelect={this.selectRating.bind(this)}
                        id={'splitbutton-rating'}>
                        <MenuItem eventKey="5">
                            <StarRatings
                                rating={5}
                                starRatedColor="red"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="5px"
                            />
                        </MenuItem>
                        <MenuItem eventKey="4">
                            <StarRatings
                                rating={4}
                                starRatedColor="red"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="5px"
                            />
                        </MenuItem>
                        <MenuItem eventKey="3">
                            <StarRatings
                                rating={3}
                                starRatedColor="red"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="5px"
                            />
                        </MenuItem>
                        <MenuItem eventKey="2">
                            <StarRatings
                                rating={2}
                                starRatedColor="red"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="5px"
                            />
                        </MenuItem>
                        <MenuItem eventKey="1">
                            <StarRatings
                                rating={1}
                                starRatedColor="red"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="5px"
                            />
                        </MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={'Category: ' + this.state.options.category}
                        id={'splitbutton-category'}
                        onSelect={this.selectCategory.bind(this)}
                    > 
                        <MenuItem eventKey="">Unselect</MenuItem>
                        {categories}
                    </SplitButton>
                    <SplitButton
                        title={'Price range: ' + this.state.options.price_range}
                        id={'splitbutton-pricerange'}
                        onSelect={this.selectPriceRange.bind(this)}
                    >
                        <MenuItem eventKey="$$$$">$$$$</MenuItem>
                        <MenuItem eventKey="$$$">$$$</MenuItem>
                        <MenuItem eventKey="$$">$$</MenuItem>
                        <MenuItem eventKey="$">$</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={'Food quality: ' + this.state.options.food_quality}
                        id={'splitbutton-foodquality'}
                        onSelect={this.selectFoodQuality.bind(this)}
                    >
                        <MenuItem eventKey="Below 3">Below 3</MenuItem>
                        <MenuItem eventKey="3-5">3-5</MenuItem>
                        <MenuItem eventKey="6-10">6-10</MenuItem>
                        <MenuItem eventKey="10 and above">10 and above</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={'Service quality: ' + this.state.options.service_quality}
                        id={'splitbutton-servicequality'}
                        onSelect={this.selectServiceQuality.bind(this)}
                    >
                        <MenuItem eventKey="Below 3">Below 3</MenuItem>
                        <MenuItem eventKey="3-5">3-5</MenuItem>
                        <MenuItem eventKey="6-10">6-10</MenuItem>
                        <MenuItem eventKey="10 and above">10 and above</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                </ButtonToolBar>
                <ButtonToolBar className={classes.buttonToolBar}>
                    <SplitButton
                        title={'Transit score: ' + this.state.options.transit_score}
                        id={'splitbutton-transitscore'}
                        onSelect={this.selectTransitScore.bind(this)}
                    >
                        <MenuItem eventKey="Above 75">Above 75</MenuItem>
                        <MenuItem eventKey="50-75">50-75</MenuItem>
                        <MenuItem eventKey="25-50">25-50</MenuItem>
                        <MenuItem eventKey="0-25">0-25</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={'Walk score: ' + this.state.options.walk_score}
                        id={'splitbutton-walkscore'}
                        onSelect={this.selectWalkScore.bind(this)}
                    >
                        <MenuItem eventKey="Above 75">Above 75</MenuItem>
                        <MenuItem eventKey="50-75">50-75</MenuItem>
                        <MenuItem eventKey="25-50">25-50</MenuItem>
                        <MenuItem eventKey="0-25">0-25</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={'Bike score: ' + this.state.options.bike_score}
                        id={'splitbutton-bikescore'}
                        onSelect={this.selectBikeScore.bind(this)}
                    >
                        <MenuItem eventKey="Above 75">Above 75</MenuItem>
                        <MenuItem eventKey="50-75">50-75</MenuItem>
                        <MenuItem eventKey="25-50">25-50</MenuItem>
                        <MenuItem eventKey="0-25">0-25</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={'Happy hour: ' + this.state.options.happy_hour}
                        id={'splitbutton-happyhour'}
                        onSelect={this.selectHappyHour.bind(this)}
                    >
                        <MenuItem eventKey="Yes">Yes</MenuItem>
                        <MenuItem eventKey="No">No</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                </ButtonToolBar>
            </div>  
        );
    }
};

export default Filter;