let React, { Component } = require('react')
let Navbar = require("react-bootstrap/lib/Navbar");
let NavItem = require("react-bootstrap/lib/NavItem");
let Nav = require("react-bootstrap/lib/Nav");
let MenuItem = require("react-bootstrap/lib/MenuItem");
let NavDropdown = require("react-bootstrap/lib/NavDropdown");

class NavBar extends Component {
    render() {
        const projectNavBar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Brand</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Text pullRight>Have a great day!</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );

        return (

            <div> 
                {projectNavBar}
            </div>

        );
    }
}

export default Navbar;