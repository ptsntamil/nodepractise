import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter,Switch, Route } from "react-router-dom";
//import App from './App';
class Edit extends React.Component {
  render() {
    return (
      <i className="fa fa-pencil" onClick={()=>{this.props.onClick(this.props.data)}}/>
    )
  } 
}

class UserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      list: [],
      error: {
        name: true,
        email: true,
        dob: true
      },
      formValid: false
    };
    this.userObject = ["name", "email", "dob", "age"];
  }

  clear = () => {
    this.setState({
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
    });
  } 

  handleChange = event => {
    let {user, error, formValid} = this.state;
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
    this.setState({
      user,
      error,
      formValid
    });
  }

  editUser = (user) => {
    this.setState({
      user,
      error: {},
      formValid: true
    });
  }

  addToList = () => {
    const {user,list} = this.state;
    console.log(list);
    if(user.id) {
      list[user.id-1] = user;
    } else {
      user.id = list.length + 1;
      list.push(user);
    }
    this.setState({
      list:list 
    });
    this.clear();
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
            <Edit onClick={this.editUser} data={data}/>
          </td>
        </tr>
      ))}
    </tbody>
  )

  render() {
    const {list, user, error} = this.state;
    return (
      <div className="container">
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
                    <button type="button" className="btn btn-primary" onClick={this.addToList} disabled={!this.state.formValid} id="add"> {!user.id ? "Add" : "Update"} </button>
                    <button type="button" className="btn btn-default" onClick={this.clear} id="add">Clear</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>List of User</h2>
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

class UserList extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>List of User</h2>
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
              {/*{this.renderTable(list)}*/}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class UserApp extends React.Component {
  render() {  
    return(
      <Switch>
        <Route exact path='/' component={UserList}/>
      </Switch>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <UserApp />
  </BrowserRouter>,
  document.getElementById('root')
);

//ReactDOM.render(<Clock />, document.getElementById('root'));
//registerServiceWorker();
