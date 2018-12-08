import React from 'react';
import { store } from './../store';
import { actions } from './../actions';
import { Link } from "react-router-dom";

class UserForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = store.getState();
      this.userObject = ["name", "email", "dob", "age"];
    }
  
    componentDidMount() {
      let {list} = store.getState();
      let { match } = this.props;
      let {userId} = match.params;
      if(userId){
        let user = list[userId - 1]; 
        store.dispatch(actions.userForm({
          user,
          error: {},
          formValid: true
        }));
      }
    }
    
    clear = () => {
      store.dispatch(actions.userForm({
        user: {
          name: "",
          email: "",
          age: "",
          dob: ""
        },
        formValid: false,
        error: {
          name: true,
          email: true,
          dob: true
        },
      }));
    } 
  
    handleChange = event => {
      let { user, error, formValid } = store.getState();
      const field = event.target.id;
      const fieldValue = event.target.value;
      user[field] = fieldValue;
      console.log("REquo  " + event.target.required);
      //this.userObject.forEach( value => {
        if(event.target.required && !user[field]) {
            error[field] = field.toLocaleUpperCase() + " is required";
        } else if (user[field]) {
          if (field === "email") {
            error[field] = fieldValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? ""  : "Enter correct email";
          } else if(field === "age") {
            error[field] = fieldValue.match(/^\d{1,3}$/i) ? "" : "Not a valid age";
          } else if(field === "dob") {
            error[field] = new Date(fieldValue) == "Invalid Date" ? "Not a valid Date" : "";
          } else {
            error[field] = "";
          }
        } else {
          error[field] = "";
        }
        
        if(error[field] === "") {
          delete error[field];
        }
      //})
        if(Object.keys(error).length === 0) {
          formValid = true;
        } else {
          formValid = false;
        }
      // if(!nameValid && !ageValid && !emailValid && !dobValid) {
      //   console.log("formValid  " + formValid)
      //   formValid = true;
      // } else {
      //   formValid = false;
      // }
      store.dispatch(actions.userForm({
        user,
        error,
        formValid
      }));   
    }
  
    addToList = () => {
      const {user,list} = store.getState();
      console.log(list);
      if(user.id) {
        list[user.id-1] = user;
      } else {
        user.id = list.length + 1;
        list.push(user);
      }
      store.dispatch(actions.addUser(list));
      this.clear();
      this.props.history.push("/users");
    }
  
    render() {
      const {user, error} = store.getState();
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-11 col-md-11 col-lg-11">
              <h3>Create User</h3>
            </div>
            <div className="col-sm-1 col-md-1 col-lg-1">
              <Link to="/users">Home</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <form>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-2">
                      <label>Name</label>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-2">
                       <input type="text" className="form-control" value={user.name} id="name" onChange={this.handleChange} placeholder="Enter your name" required/>
                       {error.name && <div className="error">{error.name}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-2">
                      <label>Email</label>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-2">
                       <input type="text" className="form-control" value={user.email} id="email" onChange={this.handleChange} placeholder="Enter your email" required/>
                       {error.email && <div className="error">{error.email}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-2">
                      <label>Age</label>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-2">
                       <input type="text" className="form-control" id="age" value={user.age} onChange={this.handleChange} placeholder="Enter your age"/>
                       {error.age && <div className="error">{error.age}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-2">
                      <label>DOB</label>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-2">
                       <input type="date" className="form-control" id="dob" value={user.dob} onChange={this.handleChange} placeholder="Enter your Dob" required/>
                       {error.dob && <div className="error">{error.dob}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-2">
                      <button type="button" className="btn btn-primary" onClick={this.addToList} disabled={!store.getState().formValid} id="add"> {!user.id ? "Add" : "Update"} </button>
                      <button type="button" className="btn btn-default" onClick={this.clear} id="add">Clear</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }

export default UserForm;