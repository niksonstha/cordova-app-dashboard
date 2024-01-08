document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  var url = "https://jsonplaceholder.typicode.com/users";
  var headers = {
    "Content-Type": "application/json",
  };

  cordova.plugins.ApiRequest.makeAPIRequest(
    url,
    headers,
    function (response) {
      console.log("Raw API Response:", response);
    },
    function (error) {
      console.error("API Request Error:", error);
      // Handle error cases
    }
  );
}
