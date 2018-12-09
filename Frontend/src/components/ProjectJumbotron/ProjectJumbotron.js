import React from 'react';
import { Jumbotron } from 'reactstrap';
import classes from './ProjectJumbotron.css';

const ProjectJumbotron = (props) => (
    <Jumbotron className={classes.jumbotron}>
        <h1>Hello, world!</h1>
        <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
        </p>
    </Jumbotron>
);

export default ProjectJumbotron;