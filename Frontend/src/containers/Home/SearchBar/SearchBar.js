import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import classes from './SearchBar.css';
import axios from 'axios';

class SearchBar extends Component {

    state = {
        query: ''
    }

    handleChange = event => {
        const value = event.target.value;
        console.log(value);
        this.setState({ query: value }); 
        this.props.onUpdate(value);
    } 

    render() {
        return (
            <Form inline className={classes.SearchBar}>
                <FormGroup controlId="search" >
                    <FormControl
                        style={{ width: 500 }}
                        type="text"
                        value={this.state.query.name}
                        placeholder="Search a restaurant"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>
            </Form>
        );
    }
}

export default SearchBar;