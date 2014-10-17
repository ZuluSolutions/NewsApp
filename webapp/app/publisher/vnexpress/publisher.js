'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vnexpress', {
    templateUrl: 'publisher/vnexpress/publisher.html',
    controller: 'vnexpressCtrl'
  });
}])

.controller('vnexpressCtrl',['$scope','httpService', function($scope,httpService) {
    $scope.url = "http://vnexpress.net/";
    $scope.big_hot_news = {};

    httpService.getNewsPublisher($scope.url).then(
        function(data, status) {
        var html = document.createElement('html');
                    html.innerHTML = data;
            var domNews = html.querySelector("#container");

            //Big hot new
            var div_box_news_top = domNews.querySelector("#box_news_top");
            $scope.big_hot_news.image = div_box_news_top.querySelector("img.width_image_common");
            $scope.big_hot_news.title = div_box_news_top.querySelector('div.title_news').textContent;
            $scope.big_hot_news.lead = div_box_news_top.querySelector('div.news_lead').textContent;
            $scope.big_hot_news.href = div_box_news_top.querySelector('a').href;


            //List hot news
            $scope.listHotNews = $scope.getListHostNews(domNews.querySelectorAll("#news_home>li"));
        },
        function(data, status) {
            $scope.content = data || "Request failed";
    });

    //Go to news page with url
    $scope.clickOK = function(href){

    }

    $scope.getListHostNews = function(dom){
        var listNews=[];
        Array.prototype.slice.call(dom).forEach(function(li){
            listNews.push({
                title_news : li.querySelector('div.title_news').textContent,
                news_lead : li.querySelector('div.news_lead').textContent,
                image : li.querySelector('div.thumb').querySelector('img'),
                href : li.querySelector('a').href
            });
        });
        return listNews;
    }

}]);