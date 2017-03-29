import React, { Component } from 'react'

import axios from 'axios'
import _ from 'lodash'

import handleFormErrors from './../utils/handle-form-errors'

class SigninForm extends Component {
  componentDidMount() {
    var signInForm = document.querySelector("#auth");

    signInForm.addEventListener('submit', function(e) {
      e.preventDefault();

      _.each(e.target.querySelectorAll('.field .error-msg'), function(el) {
        el.remove();
      });

      var emailField = e.target.querySelector('#auth_email'),
          pwdField = e.target.querySelector('#auth_password');

      axios({
        url: e.target.action,
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
        data: {
          auth: {
            email: emailField.value,
            password: pwdField.value,
          },
        },
      })

      .then(function (response) {
        this.props.onSignin(response.data);
      }.bind(this))

      .catch(function (error) {
        handleFormErrors(error, e.target, { fieldPrefix: "auth" });
      });
    }.bind(this));
  }

  render() {
    return (
      <div id="signin" className="box">
        <h1>Sign in</h1>

        <form id="auth" action="/user_token" method="POST">
          <div className="field">
            <label htmlFor="auth_email">Email</label>
            <input type="email" id="auth_email" name="auth[email]" />
          </div>

          <div className="field">
            <label htmlFor="auth_password">Password</label>
            <input type="password" id="auth_password" name="auth[password]" />
          </div>

          <div className="form-actions">
            <input type="submit" className="btn btn-std" value="Sign in" />
          </div>
        </form>
      </div>
    )
  }
}

export default SigninForm;
