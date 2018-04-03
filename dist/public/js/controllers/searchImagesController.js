(function() {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('searchImagesController', _searchImagesController);
    _searchImagesController.$inject = ['commonMethodService', '_'];

    function _searchImagesController(commonMethodService, _) {
        var imgCtrl = this;
    }
})();