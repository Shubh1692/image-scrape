(function () {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('searchHistoryController', _searchHistoryController);
    _searchHistoryController.$inject = ['commonMethodService', '_', 'NODE_WEB_API','ERROR_MESSAGE'];

    function _searchHistoryController(commonMethodService, _, NODE_WEB_API, ERROR_MESSAGE) {
        var historyCtrl = this;
        historyCtrl.currentPage = 0;
        historyCtrl.searchHistory = [];
        historyCtrl.getSearchHistory = _getSearchHistory
        function _getSearchHistory(page) {
            commonMethodService.serverRequest(NODE_WEB_API.GET_SERARCH_HISTORY + '?page=' + page, 'GET')
                .then(_onSearchHistorySuccess)
        }

        function _onSearchHistorySuccess(success) {
            if (success && success.search && success.search.docs.length) {
                historyCtrl.searchHistory = success.search.docs;
                historyCtrl.currentPage++;
            } else {
                alert(ERROR_MESSAGE.NO_DATA_EXIST)
            }

        }


        _getSearchHistory(historyCtrl.currentPage + 1);
    }
})();