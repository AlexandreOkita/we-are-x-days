import React from 'react';
import db from './firebaseDB'
import './styles/App.css'
//
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: '', days: 0, link: ''};

    this.createLink = this.createLink.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeDays = this.handleChangeDays.bind(this);
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  handleChangeDays(event) {
    this.setState({days: event.target.value});
  }

  async createLink() {
    const lastDate = new Date(Date.now() - 86400000 * this.state.days)
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    console.log(this.state.message)
    await db.collection('sites').doc(randomId).set({
      message: this.state.message,
      creation_date: new Date(Date.now()),
      last_reset: lastDate
    })
    this.setState({link: '/site?id='+randomId});
    this.props.history.push(this.state.link);
  }

  render() {
    return (
      <div className="app">
        <div className="enter-site">

          <div className="title">
            <h1>Days Without... </h1>
          </div>

          <div className="form">
              <input type="text" value={this.state.value} placeholder="Message" onChange={this.handleChangeMessage} />
          </div>

          <div className="form">
              <input type="number" placeholder="Number of Days" value={this.state.value} onChange={this.handleChangeDays} />
          </div>

          <div className="button" onClick={this.createLink}>
              Create Link
          </div>

          <div className="preview">
            <h4>Preview</h4>
            <p>We are {this.state.days} days without {this.state.message}</p>
          </div>

          <div className="created-link">
            <a href={this.state.link}>{this.state.link ? "https://wearexdayswithout.web.app"+this.state.link : ''}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
