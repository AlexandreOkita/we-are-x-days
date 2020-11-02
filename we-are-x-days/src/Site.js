import React from 'react';
import db from './firebaseDB'
import './styles/Site.css'

class Site extends React.Component {

  constructor(props){
    super(props);
    this.state = {days: 0, message: '', id: this.props.location.search.split('=')[1], hours: false, seconds: 0};
    this.reset = this.reset.bind(this);
    this.changeShow = this.changeShow.bind(this);
  }

  componentDidMount(){
    this.getDays();
    this.getMessage();
    this.timerID = setInterval(
      () => this.setState({
        seconds: this.state.seconds + 1
      }),
      1000
    );
  }

  formatTime(s){
    var fm = [
      Math.floor(s / 60 / 60 / 24), // DAYS
      Math.floor(s / 60 / 60) % 24, // HOURS
      Math.floor(s / 60) % 60, // MINUTES
      s % 60 // SECONDS
    ];
    return `"${fm[0]}:${fm[1]}:${fm[2]}:${fm[3]}"`
  }

  async getDays() {
    var sitesRef = await db.collection("sites");
    var query = await sitesRef.doc(this.state.id).get();
    const last_reset = query.data().last_reset
    //to change to days use the number 86400000
    const days = Math.floor((Date.now() - last_reset.toDate())/86400000)
    const seconds = Math.floor((Date.now() - last_reset.toDate())/1000)
    this.setState({
      days: days,
      seconds: seconds
    }, () => console.log(`days`, this.state))
  }

  async getMessage() {
    var sitesRef = await db.collection("sites");
    var query = await sitesRef.doc(this.state.id).get();
    const message = query.data().message
    this.setState({
      message: message
    }, () => console.log(this.state))
  }

  changeShow() {
    this.setState({
      hours: this.state.hours ? false : true
    })
  }

  async reset() {
    var sitesRef = await db.collection("sites");
    await sitesRef.doc(this.state.id).update({last_reset: new Date(Date.now())});

    this.setState({
      days: 0,
      seconds: 0
    }, () => console.log(`reset`, this.state))
  }

  render() {
    return (
      <div className="total-days">
        <div className="main-message">
          <h1>We are {this.state.hours ? this.formatTime(this.state.seconds) : this.state.days + " days"} without {this.state.message} </h1>
        </div>
        <div className="show-button" onClick={this.changeShow}>
          {this.state.hours ? "Show Days" : "Show Hours"}
        </div>
        <div className="reset-button" onClick={this.reset}>
          Reset
        </div>
      </div>
    );
  }
}

export default Site;
