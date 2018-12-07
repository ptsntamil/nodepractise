import React from 'react';
import { store } from './../store';
import { actions } from './../actions';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  login = () => {
    store.dispatch(actions.setAuth({
      authentication:false,
      login: {
        username: "",
        password: ""
      }
    }));
  }

  render() {
    return (
      <button className="btn btn-default" onClick={this.login}>Logout</button>
    );
  }
}
export default Logout;