import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert';

class Register extends Component {
  state = {
    first_name: '',
    last_name: '',
    userID: '',
    password: '',
    toHomePage: false,
    invalid: false
  }

  handleClick() {
    const params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      userID: this.state.userID,
      password: this.state.password
    }
    axios.post('http://3.16.29.66:8080/PhillyGastronomer/register', params)
      .then(response => {
        const data = {
          name: params.first_name + ' ' + params.last_name,
          user_id: params.userID
        }
        this.props.changeStatus(data);
        this.setState({toHomePage: true});
      })
      .catch();
  }

  changeFirstname = (event) => {
    this.setState({ first_name: event.target.value });
  }

  changeLastname = (event) => {
    this.setState({ last_name: event.target.value });
  }

  changeUserID = (event) => {
    this.setState({userID: event.target.value});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value});
  }

  render() {
    if (this.state.toHomePage) {
      return <Redirect to='/'/>
    }
    const invalid = this.state.invalid ? <Alert bsStyle="warning" style={{width: 330}}>Username already exists! Try another one!</Alert> : null; 
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Register"
            />
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange={this.changeFirstname.bind(this)}
            />
            <br />
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange={this.changeLastname.bind(this)}
            />
            <br />
            <TextField
              hintText="Enter your Username"
              type="username"
              floatingLabelText="Username"
              onChange={this.changeUserID.bind(this)}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={this.changePassword.bind(this)}
            />
            <br />
            {invalid}
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;