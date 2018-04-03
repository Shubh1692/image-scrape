(function () {
    'use strict';
    angular.module('scrapeImagesModule')
        .factory('commonMethodService', _commonMethodService)
    _commonMethodService.$inject = ['$http', '$q', '$state', 'ERROR_MESSAGE', 'NODE_WEB_API'];

    function _commonMethodService($http, $q, $state, ERROR_MESSAGE, NODE_WEB_API) {
        var commonMethodService = {};
        commonMethodService.serverRequest = _serverRequest;
        commonMethodService.serverError = _serverError;

        function _serverRequest(url, method, postData, hideErrorFlag) {
            var defer = $q.defer();
            var data = postData || '';
            if (navigator.onLine) {
                $http({
                    method: method,
                    url: url,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        defer.resolve(res.data);
                    } else {
                        defer.reject(res);
                        if (!hideErrorFlag)
                            commonMethodService.serverError(res);
                    }
                }, function (res, status, headers, config) {
                    if (!hideErrorFlag)
                        commonMethodService.serverError(res);
                    defer.reject(res);
                });
            } else {
                alert(ERROR_MESSAGE.NO_INTERNET_CONNECTIVITY);
            }
            return defer.promise;
        };
        function _serverError(res) {
            if (res && res.data && res.data.errorMessage) {
                alert(res.data.errorMessage);
            } else if (res && res.status === 401) {
                alert(res.statusText);
                $state.go('search');
            } else {
                alert(ERROR_MESSAGE.UNKNOWN_ERROR);
            }
        };

        return commonMethodService;
    }
})();