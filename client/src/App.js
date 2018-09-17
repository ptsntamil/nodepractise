import React, { Component } from 'react';
import './App.css';

class App extends Component {
  /*renderSquare(i) {
    return <Square value={i} />;
  }*/
}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
export default App;