import React, { Component } from 'react';
import Navbar from "react-bootstrap/lib/Navbar";
import Home from '../../containers/Home/Home';
import ContactPage from '../ContactPage/ContactPage';
import { Route} from 'react-router-dom';
import LoginScreen from '../../containers/LoginScreen/LoginScreen';
import Favorites from '../../containers/Favorites/Favorites';
import Recommendations from '../../containers/Recommendations/Recommendations';
let NavItem = require("react-bootstrap/lib/NavItem");
let Nav = require("react-bootstrap/lib/Nav");
let MenuItem = require("react-bootstrap/lib/MenuItem");
let NavDropdown = require("react-bootstrap/lib/NavDropdown");



class NavBar extends Component {
    state = {
        username: null
    }
    render() {
        return (
            <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>PhillyGastronomer</Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/">
                            Home
                        </NavItem>
                        <NavItem eventKey={2} href="/contact">
                            Contact
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        {/* TODO: only show when the user has signed in  */}
                        <NavDropdown eventKey={3} title="My Account" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/favorites">Favorites</MenuItem>
                            <MenuItem eventKey={3.2} href="/recommendations">Recommendation</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={2} href="/login">
                            Login
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Route exact path="/" component={Home}></Route>
            <Route path="/contact" component={ContactPage}></Route>
            <Route path="/login" component={LoginScreen}></Route>
            <Route path="/favorites" component={Favorites}></Route>
            <Route path="/recommendations" component={Recommendations}></Route>


            </div>
        );
    }
}

export default NavBar;