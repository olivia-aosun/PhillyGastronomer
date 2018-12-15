import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import classes from './SearchBar.css';
import axios from 'axios';

class SearchBar extends Component {

    state = {
        searchQuery: " "
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ searchQuery: value });
        this.search(value);
    } 

    search = searchQuery => {
        axios.get('http://localhost:8080/search', searchQuery)
            .then(response => {
                const dataBack = response.data.slice(0, 6);
                this.setState({searchQuery: dataBack });
            });
    }

    componentDidMount() {
        this.search(" ");
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