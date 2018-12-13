import {Logout} from '../constants/ActionTypes';

export const logout = _ => ({ type: Logout, payload: {name: '', user_id: '', login: false} });