import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter} from "react-router-dom";
import { store } from './store';
import UserApp from './components/UserApp';
//import App from './App';
// class Edit extends React.Component {
//   render() {
//     return (
//       <i className="fa fa-pencil" onClick={()=>{this.props.onClick(this.props.data)}}/>
//     )
//   }
// }

const render = function() {
  ReactDOM.render(
    <BrowserRouter>
      <UserApp />
    </BrowserRouter>,
    document.getElementById('root')
  );
}
render();
store.subscribe(render)
//ReactDOM.render(<Clock />, document.getElementById('root'));
//registerServiceWorker();
