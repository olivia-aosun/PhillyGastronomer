import {Register} from '../constants/ActionTypes';

export const register = userInfo => ({ type: Register, payload: {...userInfo, login: true} });