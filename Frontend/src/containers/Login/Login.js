import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.css';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import Home from '../../containers/Home/Home';

class Login extends Component {
  state = {
    user_id: '',
    password: '',
    toHomePage: false
  }

  handleClick = _ => {
    const params = {
      user_id: this.state.user_id,
      password: this.state.password
    }
    axios.post('http://3.16.29.66:8080/PhillyGastronomer/login', params)
      .then(response => {
        console.log(response);
      })
      .catch(error => {

      });
  }

  changeUsername = event => {
    this.setState({ user_id: event.target.value });
    console.log(this.state.user_id);
  }

  changePassword = event => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }

  render() {
    if (toHomePage) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <MuiThemeProvider className="container">
          <div >
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={this.changeUsername.bind(this)}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={this.changePassword.bind(this)}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleClick} />
            <Route exact path="/" render={_ => (<Home />)}></Route>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;