import React from 'react';
import classes from './RestaurantCard.css';
import {
    Card, CardText, CardBody, Button,
    CardTitle, CardSubtitle, Container, Row, Col
} from 'reactstrap';
import StarRatings from 'react-star-ratings';

const restaurantCard = (props) => {

    return (
        <div>
            <Card className={classes.card}>
                <CardBody>
                    <CardTitle tag="h3">Restaurant name</CardTitle>
                    <CardSubtitle tag="h4">Address</CardSubtitle>
                    <CardText>
                        <Container>
                            <Row>
                                <Col>Rating: 
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        starSpacing="3px"
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </CardText>
                    <Button color="danger">Add to favorite</Button>
                </CardBody>
            </Card>
        </div>
    );
};


export default restaurantCard;