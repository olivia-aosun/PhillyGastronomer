import React from 'react';
import Aux from '../../hoc/Aux';
import SearchBar from '../../containers/SearchBar/SearchBar';
import Filter from '../../containers/Filter/Filter';
import NavBar from '../NavBar/NavBar';

const layout = (props) => (
    <Aux>
        <NavBar></NavBar>
        <SearchBar />
        <Filter />  
    </Aux>
);

export default layout;