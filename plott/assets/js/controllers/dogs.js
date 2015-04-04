'use strict';

angular.module('plott')
  .controller('dogsCtrl', ['$http', '$scope', '$upload',
    function ($http, $scope, $upload) {

      $scope.dog = {};



      $scope.breeds;
      $scope.fileName;
      //Get dog breets for selections
      $http.get('/breeds')
        .success(function(res){

          $scope.breeds = res;
          $scope.breeds.unshift({name: 'Select a breed'});
          $scope.dog.breed = $scope.breeds[0]; //{name: 'Select a breed'};
        })
        .error(function(err){
          console.log(err);
        });


      //Handle fileuploads
      $scope.$watch('files', function () {
          $scope.upload($scope.files);
      });
      //Watch fileName
      $scope.$watch('fileName', function () {

      });

      $scope.upload = function (files) {
          if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                  var file = files[i];
                  $scope.fileName = {fileName: $scope.dog.dogid + '.' + file.name.split('.')[1]};
                  $upload.upload({
                      url: 'dogs/upload',
                      fields: $scope.fileName,
                      file: file
                  }).progress(function (evt) {
                      $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                      console.log('progress: ' +   $scope.progressPercentage + '% ' + evt.config.file.name);
                  }).success(function (data, status, headers, config) {
                      console.log('file ' + config.file.name + 'uploaded.');
                      console.log(data);
                  });
              }
          }
      };

      $scope.save = function (data){
          var config = {
            url: '/dogs/create',
            method: 'POST',
            params: data
          };
          console.log(data);
          // $http(config).success(function(res){
          //   console.log(res);
          // })
          // .error(function(err){
          //   console.log(err);
          // });


      };

    }]);
