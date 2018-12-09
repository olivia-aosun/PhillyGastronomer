import React, { Component } from 'react';
import Navbar from "react-bootstrap/lib/Navbar";
import Home from '../../containers/Home/Home';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
let NavItem = require("react-bootstrap/lib/NavItem");
let Nav = require("react-bootstrap/lib/Nav");
let MenuItem = require("react-bootstrap/lib/MenuItem");
let NavDropdown = require("react-bootstrap/lib/NavDropdown");

class NavBar extends Component {
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
                            <MenuItem eventKey={3.1}>History</MenuItem>
                            <MenuItem eventKey={3.2}>Favorite</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={2} href="#">
                            Login
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Sign up
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Route exact path="/" component={Home}></Route>
            </div>
        );
    }
}

export default NavBar;