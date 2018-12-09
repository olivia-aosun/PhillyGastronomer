import React from 'react';
import classes from './RestaurantCard.css';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
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
                        <table>
                            <tr>
                                <td>{'Rating: '}
                                    <StarRatings
                                        rating={5}
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        starDimension="15px"
                                        starSpacing="3px"
                                    /></td>
                                <td className={classes.col}>Price range: {props.price_range}</td>
                            </tr>
                        </table>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
};


export default restaurantCard;