'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',['$scope','$routeParams','httpService','$sce',
    function($scope,$routeParams,httpService,$sce) {
    $scope.url = $routeParams.url;
    $scope.openSource = function(){
        window.open($scope.url);
    }
    httpService.getNews($scope.url).then(
        function(data, status) {
            $scope.header = $sce.trustAsHtml(data.header);
            $scope.highLight = $sce.trustAsHtml(data.highLight);
            $scope.content = $sce.trustAsHtml(data.content);
        },
        function(data, status) {
            $scope.content = data || "Request failed";
        }
    );
}]);