import React, { Component } from 'react';
import env from '../env';

const loginUrl = `https://accounts.spotify.com/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.URL}/&scope=user-read-private%20user-read-email&response_type=token&state=123`;

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1>Faça o login no spotify para continuar</h1>
        <a href={loginUrl}>Login</a>
      </div>
    )
  }
}

export default Login;
