import React, { Component } from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import classes from './SearchBar.css';

class SearchBar extends Component {

    state = {
        query: ''
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({ query: value }); 
        this.props.onUpdate(value);
    } 

    clearValue = _ => {
        this.state.query = '';
    }

    render() {
        return (
            <Form inline className={classes.SearchBar}>
                <FormGroup controlId="search" >
                    <FormControl
                        style={{ width: 500 }}
                        type="text"
                        value={this.state.query}
                        placeholder="Search a restaurant"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>
            </Form>
        );
    }
}

export default SearchBar;