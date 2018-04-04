(function() {
    'use strict';
    angular.module('scrapeImagesModule')
        .controller('mainController', _mainController);
    _mainController.$inject = ['commonMethodService'];

    function _mainController(commonMethodService) {
        var mainCtrl = this;
        commonMethodService.showHideLoader = _showHideLoader;
        function _showHideLoader(value) {
            mainCtrl.showLoader = value
        }
    }
})();