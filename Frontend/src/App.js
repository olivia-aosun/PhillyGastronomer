import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
        </div>
      </Router>
      
    );
  }
}

export default App;
