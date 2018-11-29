import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = { 
  list: [],
  user: {},
  error: {
    name: true,
    email: true,
    dob: true
  },
  formValid: false
};
export const store = createStore(reducer, initialState);
