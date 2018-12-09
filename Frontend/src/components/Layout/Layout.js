import React from 'react';
import Aux from '../../hoc/Aux';
import SearchBar from '../../containers/SearchBar/SearchBar';
import Filter from '../../containers/Filter/Filter';
import NavBar from '../NavBar/NavBar';
import ProjectJumbotron from '../ProjectJumbotron/ProjectJumbotron';

const layout = (props) => (
    <Aux>
        <NavBar></NavBar>
        <ProjectJumbotron></ProjectJumbotron>
        <SearchBar />
        <Filter />  
    </Aux>
);

export default layout;