(function () {
    'use strict';
    angular.module('scrapeImagesModule')
        .constant('_', window._)
        .constant('NODE_WEB_API', {
            'ON_SEARCH': 'search/',
            'GET_SERARCH_HISTORY': 'search/',
            'GET_SERARCH_RESULT': 'search_result/'
        })
        .constant('ERROR_MESSAGE', {
            'NO_INTERNET_CONNECTIVITY': 'No internet connectivity here please check your internet connection !',
            'UNKNOWN_ERROR': 'Unknown Error',
            'NO_DATA_EXIST': 'no data exist'
        });
})();