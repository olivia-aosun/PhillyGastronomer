import {Login} from '../constants/ActionTypes';

export const login = userInfo => ({ type: Login, payload: {...userInfo, login: true} });