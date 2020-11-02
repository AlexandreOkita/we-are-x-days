import React from 'react';
import db from './firebaseDB'

class Site extends React.Component {

  constructor(props){
    super(props);
    this.state = {days: 0, message: '', id: this.props.location.search.split('=')[1]};
    this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.getDays();
    this.getMessage();
  }

  async getDays() {
    var sitesRef = await db.collection("sites");
    var query = await sitesRef.doc(this.state.id).get();
    const last_reset = query.data().last_reset
    //to change to days use the number 86400000
    const days = Math.floor((Date.now() - last_reset.toDate())/1000)
    this.setState({
      days: days
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

  async reset() {
    var sitesRef = await db.collection("sites");
    await sitesRef.doc(this.state.id).update({last_reset: new Date(Date.now())});

    this.setState({
      days: 0
    }, () => console.log(`reset`, this.state))
  }

  render() {
    return (
      <div className="total-days">
        <div className="main-message">
          <h1>We are {this.state.days} seconds without {this.state.message} </h1>
        </div>
        <div className="reset-button">
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Site;
