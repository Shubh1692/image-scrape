(function () {
    'use strict';
    angular.module('scrapeImagesModule', [
        'ui.router'
    ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $stateProvider
                .state('search', {
                    url: "/search",
                    templateUrl: "views/search.html",
                    controller: 'searchController',
                    controllerAs: 'searchCtrl',
                })
                .state('search_history', {
                    url: "/search_history",
                    templateUrl: "views/search_history.html",
                    controller: 'searchHistoryController',
                    controllerAs: 'historyCtrl',
                })
                .state('search_images', {
                    url: "/search_images",
                    templateUrl: "views/search_images.html",
                    controller: 'searchImagesController',
                    controllerAs: 'imgCtrl',
                });
            $urlRouterProvider.otherwise("/search");
        }]);
})();