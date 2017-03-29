import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import decodeJWT from 'jwt-decode'
import _ from 'lodash'

import SignupForm from './components/signup_form'
import SigninForm from './components/signin_form'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: null,
    };
  }

  componentDidMount() {
    var token = window.sessionStorage.getItem('accessToken');
    if (token)
      this.setState({ authToken: token });
  }

  renderUserInfo() {
    var decoded = decodeJWT(this.state.authToken);

    return (
      <div className="container">
        <p>
          You are signed in as {decoded.sub.email}!
        </p>

        <p>
          <a
            onClick={this.logout.bind(this)}
            href="/logout"
          >
            Sign out
          </a>
        </p>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    window.sessionStorage.removeItem('accessToken');
    this.setState({ authToken: null });
  }

  renderAuthForms() {
    return (
      <div className="container">
        <SignupForm />
        <SigninForm />
      </div>
    );
  }

  render() {
    if (this.state.authToken) {
      return this.renderUserInfo();
    } else {
      return this.renderAuthForms();
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
