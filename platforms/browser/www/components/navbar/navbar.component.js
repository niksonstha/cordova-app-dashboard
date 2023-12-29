angular.module("myApp").component("navbar", {
  templateUrl: "components/navbar/navbar.template.html",
  controller: function ($scope, $rootScope, $window) {
    function checkIfMobile() {
      return $window.innerWidth <= 768; // Adjust this value based on your design
    }

    $scope.isSmallerNavbar = checkIfMobile();
    $scope.showBarsIcon = !$scope.isSmallerNavbar; // Initially set based on view size

    angular.element($window).bind("resize", function () {
      $scope.$apply(function () {
        $scope.isSmallerNavbar = checkIfMobile();
        $scope.showBarsIcon = !$scope.isSmallerNavbar;
        $scope.showBarsIcon = !$scope.isSmallerNavbar; // Update visibility based on view size
      });
    });

    $scope.toggleNavbar = function () {
      $rootScope.$broadcast("toggleNavbarEvent");
      $scope.isSmallerNavbar = !$scope.isSmallerNavbar;
      // Update visibility after toggle
    };
  },
});
