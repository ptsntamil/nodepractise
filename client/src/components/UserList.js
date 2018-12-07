import React from 'react';
import { store } from './../store';
import { actions } from './../actions';
import { Link } from "react-router-dom";
import Logout  from './Logout'; 

class UserList extends React.Component {
    constructor(props) {
      super(props);
      this.state = store.getState();
    }
  
    editUser = (user) => {
      store.dispatch(actions.userForm({
        user,
        error: {},
        formValid: true
      }));
  
    }
  
    renderTable = list => (
      <tbody>
        {!list.length &&
          <tr><td colSpan="5" className="text-center">No Data Found</td></tr>
        }
        {list.map((data) => (
          <tr key={data.id}>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.age}</td>
            <td>{data.dob}</td>
            <td>
              {/* <Edit onClick={this.editUser} data={data}/> */}
              <Link to={`user/${data.id}`}><i className="fa fa-pencil"></i></Link>
            </td>
          </tr>
        ))}
      </tbody>
    )
  
    render() {
      let list = store.getState().list;
      return(
        <div className="container">
          <div className="text-right">
            <Logout/>
          </div>
          <div className="row">
            <div className="col-sm-11 col-md-11 col-lg-11">
              <h2>List of User</h2>
            </div>
            <div className="col-sm-1 col-md-1 col-lg-1">
              <Link className="btn btn-primary" to="/user">Create</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>DOB</th>
                  <th>Action</th>
                </tr>
                </thead>
                {this.renderTable(list)}
              </table>
            </div>
          </div>
        </div>
      );
    }
  }

  export default UserList;