import React, { Component } from 'react'

import axios from 'axios'
import _ from 'lodash'

import handleFormErrors from './../utils/handle-form-errors'

class SignupForm extends Component {
  componentDidMount() {
    var signUpForm = document.querySelector("#new_user");

    signUpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      _.each(e.target.querySelectorAll('.field .error-msg'), function(el) {
        el.remove();
      });

      var emailField = e.target.querySelector('#user_email'),
          pwdField = e.target.querySelector('#user_password');

      axios({
        url: e.target.action,
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        },
        data: {
          user: {
            email: emailField.value,
            password: pwdField.value,
          },
        },
      })

      .then(function (response) {
        this.props.onSignup(response.data);
      }.bind(this))

      .catch(function (error) {
        handleFormErrors(error, e.target, { fieldPrefix: "user" });
      });
    }.bind(this));
  }

  render() {
    return (
      <div id="signup" className="box">
        <h1>Sign up</h1>

        <form id="new_user" action="/users" method="POST">
          <div className="field">
            <label htmlFor="user_email">Email</label>
            <input type="email" id="user_email" name="user[email]" />
          </div>

          <div className="field">
            <label htmlFor="user_password">Password</label>
            <input type="password" id="user_password" name="user[password]" />
          </div>

          <div className="form-actions">
            <input type="submit" className="btn btn-std" value="Sign up" />
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm;
