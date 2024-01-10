angular.module("myApp").component("jokeslist", {
  templateUrl: "components/jokeslist/jokeslist.template.html",
  controller: function ($scope) {
    $scope.jokes = [];

    $scope.gridOptions = {
      enableFiltering: true,
      // Initialize gridOptions with an empty data array
      data: [],
      columnDefs: [
        { field: "value", displayName: "Joke" }, // Assuming 'value' is the field containing the joke text
        // Add other column definitions as needed
      ],
    };

    $scope.showJokes = function () {
      $scope.gridOptions.data = $scope.jokes; // Set the fetched jokes data to gridOptions
    };

    document.addEventListener("deviceready", function () {
      var url = "https://api.chucknorris.io/jokes/search?query=fun";
      var headers = {
        "Content-Type": "application/json",
      };

      cordova.plugins.ApiRequest.makeAPIRequest(
        url,
        headers,
        async function (response) {
          await $scope.$apply(function () {
            // Extend the jokes array instead of pushing an array into it
            $scope.jokes = $scope.jokes.concat(response.result.slice(0, 10));
            // Call showJokes after data is fetched and updated
            $scope.showJokes();
          });
        },
        function (error) {
          console.error("API Request Error:", error);
          // Handle error cases
        }
      );
    });
  },
});
