(function () {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('searchController', _searchController);
    _searchController.$inject = ['commonMethodService', '_', 'ERROR_MESSAGE', 'NODE_WEB_API'];

    function _searchController(commonMethodService, _, ERROR_MESSAGE, NODE_WEB_API) {
        var searchCtrl = this;
        searchCtrl.onSearchSubmit = _onSearchSubmit;
        searchCtrl.searchResult = [];
        function _onSearchSubmit(search) {
            console.log('search keyword', search)
            commonMethodService.serverRequest(NODE_WEB_API.ON_SEARCH + search, 'GET')
                .then(_onSearchSuccess)
        }


        function _onSearchSuccess(success) {
            console.log(success)
            if (success.search.length)
                searchCtrl.searchResult = success.search;
            else 
                alert(ERROR_MESSAGE.NO_DATA_EXIST)
        }
    }
})();