'use strict';

angular.module('angular-uploader')
  .component('main', {
  templateUrl: '../views/main.html',
  controller: function ($scope,$sce) {
    $scope.url = $sce.trustAsResourceUrl('');
    $scope.changeIt = function (url) {
      $scope.url = $sce.trustAsResourceUrl(url);
    }
    var api_password = "0594a44cfba29a3134385bd1adebf66e02832f1b968cbb19c39c18c4cda86768";
    var requestData = jQuery.param({
      api_password: api_password
    });
    $scope.options = {
      url: 'https://upload.wistia.com/?access_token=0594a44cfba29a3134385bd1adebf66e02832f1b968cbb19c39c18c4cda86768',
      success: function (data) {
        console.log(data);
        var hashed_id = data.hashed_id;
        $scope.changeIt('//fast.wistia.net/embed/iframe/' + hashed_id);
      },
      error: function (data) {
        console.log('Error');
      }
    };

    var file = $scope.file,
      state;
    if (file && file.url) {
      file.$state = function () {
        return state;
      };
      file.$destroy = function () {
        state = 'pending';
        return $http({
          url: file.deleteUrl,
          method: file.deleteType
        }).then(
          function () {
            state = 'resolved';
            $scope.clear(file);
          },
          function () {
            state = 'rejected';
          }
        );
      };
    } else if (file && !file.$cancel && !file._index) {
      file.$cancel = function () {
        $scope.clear(file);
      };
    }
  }
});
