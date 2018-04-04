(function() {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('searchImagesController', _searchImagesController);
    _searchImagesController.$inject = ['commonMethodService', '_', 'NODE_WEB_API', 'ERROR_MESSAGE', '$stateParams'];

    function _searchImagesController(commonMethodService, _, NODE_WEB_API, ERROR_MESSAGE, $stateParams) {
        var imgCtrl = this;

        function _getSearchResult(search_id) {
            commonMethodService.serverRequest(NODE_WEB_API.GET_SERARCH_RESULT + search_id , 'GET')
                .then(_onSearchResultSuccess)
        }

        function _onSearchResultSuccess(success) {
            if (success && success.search_result) {
                imgCtrl.searchResult = success.search_result;
            } else {
                alert(ERROR_MESSAGE.NO_DATA_EXIST)
            }
        }

        _getSearchResult($stateParams.search_id)
    }
})();