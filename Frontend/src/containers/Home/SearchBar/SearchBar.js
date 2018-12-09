import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import classes from './SearchBar.css';
import axios from 'axios';

class SearchBar extends Component {

    state = {
        searchQuery: " ",
        results: []
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ searchQuery: value }); 
    } 

    clickSearch = event => {
        axios.get('http://localhost:8080/PhillyGastronomer/searchRestaurant', this.state)
            .then(response => {
                const dataBack = response.data.slice(0, 6);
                this.setState({results: dataBack });
            });
    }

    render() {
        return (
            <Form inline className={classes.SearchBar}>
                <FormGroup controlId="search" >
                    <FormControl
                        style={{ width: 500 }}
                        type="text"
                        value={this.state.searchQuery}
                        placeholder="Search a restaurant"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>
            </Form>
        );
    }
}

export default SearchBar;