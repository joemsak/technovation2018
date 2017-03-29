import axios from 'axios'
import _ from 'lodash'

export default function handleFormSubmit(e, options) {
  e.preventDefault();
  e.persist();

  _.each(e.target.querySelectorAll('.field .error-msg'), function(el) {
    el.remove();
  });

  axios({
    url: e.target.action,
    method: 'POST',
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
    },
    data: new FormData(e.target),
  })

  .then(function(response) {
    options.then(response.data);
  })

  .catch(function (error) {
    handleFormErrors(error, e.target, { fieldPrefix: options.fieldPrefix });
  });
}

function handleFormErrors(error, el, options) {
  var errors = error.response.data,
      fieldsWithErrors = _.keys(errors);

  _.each(fieldsWithErrors, function(field) {
    var input = el.querySelector("#" + options.fieldPrefix + "_" + field);

    _.each(errors[field], function(err) {
      var errMsg = document.createElement('div');

      errMsg.classList.add('error-msg');
      errMsg.innerText = err;

      input.after(errMsg);
    });
  });
}
