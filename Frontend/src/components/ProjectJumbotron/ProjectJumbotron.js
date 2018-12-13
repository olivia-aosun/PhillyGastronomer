import React from 'react';
import { Jumbotron } from 'reactstrap';
import classes from './ProjectJumbotron.css';

const bgImage = 'https://png.pngtree.com/thumb_back/fw800/back_pic/04/43/72/645853706804660.jpg';

const styles = {
    container: {
    backgroundImage: `url(${bgImage})`, 
    backgroundSize: 'cover'
  }
};

const ProjectJumbotron = (props) => (
    <Jumbotron className={classes.jumbotron} style={styles.container}>
        <h1>Hello, foodies!</h1>
        <p>
            Are you ready to start your culinary adventures? 
        </p>
    </Jumbotron>
);

export default ProjectJumbotron;