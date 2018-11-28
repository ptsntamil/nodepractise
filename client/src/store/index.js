import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = { 
  list: [{
    name: "Tamil",
    email: "ptntamil@gmail.com"
  }]
};
export const store = createStore(reducer, initialState);
