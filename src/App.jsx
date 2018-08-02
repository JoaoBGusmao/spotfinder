import React, { Component } from 'react';
import Login from './Login';
import Finder from './Finder';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: false,
      hash: '',
    };
  }

  componentDidMount() {
    if (window.location.hash) {
      const splitedHash = window.location.hash.substring(1).split('&');

      this.setState({
        loggedin: true,
        hash: splitedHash[0].split('=')[1],
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        {!this.state.loggedin ? (
          <Login />
        ) : (
          <Finder hash={this.state.hash} />
        )}
      </div>
    );
  }
}

export default App;
