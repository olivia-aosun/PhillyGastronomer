import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert';

class Login extends Component {
  state = {
    user_id: '1111',
    password: '3229c1097c00d497a0fd282d586be050',
    toHomePage: false,
    invalid: false
  }

  handleClick = _ => {
    const params = {
      user_id: this.state.user_id,
      password: this.state.password
    }
    axios.post('http://3.16.29.66:8080/PhillyGastronomer/login', params)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          const data = {
            name: response.data.name,
            user_id: response.data.user_id
          }
          this.props.changeStatus(data);
          this.setState({toHomePage: true});
        } else {
          this.setState({invalid: true});
        }
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
    if (this.state.toHomePage) {
      return <Redirect to='/'/>
    }
    const invalid = this.state.invalid ? <Alert bsStyle="warning" style={{width: 300}}>Invalid username or password!</Alert> : null; 
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
            {invalid}
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleClick} />
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