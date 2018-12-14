import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

class Register extends Component {
  state = {
    first_name: '',
    last_name: '',
    user_id: '',
    password: '',
    toHomePage: false,
    invalid: false
  }

  handleClick() {
    const params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      user_id: this.state.user_id,
      password: this.state.password
    }
    axios.post('http://3.16.29.66:8080/PhillyGastronomer/register', params)
      .then(response => {
        const data = {
          name: params.first_name + ' ' + params.last_name,
          user_id: params.user_id
        }
        this.props.userRegister(data);
        this.setState({toHomePage: true});
      })
      .catch(error => {
        this.setState({ invalid: true });
        this.setState({ user_id: '' });
        this.setState({ password: '' });
        console.log(error);
      });
  }

  changeFirstname = (event) => {
    this.setState({ first_name: event.target.value });
  }

  changeLastname = (event) => {
    this.setState({ last_name: event.target.value });
  }

  changeuser_id = (event) => {
    this.setState({user_id: event.target.value});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value});
  }

  render() {
    if (this.state.toHomePage) {
      return <Redirect to='/'/>
    }
    const invalid = this.state.invalid ? <Alert bsStyle="warning" style={{width: 330, marginLeft: '30%', marginTop: 20}}>Username already exists! Try another one!</Alert> : null; 
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar 
              title="Register"
            />
            <TextField style = {style}
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange={this.changeFirstname.bind(this)}
            />
            <br />
            <TextField style = {style}
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange={this.changeLastname.bind(this)}
            />
            <br />
            <TextField style = {style}
              value={this.state.user_id}
              hintText="Enter your Username"
              type="username"
              floatingLabelText="Username"
              onChange={this.changeuser_id.bind(this)}
            />
            <br />
            <TextField style = {style}
              value={this.state.password}
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={this.changePassword.bind(this)}
            />
            <br />
            {invalid}
            <RaisedButton label="Submit" primary={true} style={{marginTop: 15, marginBottom: 15, marginLeft: '30%'}} onClick={this.handleClick.bind(this)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.white,
    disabledColor: Colors.white,
    primary1Color: Colors.grey800,
    primary2Color: Colors.grey800,
    accent1Color: Colors.white,
    pickerHeaderColor: Colors.grey800,
    alternateTextColor: Colors.white,
    backgroundColor: Colors.minBlack
  }
});

const style={marginLeft: '30%', marginRight: '30%', backgroundColor: Colors.minBlack};

export default Register;