import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './LoginScreen.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

class LoginScreen extends Component {
    state = {
        username: '',
        password: '',
        loginscreen: [],
        loginmessage: '',
        buttonLabel: 'Register',
        isLogin: true
    }

    componentWillMount() {
        var loginscreen = [];
        loginscreen.push(<Login key='login' parentContext={this} appContext={this.props.parentContext} className="container" userLogin={this.props.userLogin}/>);
        var loginmessage = "Not registered yet? Register Now!";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        })
    }

    handleClick() {
        let loginmessage;
        let loginscreen = [];
        if (this.state.isLogin) {
            loginscreen.push(<Register key='register' parentContext={this} userRegister={this.props.userRegister}/>);
            loginmessage = "Already registered? Go to Login!";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Login",
                isLogin: false
            })
        }
        else {
            loginscreen.push(<Login key='login' parentContext={this} userLogin={this.props.userLogin}/>);
            loginmessage = "Not Registered yet.Go to registration";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Register",
                isLogin: true
            })
        }
    }

    render() {
        return (
            <div className="container">
                <MuiThemeProvider muiTheme={muiTheme}>
                {this.state.loginscreen}
                <div style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: '30%'}}>
                    {this.state.loginmessage}
                        <div>
                            <RaisedButton className="button" label={this.state.buttonLabel} primary={true} style={{marginTop: 15}} onClick={this.handleClick.bind(this)} />
                        </div>
                </div>
                
                </MuiThemeProvider>
            </div>
        );
    }
}
const muiTheme = getMuiTheme({
    palette: {
      textColor: Colors.white,
      primary1Color: Colors.grey800,
      primary2Color: Colors.grey800,
      accent1Color: Colors.white,
      pickerHeaderColor: Colors.grey800,
      alternateTextColor: Colors.white,
      backgroundColor: Colors.lightBlack
    }
  });
const style={marginLeft: '30%', marginRight: '30%'};
export default LoginScreen;