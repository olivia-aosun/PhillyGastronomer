import React, { Component } from 'react';
import classes from './RestaurantCard.css';
import { CardBody, Button, CardTitle, CardSubtitle, Container, Row, Col } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class restaurantCard extends Component {

    addToFavorite(event) {
        const query = { 
            item_id: this.props.id,
            user_id: this.props.userid
        };
        axios.post('http://3.16.29.66:8080/PhillyGastronomer/favorite', query).then((response) => {
            console.log(response);
        });
    }
    render() {
        // console.log()
        const button = this.props.hasButton ? <Button color="danger" className="float-right" onClick={this.addToFavorite.bind(this)}>Add to favorite</Button> : null;
        return (
            <div className={classes.card}>
                <CardBody>
                    <CardTitle tag="h3" className={classes.title}>{this.props.name}</CardTitle>
                    <CardSubtitle tag="h5" className={classes.subtitle}>{this.props.address}</CardSubtitle>
                    <div style={{ margin: 20 }}>
                        <Container>
                            <Row>
                                <Col xs={3} md={3}>{'Rating: '}
                                    <StarRatings
                                        rating={this.props.rating}
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        starDimension="13px"
                                        starSpacing="2.5px"
                                    />
                                </Col>
                                <Col xs={3} md={3}>Price rage: {this.props.price_range}</Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={3}>Category: {this.props.category}</Col>
                                <Col xs={3} md={3}>Transit score: {this.props.transit_score}</Col>
                            </Row>
                            <Row>

                                <Col xs={3} md={3}>Walk score: {this.props.walk_score}</Col>
                                <Col xs={3} md={3}>Bike score: {this.props.bike_score}</Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={3}>Food quality: {this.props.food_quality}</Col>
                                <Col xs={3} md={3}>Service quality: {this.props.service_quality}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={6}>Happy hour: {this.props.happy_hour}</Col>
                            </Row>
                        </Container>
                    </div>
                    {button}
                </CardBody>
            </div>
        );
    };
}


export default restaurantCard;