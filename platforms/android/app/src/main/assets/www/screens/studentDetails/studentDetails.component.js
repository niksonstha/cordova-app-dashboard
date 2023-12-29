angular.module("myApp").component("studentDetails", {
  templateUrl: "screens/studentDetails/studentDetails.template.html",
  controller: function ($scope) {
    $scope.isLoading = true; // Initially set to true to show the loader

    // Retrieve data from local storage
    var storedDetails = localStorage.getItem("studentData");

    if (storedDetails) {
      // Simulate asynchronous operation (e.g., setTimeout for demo purposes)
      setTimeout(function () {
        $scope.$apply(function () {
          $scope.details = JSON.parse(storedDetails);
          $scope.isLoading = false; // Set isLoading to false when data is retrieved
        });
      }, 1000); // Simulated delay of 1 second
    } else {
      $scope.details = []; // Initialize as an empty array if no data is found
      $scope.isLoading = false; // Set isLoading to false if no data is found
      console.log("No stored data found.");
    }
  },
});
