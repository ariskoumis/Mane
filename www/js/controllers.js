angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('videoControl', function($scope, $cordovaCamera, $ionicPlatform) {
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    $ionicPlatform.ready(function() {
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        sourceType: Camera.PictureSourceType.CAMERA
      }
      $scope.takePicture = function() {
        $cordovaCamera.getPicture(options).then(function(data) {
          $scope.pictureUrl = "data:image/jpeg;base64,"+data;
        }, function(error) {
            console.log('HEY')
        })
      }
      $scope.takeVideo = function() {
        // capture callback
        function captureSuccess(s) {
          console.log("Success");
          console.dir(s[0]);
          var v = "<video controls='controls'>";
          v += "<source src='" + s[0].fullPath + "' type='video/mp4'>";
          v += "</video>";
          document.querySelector("#videoArea").innerHTML = v;
        }

        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start video capture
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
      }
    })
  }
})