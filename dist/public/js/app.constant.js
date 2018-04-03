(function () {
    'use strict';
    angular.module('scrapeImagesModule')
        .constant('_', window._)
        .constant('NODE_WEB_API', {
            'ON_SEARCH': 'search/'
        })
        .constant('ERROR_MESSAGE', {
            'NO_INTERNET_CONNECTIVITY': 'No internet connectivity here please check your internet connection !',
            'UNKNOWN_ERROR': 'Unknown Error'
        });
})();