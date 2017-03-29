import _ from 'lodash'

export default function handleFormErrors(error, el, options) {
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
