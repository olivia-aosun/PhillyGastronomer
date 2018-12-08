import React, { Component } from 'react';
import { Grid, Row, Col, SplitButton, Button, MenuItem } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import StarRatings from 'react-star-ratings';

class Filter extends Component {
    state = {
        rating: 'Rating',
        category: 'Category',
        price_range: 'Price range',
        food_quality: 'Food quality',
        service_quality: 'Service quality',
        transit_score: 'Transit score',
        walk_score: 'Walk score',
        bike_score: 'Bike score'
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

    render() {
        return (
            <div>
                <ButtonToolBar>
                    <SplitButton
                        title={this.state.rating}
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
                        title={this.state.category}
                        id={'splitbutton-category'}
                        onSelect={this.selectCategory.bind(this)}
                    >
                        <MenuItem eventKey="American">American</MenuItem>
                        <MenuItem eventKey="Mexican">Mexican</MenuItem>
                        <MenuItem eventKey="Asian">Asian</MenuItem>
                        <MenuItem eventKey="Japanses">Japanses</MenuItem>
                        <MenuItem eventKey="Chinese">Chinese</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={this.state.price_range}
                        id={'splitbutton-pricerange'}
                        onSelect={this.selectPriceRange.bind(this)}
                    >
                        <MenuItem eventKey="$$$$">$$$$</MenuItem>
                        <MenuItem eventKey="$$$">$$$</MenuItem>
                        <MenuItem eventKey="$$">$$</MenuItem>
                        <MenuItem eventKey="$">$</MenuItem>
                    </SplitButton>
                    <SplitButton
                        title={this.state.food_quality}
                        id={'splitbutton-foodquality'}
                        onSelect={this.selectFoodQuality.bind(this)}
                    >
                        <MenuItem eventKey="Below 3">Below 3</MenuItem>
                        <MenuItem eventKey="3-5">3-5</MenuItem>
                        <MenuItem eventKey="6-10">6-10</MenuItem>
                        <MenuItem eventKey="10 and above">$</MenuItem>
                    </SplitButton>
                </ButtonToolBar>

                <Button type="submit" style={{margin: 20}}>Search</Button>

            </div>

        );
    }

};

export default Filter;