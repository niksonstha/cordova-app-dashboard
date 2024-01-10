angular.module("myApp").component("dashboard", {
  templateUrl: "screens/dashboard/dashboard.template.html",
  controller: function ($scope, $window) {
    function setOptions(srcType) {
      var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true,
      };
      return options;
    }

    function saveToFiles(imageUri) {
      var fileSystem = $window.cordova.file.dataDirectory;
      var timestamp = new Date().getTime();
      var fileName = "captured_image_" + timestamp + ".jpg";

      $window.resolveLocalFileSystemURL(
        fileSystem,
        function (dir) {
          dir.getDirectory(
            "images",
            { create: true },
            function (subDir) {
              $window.resolveLocalFileSystemURL(
                imageUri,
                function (file) {
                  file.copyTo(
                    subDir,
                    fileName,
                    function (newFile) {
                      var savedFilePath = newFile.toInternalURL();
                      console.log("Image saved to: " + savedFilePath);
                      displaySavedImage(savedFilePath);
                    },
                    function (copyError) {
                      console.error("Error copying file: ", copyError);
                    }
                  );
                },
                function (resolveError) {
                  console.error("Error resolving image URI: ", resolveError);
                }
              );
            },
            function (subDirError) {
              console.error("Error accessing directory: ", subDirError);
            }
          );
        },
        function (fileSystemError) {
          console.error("Error accessing file system: ", fileSystemError);
        }
      );
    }
    function displaySavedImage(savedFilePath) {
      var imageCarousel = $("#imageCarousel");

      var imgElement = document.createElement("img");
      imgElement.onload = function () {
        imgElement.style.maxWidth = "100%";

        imageCarousel.owlCarousel("add", imgElement);
      };
      imgElement.onerror = function () {
        console.error("Error loading image:", savedFilePath);
        // Handle error: Maybe display a placeholder image or show an error message
      };
      imgElement.src = savedFilePath;
    }

    $scope.openCamera = function () {
      var srcType = Camera.PictureSourceType.CAMERA;
      var options = setOptions(srcType);

      navigator.camera.getPicture(
        function cameraSuccess(imageUri) {
          console.log("Image captured:", imageUri);
          saveToFiles(imageUri); // Save the captured image to files
        },
        function cameraError(error) {
          console.debug("Unable to obtain picture: " + error, "app");
        },
        options
      );
    };
  },
});
