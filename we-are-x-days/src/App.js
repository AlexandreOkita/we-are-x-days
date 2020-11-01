import React from 'react';

class TotalDays extends React.Component {

  constructor(props){
    super(props)
    this.state = {days: 0, message: '', date: '2020'}
    this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.getDays();
    this.getMessage();
  }

  getDays() {
    //calls api
    console.log(`hello`)
    this.setState({
      days: 3
    }, () => console.log(`days`, this.state))
  }

  getMessage() {
    //calls api
    this.setState({
      message: "accidents"
    }, () => console.log(this.state))
  }

  reset() {
    //calls api
    this.setState({
      days: 0
    }, () => console.log(`reset`, this.state))
  }

  render() {
    return (
      <div className="total-days">
        <div className="main-message">
          <h1>We are {this.state.days} days without {this.state.message} </h1>
        </div>
        <div className="reset-button">
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <TotalDays />
    </div>
  );
}

export default App;
