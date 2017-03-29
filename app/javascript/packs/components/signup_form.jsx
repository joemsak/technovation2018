import React, { Component } from 'react'

import axios from 'axios'
import _ from 'lodash'

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
        var div = document.createElement('div');

        div.innerText = "You signed up as " + response.data.email + ".";
        div.innerText += " Sign in below.";

        e.target.after(div);

        e.target.remove();
      })

      .catch(function (error) {
        var errors = error.response.data,
            fieldsWithErrors = _.keys(errors);

        _.each(fieldsWithErrors, function(field) {
          var input = e.target.querySelector("#user_" + field);

          _.each(errors[field], function(err) {
            var errMsg = document.createElement('div');

            errMsg.classList.add('error-msg');
            errMsg.innerText = err;

            input.after(errMsg);
          });
        });
      });
    });
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