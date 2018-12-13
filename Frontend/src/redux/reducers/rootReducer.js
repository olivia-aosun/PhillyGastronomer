import {Login} from '../constants/ActionTypes';
import {Logout} from '../constants/ActionTypes';

const initialState = {
    login: false,
    user_id: '',
    name: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case Login:
            return {...action.payload};
        case Logout:
            return {...action.payload};
        default: 
            return state;
    }
};
export default rootReducer;