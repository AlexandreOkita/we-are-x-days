import React from 'react';
import db from './firebaseDB'

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
    console.log('created')
  }

  render() {
    return (
      <div className="app">
        <div className="enter site">
          <h1>Create a Link </h1>
          <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input type="text" value={this.state.value} onChange={this.handleChangeMessage} />
          </label>
          <label>
            Number of days:
            <input type="number" value={this.state.value} onChange={this.handleChangeDays} />
          </label>
          </form>
          <p>Your link will return: We are {this.state.days} days without {this.state.message}</p>
          <button onClick={this.createLink}>Create Link!</button>
          <br/>
          <br/>
          <a href={this.state.link}>{this.state.link ? "https://wearexdayswithout.web.app/"+this.state.link : ''}</a>
        </div>
      </div>
    );
  }
}

export default App;
