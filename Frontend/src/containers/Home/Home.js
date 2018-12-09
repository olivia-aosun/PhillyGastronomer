import React, {Component} from 'react';
import Filter from './Filter/Filter';
import SearchBar from './SearchBar/SearchBar';
import ProjectJumbotron from '../../components/ProjectJumbotron/ProjectJumbotron';
import { Tabs, Tab, Button } from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/lib/ButtonToolbar';
import classes from './Home.css';

class Home extends Component {
    state = {
        status: 'searchBar',
        results: []
    }

    selectTab(event) {
        this.setState({status: event});
    }

    render () {
        return (
            <div>
            <ProjectJumbotron/>
            <Tabs activeKey={this.state.status} onSelect={this.selectTab.bind(this)} id="tabs" className={classes.tabs}>
                <Tab eventKey="searchBar" title="Search a restaurant">
                    <SearchBar></SearchBar>
                </Tab>
                <Tab eventKey="filter" title="Filter restaurants">
                    <Filter></Filter>
                </Tab>
            </Tabs>
            <ButtonToolBar className={classes.buttonToolBar}>
                <Button className={classes.searchButton} onClick={this.clickSearch}>Search</Button>
            </ButtonToolBar>
            
            </div>
        );
    }
};

export default Home;