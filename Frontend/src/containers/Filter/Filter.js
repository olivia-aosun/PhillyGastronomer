import React, { Component } from 'react';
import { Grid, SplitButton, Button, MenuItem } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import StarRatings from 'react-star-ratings';
import classes from './Filter.css';

class Filter extends Component {
    state = {
        rating: '',
        category: '',
        price_range: '',
        food_quality: '',
        service_quality: '',
        transit_score: '',
        walk_score: '',
        bike_score: '',
        happy_hour: ''
    }

    selectRating(event) {
        this.setState({ rating: event });
    }

    selectCategory(event) {
        this.setState({ category: event });
    }

    selectPriceRange(event) {
        this.setState({ price_range: event });
    }

    selectFoodQuality(event) {
        this.setState({ food_quality: event });
    }

    selectServiceQuality(event) {
        this.setState({ service_quality: event });
    }

    selectTransitScore(event) {
        this.setState({ transit_score: event });
    }

    selectWalkScore(event) {
        this.setState({ walk_score: event });
    }

    selectBikeScore(event) {
        this.setState({ bike_score: event });
    }

    selectHappyHour(event) {
        this.setState({ happy_hour: event });
    }

    render() {
        return (
            <div>
                <ButtonToolBar className={classes.buttonToolBar}>
                    <SplitButton
                        title={'Rating: ' + this.state.rating}
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
                        title={'Category: ' + this.state.category}
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
                        title={'Price range: ' + this.state.price_range}
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
                        title={'Food quality: ' + this.state.food_quality}
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
                        title={'Service quality: ' + this.state.service_quality}
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
                        title={'Transit score: ' + this.state.transit_score}
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
                        title={'Walk score: ' + this.state.walk_score}
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
                        title={'Bike score: ' + this.state.bike_score}
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
                        title={'Happy hour: ' + this.state.happy_hour}
                        id={'splitbutton-happyhour'}
                        onSelect={this.selectHappyHour.bind(this)}
                    >
                        <MenuItem eventKey="Yes">Yes</MenuItem>
                        <MenuItem eventKey="No">No</MenuItem>
                        <MenuItem eventKey="">Unselect</MenuItem>
                    </SplitButton>
                </ButtonToolBar>
                <ButtonToolBar className={classes.buttonToolBar}>
                    <Button className={classes.searchButton}>Search</Button>
                </ButtonToolBar>
            </div>

        );
    }

};

export default Filter;