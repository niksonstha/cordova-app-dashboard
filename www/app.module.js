var myApp = angular.module("myApp", [
  "ui.router",
  "ui.grid",
  "ui.grid.importer",
  "navbar",
  "dashboard",
  "studentDetails",
]);
myApp.config(function ($stateProvider, $urlRouterProvider) {
  var dashboard = {
    name: "dashboard",
    url: "/dashboard",
    component: "dashboard",
  };
  var studentDetails = {
    name: "studentDetails",
    url: "/studentDetails",
    component: "studentDetails",
  };

  $stateProvider.state(dashboard);
  $stateProvider.state(studentDetails);
  $urlRouterProvider.otherwise("/dashboard");
});

myApp.controller("MainController", function ($scope) {
  $scope.$on("toggleNavbarEvent", function () {
    var navbarElement = document.querySelector(".navbar");
    navbarElement.classList.toggle("smallerNavbar");
  });
});
