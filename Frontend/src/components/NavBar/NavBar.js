import React, { Component } from 'react';
import Navbar from "react-bootstrap/lib/Navbar";
import Home from '../../containers/Home/Home';
import ContactPage from '../ContactPage/ContactPage';
import { Route } from 'react-router-dom';
import LoginScreen from '../../containers/LoginScreen/LoginScreen';
import Favorites from '../../containers/Favorites/Favorites';
import Recommendations from '../../containers/Recommendations/Recommendations';
import axios from 'axios';
import { connect } from "react-redux";
import { login } from '../../redux/actions/Login';
import { logout } from '../../redux/actions/Logout';
import { register } from '../../redux/actions/Register';
let NavItem = require("react-bootstrap/lib/NavItem");
let Nav = require("react-bootstrap/lib/Nav");
let MenuItem = require("react-bootstrap/lib/MenuItem");
let NavDropdown = require("react-bootstrap/lib/NavDropdown");

class NavBar extends Component {

    clickLogout = _ => {
        const params = { user_id: this.props.user_id };
        axios.post('http://3.16.29.66:8080/PhillyGastronomer/logout', params);
        this.props.userLogout();
    }

    render() {
        let myAccount = null;
        let LogNavItem = null;
        if (this.props.login) {
            myAccount = <NavDropdown eventKey={3} title="My Account" id="basic-nav-dropdown">
                <MenuItem eventKey={3.0} >Hello {this.props.name}!</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.1} href="/favorites">Favorites</MenuItem>
                <MenuItem eventKey={3.2} href="/recommendations">Recommendations</MenuItem>
            </NavDropdown>;
            LogNavItem = <NavItem eventKey={2} onClick={this.clickLogout}>Logout</NavItem>
        } else {
            LogNavItem = <NavItem eventKey={2} href="/login">login</NavItem>
        }
        let user_id = { user_id: this.props.user_id };
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
                            {myAccount}
                            {LogNavItem}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Route exact path="/" render={_ => (<Home {...user_id} />)}></Route>
                <Route path="/contact" component={ContactPage}></Route>
                <Route path="/login" render={_ => (<LoginScreen {...this.props} />)}></Route>
                <Route path="/favorites" render={_ => (<Favorites {...user_id} />)}></Route>
                <Route path="/recommendations" component={Recommendations}></Route>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return { name: state.name, user_id: state.user_id, login: state.login };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (user_info) => dispatch(login(user_info)),
        userLogout: () => dispatch(logout()),
        userRegister: (user_info) => dispatch(register(user_info))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);