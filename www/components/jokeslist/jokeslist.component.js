angular.module("myApp").component("jokeslist", {
  templateUrl: "components/jokeslist/jokeslist.template.html",
  controller: function ($scope) {
    $scope.jokes = [];

    $scope.gridOptions = {
      enableFiltering: true,
      data: $scope.jokes,
      columnDefs: [
        { field: "value", displayName: "Joke" },
        // Add other column definitions as needed
      ],
    };

    $scope.showJokes = function () {
      $scope.gridOptions.data = $scope.jokes;
    };

    $scope.fetchJokes = function (category) {
      var url = `https://api.chucknorris.io/jokes/search?query=${category}`;
      var headers = {
        "Content-Type": "application/json",
      };

      cordova.plugins.ApiRequest.makeAPIRequest(
        url,
        headers,
        async function (response) {
          await $scope.$apply(function () {
            $scope.jokes = response.result.slice(0, 10);
            $scope.showJokes();
          });
        },
        function (error) {
          console.error("API Request Error:", error);
          // Handle error cases
        }
      );
    };

    document.addEventListener("deviceready", function () {
      $scope.fetchJokes("fun"); // Fetch jokes initially with a default category
    });
  },
});
