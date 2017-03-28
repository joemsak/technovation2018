import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import decodeJWT from 'jwt-decode'
import axios from 'axios'
import _ from 'lodash'

class App extends Component {
  componentDidMount() {
    var signUpForm = document.querySelector("#new_user"),
        signInForm = document.querySelector("#auth");

    var token = window.sessionStorage.getItem('accessToken');
    if (token) {
      var decoded = decodeJWT(token),
          email = decoded.sub.email;
      document.querySelector('.container').innerHTML = "You are signed in as " + email;
    }


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
        window.sessionStorage.setItem('accessToken', response.data.jwt);

        var div = document.createElement('div');

        div.innerText = "You signed in as " + emailField.value + ".";

        signUpForm.after(div);

        e.target.remove();
        signUpForm.remove();
      })

      .catch(function (error) {
        var errors = error.response.data;

        if (error.response.status === 404)
          errors = { email: ["does not exist in our database"] };

        var fieldsWithErrors = _.keys(errors);

        _.each(fieldsWithErrors, function(field) {
          var input = e.target.querySelector("#auth_" + field);

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
      <div className="container">
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
      </div>
    );
  }
}
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
