import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './UserList';
import UserForm from './UserForm';
import Login from './Login';
import { store } from '../store';
import Logout from './Logout';
import Constants from './../Constants';
import { actions } from '../actions';
import history from './../history';
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        store.getState().isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class UserApp extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    if(localStorage.getItem(Constants.AUTH_TOKEN)) {
      store.dispatch(actions.setAuth({
        isAuthenticated: true,
        login : {}
      }));
      history.push("/users");
    } else {
      store.dispatch(actions.setAuth({
        isAuthenticated: false,
        login : {
          username: "",
          password: ""
        }
      }));
      history.push("/");
    }
  }

  render() {
      return(
        <div className="container">
          <header>
            {store.getState().isAuthenticated && <div className="text-right">
              <Logout/>
            </div>}
          </header>
          <Switch>
            <PrivateRoute path='/user' component={UserForm}/>
            <PrivateRoute exact path='/users' component={UserList}/>
            {/* <Route exact path='/user' component={UserForm}/> */}
            <PrivateRoute exact path='/user/:userId' component={UserForm}/>
            <Route exact path='/' component={Login}/>
          </Switch>
        </div>
      );
    }
}
export default UserApp;

