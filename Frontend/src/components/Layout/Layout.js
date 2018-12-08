import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import SearchBar from '../../containers/SearchBar/SearchBar';

const layout = (props) => (
    <Aux>
        <div>Toolbar</div>
        <SearchBar></SearchBar>
        <main className={classes.Content}>
            {props.children}
        </main>  
    </Aux>
);

export default layout;