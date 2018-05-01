var myApp = angular.module('angular-uploader', ['ui.router', 'blueimp.fileupload'])
  .config([
    '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      fileUploadProvider.defaults.redirect = window.location.href.replace(
        /\/[^\/]*$/,
        '/cors/result.html?%s'
      );
      {
        angular.extend(fileUploadProvider.defaults, {
          disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
          maxFileSize: 99999000,
          acceptFileTypes: /(\.|\/)(mp4|webm|ogg)$/i
        });
      }
    }
  ]);

myApp.config(function($stateProvider) {
  var componentState = {
    name: 'main',
      url: '',
    component: 'main'
  }

  $stateProvider.state(componentState);
});
