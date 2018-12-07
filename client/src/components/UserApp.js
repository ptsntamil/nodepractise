import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from './UserList';
import UserForm from './UserForm';
import Login from './Login';
import { store } from '../store';

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
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class UserApp extends React.Component {
    render() {  
      return(
        <Switch>
          <PrivateRoute path='/user' component={UserForm}/>
          <PrivateRoute exact path='/' component={UserList}/>
          {/* <Route exact path='/user' component={UserForm}/> */}
          <PrivateRoute exact path='/user/:userId' component={UserForm}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      );
    }
}
export default UserApp;

