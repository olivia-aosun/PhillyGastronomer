import React from 'react';
import classes from './RestaurantCard.css';
import {
    Card, CardText, CardBody, Button, ButtonGroup,
    CardTitle, CardSubtitle, Container, Row, Col
} from 'reactstrap';
import StarRatings from 'react-star-ratings';

const restaurantCard = (props) => {

    return (
            <div className={classes.card}>
                <CardBody>
                    <CardTitle tag="h3" className={classes.title}>Restaurant name</CardTitle>
                    <CardSubtitle tag="h5" className={classes.subtitle}>Address</CardSubtitle>
                    <div style={{margin: 20}}>
                        <Container>
                            <Row>
                                <Col xs={3} md={3}>{'Rating: '} 
                                    <StarRatings                                       
                                        rating={5} // change to {props.rating}
                                        starRatedColor="red"
                                        numberOfStars={5} // change to {props.rating}
                                        starDimension="13px"
                                        starSpacing="2.5px"
                                    />
                                </Col>
                                <Col xs={3} md={3}>Price rage: {props.price_range}</Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={3}>Category: {props.category}</Col>
                                <Col xs={3} md={3}>Happy hour: {props.happy_hour}</Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={3}>Food quality: {props.food_quality}</Col>
                                <Col xs={3} md={3}>Service quality: {props.service_quality}</Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={3}>Food quality: {props.food_quality}</Col>
                                <Col xs={3} md={3}>Service quality: {props.service_quality}</Col>
                            </Row>
                            <Row>
                                <Col xs={2} md={2}>Transit score: {props.transit_score}</Col>
                                <Col xs={2} md={2}>Walk score: {props.walk_score}</Col>
                                <Col xs={2} md={2}>Bike score: {props.bike_score}</Col>
                            </Row>
                        </Container>
                    </div>
                    <Button color="danger" className="float-right">Add to favorite</Button>
                </CardBody>
                
            </div>
    );
};


export default restaurantCard;