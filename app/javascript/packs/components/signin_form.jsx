import React, { Component } from 'react'

import handleFormSubmit from './../utils/handle-form-submit'

class SigninForm extends Component {
  handleSubmit(event) {
    handleFormSubmit(
      event,
      {
        fieldPrefix: 'auth',
        then: this.props.onSignin,
      }
    );
  }

  render() {
    return (
      <div id="signin">
        <h1>Sign in</h1>

        <form
          onSubmit={this.handleSubmit.bind(this)}
          id="auth"
          action="/user_token"
          method="POST"
        >
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
