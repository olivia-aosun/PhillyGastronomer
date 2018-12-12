import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './LoginScreen.css';

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
        loginscreen.push(<Login key='login' parentContext={this} appContext={this.props.parentContext} className="container" changeStatus={this.props.changeStatus}/>);
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
            loginscreen.push(<Register key='register' parentContext={this} changeStatus={this.props.changeStatus}/>);
            loginmessage = "Already registered? Go to Login!";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Login",
                isLogin: false
            })
        }
        else {
            loginscreen.push(<Login key='login' parentContext={this} changeStatus={this.props.changeStatus}/>);
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
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton className="button" label={this.state.buttonLabel} primary={true} style={style} onClick={this.handleClick.bind(this)} />
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default LoginScreen;