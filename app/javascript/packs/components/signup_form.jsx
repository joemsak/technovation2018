import React, { Component } from 'react'

import axios from 'axios'
import _ from 'lodash'

import handleFormSubmit from './../utils/handle-form-submit'

class SignupForm extends Component {
  handleSubmit(event) {
    handleFormSubmit(
      event,
      {
        fieldPrefix: 'user',
        then: this.props.onSignup,
      }
    );
  }

  render() {
    return (
      <div id="signup">
        <h1>Sign up</h1>

        <form
          onSubmit={this.handleSubmit.bind(this)}
          id="new_user"
          action="/users"
          method="POST"
        >
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
