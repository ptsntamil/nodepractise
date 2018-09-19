import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
/*class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={()=>this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
	  const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	  ];
	  for (let i = 0; i < lines.length; i++) {
	    const [a, b, c] = lines[i];
	    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	      return squares[a];
	    }
	  }
	  return null;
}
class Board extends React.Component {
  
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      history:[{
      	squares: Array(9).fill(null)
      }],
      step:0,
      nextIsX: true
    };
  	}
	
  
  handleClick(i) {
  	const history = this.state.history.slice();
  	let step = this.state.step;
    const current = history[history.length - 1];
    let squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
    	return;
    }
    squares[i] = this.state.nextIsX ? 'X' : 'Y';
    this.setState({
    	history:history.concat([{
    	  squares: squares
      }]),
      step: history.length,
      nextIsX:!this.state.nextIsX
    });
  }

  jumpTo(step) {
  	this.setState({
  		step:step,
  		nextIsX: step%2 === 0
  	});
  }

  render() {
  	const history = this.state.history;
  	const current = history[this.state.step];
    const winner = calculateWinner(current.squares);
    let status;
  	if (winner) {
    	status = 'Winner: ' + winner;
  	} else {
    	status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  	}
  	const moves = history.map((step, move) => {
  		console.log("move ": move)
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


class Clock extends React.Component {
	render() {
		return(
		  <div className="clock">{this.props.time}</div>
	  );	
	}
}

class StopWatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			times: [],
			time : "00:00:00"
		};
		this.sec = this.min = this.hour = 0;
		//this.createClock();
	}
	
	componentDidMount() {
		this.createClock();
	}

	resetTimer() {
		clearInterval(this.timer);
		this.sec = this.min = this.hour = 0;
		this.setState({
			time: "00:00:00",
			times: []
		});
	}

	setClockTime() {
			let sec = Math.abs(this.sec);
			let min = Math.abs(this.min);
			let hour = Math.abs(this.hour);
			sec++;
			if(sec === 60) {
				sec = 0;
				min ++;
			} 
			if(min === 60) {
				min = 0;
				hour ++;
			}
			sec = sec > 9 ? sec : ("0" + sec);
			min = min > 9 ? min : ("0" + min);
			hour = hour > 9 ? hour : ("0" + hour);
			this.sec = sec;
			this.hour = hour;
			this.min = min;
			this.setState({
				time: hour + ":" + min + ":" + sec
			});
	}
	createClock() {
		if(this.timer) {
			clearInterval(this.timer);
		}
		this.timer = setInterval(this.setClockTime.bind(this),1000);
	}

	stopTimer() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	}

	addTime() {
		let times = this.state.times;
		times.push(this.state.time);
		this.setState({
			times: times
		}); 
	}

	render() {
		const times = this.state.times;
		const stoppedTime = times.map((time, index) => {
      return (
        <div key={index}>{time}</div>
      );
    });
		return(
			<div className="stop-watch">
		  	<Clock time={this.state.time}/>
		  	<button onClick={()=>this.createClock()}>Start</button>
		  	<button onClick={()=>this.stopTimer()}>Stop</button>
		  	<button onClick={()=>this.resetTimer()}>Reset</button>
		  	 <div>{stoppedTime}</div>
		  </div>
		);
	}
}
// ========================================

ReactDOM.render(
  <StopWatch />,
  document.getElementById('root')
);

//ReactDOM.render(<Clock />, document.getElementById('root'));
//registerServiceWorker();
