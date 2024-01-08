var exec = require("cordova/exec");

exports.makeAPIRequest = function (url, headers, success, error) {
  exec(success, error, "ApiRequest", "makeAPIRequest", [url, headers]);
};
