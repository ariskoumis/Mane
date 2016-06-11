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

.controller('videoControl', function($scope, $cordovaCapture) {
  $scope.captureAudio = function() {
    var options = { limit: 3, duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

  $scope.captureImage = function() {
    var options = { limit: 3 };

    $cordovaCapture.captureImage(options).then(function(imageData) {
      // Success! Image data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
})