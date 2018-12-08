import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import {BrowserRouter as Router, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout />
        </div>
      </Router>
      
    );
  }
}

export default App;
