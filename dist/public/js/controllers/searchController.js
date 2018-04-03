(function () {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('searchController', _searchController);
    _searchController.$inject = ['commonMethodService', '_', 'NODE_WEB_API'];

    function _searchController(commonMethodService, _, NODE_WEB_API) {
        var searchCtrl = this;
        searchCtrl.onSearchSubmit = _onSearchSubmit;

        function _onSearchSubmit(search) {
            console.log('search keyword', search)
            commonMethodService.serverRequest(NODE_WEB_API.ON_SEARCH + search, 'GET')
                .then(_onSearchSuccess)
        }


        function _onSearchSuccess(success) {
            console.log(success)
        }
    }
})();