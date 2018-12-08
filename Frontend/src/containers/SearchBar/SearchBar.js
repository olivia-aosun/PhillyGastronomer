import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import classes from './SearchBar.css';

class SearchBar extends Component {

    state = {
        search: ''
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <Form inline className={classes.SearchBar}>
                <FormGroup controlId="search" >
                    <FormControl 
                        style={{ width: 500 }}
                        type="text"
                        value={this.state.value}
                        placeholder="Search a restaurant"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>
                <Button type="submit">Search</Button>
            </Form>
        );
    }
}

export default SearchBar;