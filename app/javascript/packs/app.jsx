// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'

class Hello extends Component {
  render() {
    axios.get('/users')
      .then(function ({data}) {
        var list = document.getElementById('axios-me');

        list.innerHTML = null;

        _.each(data, function(user) {
          var li = document.createElement('li');
          li.innerText = user.name;
          list.append(li);
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return (
      <ul id="axios-me">
        <li>Loading...</li>
      </ul>
    );
  }
}

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: React.PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name={name} />,
    document.body.appendChild(document.createElement('div')),
  )
})
