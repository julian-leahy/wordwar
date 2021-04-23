import React from 'react';
import './App.scss';
import Board from './features/board/Board';
import Difficulty from './features/difficulty/Difficulty';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBoard: false
    }
  }

  toggleShow = () => {
    this.setState({ showBoard: !this.state.showBoard })
  }
  render() {
    return (

      <div className="App">
        {
          this.state.showBoard ? <Board /> : <Difficulty toggle={this.toggleShow} />
        }
      </div>
    );
  }

}

export default App;
