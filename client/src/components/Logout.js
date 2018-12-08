import React from 'react';
import { store } from './../store';
import { actions } from './../actions';
import Constants from './../Constants';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  login = () => {
    store.dispatch(actions.setAuth({
      isAuthenticated: false,
      login: {
        username: "",
        password: ""
      }
    }));
    localStorage.setItem(Constants.AUTH_TOKEN, "");
  }

  render() {
    return (
      <button className="btn btn-default" onClick={this.login}>Logout</button>
    );
  }
}
export default Logout;