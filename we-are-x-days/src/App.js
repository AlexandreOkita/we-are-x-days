import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Um nome foi enviado: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <div className="enter site">
          <h1>Create a Link </h1>
          <form onSubmit={this.handleSubmit}>
          <label>
            Message
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Enviar" />
          </form>
          <a href="/site">site</a>
        </div>
      </div>
    );
  }
}

export default App;
