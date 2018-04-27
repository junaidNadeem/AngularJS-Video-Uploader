(() => {
    'use strict';

const app = angular.module('app', [
    'blueimp.fileupload'
])
    .config([
    '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        fileUploadProvider.defaults.redirect = window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        );
        {
            // Demo settings:
            angular.extend(fileUploadProvider.defaults, {
                // Enable image resizing, except for Android and Opera,
                // which actually support image resizing, but fail to
                // send Blob objects via XHR requests:

                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                maxFileSize: 99999000,
                acceptFileTypes: /(\.|\/)(mp4|jpe?g|png)$/i
            });
        }
    }
])
/*
    .controller('DemoFileUploadController', [
        '$scope', '$sce', '$http', '$filter', '$window',
        function ($scope, $sce, $http) {

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
        }
    ])

    .controller('FileDestroyController', [
        '$scope', '$http',
        function ($scope, $http) {
            var file = $scope.file,
                state;
            if (file.url) {
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
            } else if (!file.$cancel && !file._index) {
                file.$cancel = function () {
                    $scope.clear(file);
                };
            }
        }
    ]);*/
app.component('userInfo', {
    templateUrl: '/components/file-uploader.html',

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
})();





/*
;(function () {
    'use strict';

    var isOnGitHub = window.location.hostname === 'blueimp.github.io',
        url = 'https://upload.wistia.com/?access_token=0594a44cfba29a3134385bd1adebf66e02832f1b968cbb19c39c18c4cda86768';
    console.log('app.js');
    angular.module('demo', [
        'blueimp.fileupload'
    ])
        .config([
            '$httpProvider', 'fileUploadProvider',
            function ($httpProvider, fileUploadProvider) {
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                );
                {
                    // Demo settings:
                    angular.extend(fileUploadProvider.defaults, {
                        // Enable image resizing, except for Android and Opera,
                        // which actually support image resizing, but fail to
                        // send Blob objects via XHR requests:

                        disableImageResize: /Android(?!.*Chrome)|Opera/
                            .test(window.navigator.userAgent),
                        maxFileSize: 99999000,
                        acceptFileTypes: /(\.|\/)(mp4|jpe?g|png)$/i
                    });
                }
            }
        ])

        .controller('DemoFileUploadController', [
            '$scope', '$sce', '$http', '$filter', '$window',
            function ($scope, $sce, $http) {

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
            }
        ])

        .controller('FileDestroyController', [
            '$scope', '$http',
            function ($scope, $http) {
                var file = $scope.file,
                    state;
                if (file.url) {
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
                } else if (!file.$cancel && !file._index) {
                    file.$cancel = function () {
                        $scope.clear(file);
                    };
                }
            }
        ]);

}());*/

