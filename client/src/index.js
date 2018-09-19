import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

class UserForm extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <form>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
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
ReactDOM.render(
  <UserForm />,
  document.getElementById('root')
);

//ReactDOM.render(<Clock />, document.getElementById('root'));
//registerServiceWorker();
