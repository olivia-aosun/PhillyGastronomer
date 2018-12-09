import React, { Component } from 'react';
import { Grid, SplitButton, Button, MenuItem } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import StarRatings from 'react-star-ratings';
import classes from './Filter.css';

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
        results: []
    }

    clickSearch = event => {
        axios.get('http://localhost:8080/PhillyGastronomer/filter', this.state.options)
            .then(response => {
                const dataBack = response.data.slice(0, 6);
                this.setState({results: dataBack });
            });
    }

    selectRating(event) {
        var options = this.state.options;
        options.rating = event;
        this.setState({ options: options });
    }

    selectCategory(event) {
        var options = this.state.options;
        options.category = event;
        this.setState({ options: options });
    }

    selectPriceRange(event) {
        var options = this.state.options;
        options.price_range = event;
        this.setState({ options: options });
    }

    selectFoodQuality(event) {
        var options = this.state.options;
        options.food_quality = event;
        this.setState({ options: options });
    }

    selectServiceQuality(event) {
        var options = this.state.options;
        options.service_quality = event;
        this.setState({ options: options });
    }

    selectTransitScore(event) {
        var options = this.state.options;
        options.transit_score = event;
        this.setState({ options: options });
    }

    selectWalkScore(event) {
        var options = this.state.options;
        options.walk_score = event;
        this.setState({ options: options });
    }

    selectBikeScore(event) {
        var options = this.state.options;
        options.bike_score = event;
        this.setState({ options: options });
    }

    selectHappyHour(event) {
        var options = this.state.options;
        options.happy_hour = event;
        this.setState({ options: options });
    }

    render() {
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
                        <MenuItem eventKey="American">American</MenuItem>
                        <MenuItem eventKey="Mexican">Mexican</MenuItem>
                        <MenuItem eventKey="Asian">Asian</MenuItem>
                        <MenuItem eventKey="Japanses">Japanses</MenuItem>
                        <MenuItem eventKey="Chinese">Chinese</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
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
                <ButtonToolBar className={classes.buttonToolBar}>
                    <Button className={classes.searchButton} onClick={this.clickSearch}>Search</Button>
                </ButtonToolBar>
            </div>

        );
    }

};

export default Filter;