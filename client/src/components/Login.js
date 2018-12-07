import React from 'react';
import { store } from './../store';
import { actions } from './../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event)=>{
    let {login} = store.getState();
    login[event.target.id] = event.target.value;
    store.dispatch(actions.setLoginForm(login));
  }

  login = () => {
    let {login} = store.getState();
    if(login.username && login.password) {
      store.dispatch(actions.setAuth({
        authentication: true,
        login: login
      }));
      this.props.history.push("/");
    } else {
      store.dispatch(actions.setAuth(false));
    }
  }
  render() {
    let { login }  = store.getState();
    return (
      <div className="login-page">
        <div className="login">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h3>User Login</h3>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input type="text" id="username" placeholder="Username"value={login.username} className="form-control" onChange={this.handleChange}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <input type="password" id="password" placeholder="Password"value={login.password} className="form-control" onChange={this.handleChange}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <button className="btn btn-primary" onClick={this.login}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;