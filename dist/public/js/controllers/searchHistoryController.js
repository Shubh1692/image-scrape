(function() {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('searchHistoryController', _searchHistoryController);
    _searchHistoryController.$inject = ['commonMethodService', '_'];

    function _searchHistoryController(commonMethodService, _) {
        var historyCtrl = this;
    }
})();