cordova.define("ApiRequest.ApiRequest", function(require, exports, module) { var exec = require("cordova/exec");

exports.makeAPIRequest = function (url, headers, success, error) {
  exec(success, error, "ApiRequest", "makeAPIRequest", [url, headers]);
};

});
