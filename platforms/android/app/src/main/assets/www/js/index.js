document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log(cordova.plugins.makeAPIRequest);
}
