import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

const bgImage = 'https://envato-shoebox-0.imgix.net/56e9/c78d-3adf-4835-8a8e-9af709f9c3d4/IMG17-8914.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=700&s=2bc680b1da6403e96966d69deed3acb7';

const styles = {
    container: {
    backgroundImage: `url(${bgImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    margin: '0'
  }
};

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
      <Router>
        <div>
          <NavBar/>
        </div>
      </Router>
      </div>
      
    );
  }
}

export default App;
