'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl',['$scope', '$http','httpService', '$sce' , function($scope, $http, httpService, $sce) {
    $scope.entries = [];
    var feed = new google.feeds.Feed("https://news.google.com.vn/news/feeds?pz=1&cf=all&ned=vi_vn&hl=vi&output=rss");
    feed.setNumEntries(20);
    feed.load(function (data){
        data.feed.entries.forEach(function(entry){
            var table = document.createElement('div');
            table.innerHTML = entry.content;
            entry.title = table.querySelector('a >b').textContent;
            entry.link = table.querySelector('a').href.split("url=").pop();
            entry.image = table.querySelector('img').getAttribute("src");
            entry.author = table.querySelector('b >font').textContent;
            entry.contentSnippet = table.querySelectorAll('font[size="-1"]')[1].textContent;
            entry.refNews = Array.prototype.slice.call(table.querySelectorAll('a')).pop().href;
            entry.source = entry.link.split('/')[2];
        });
        $scope.entries =  data.feed.entries;
        $scope.$apply();
    });

//    httpService.getNewsPublisher("https://news.google.com.vn").then(
//        function(data, status) {
//            var domNews = new DOMParser().parseFromString(data, "text/html").querySelector("div.top-stories-section");
//            $scope.listTopNews = getTopNews(domNews);
//        },
//        function(data, status) {
//            $scope.content = data || "Request failed";
//    });
//    function getTopNews(domNews){
//        var topNews = {};
//        topNews.title = domNews.querySelector("span.section-name").textContent;
//        topNews.listNews = getListNews(domNews.querySelectorAll("div.blended-wrapper"));
//        return topNews;
//    };
//
//    function getListNews(listDom){
//        var listNews = [];
//        Array.prototype.slice.call(listDom).forEach(function(item,id){
//            listNews.push({
//                id : id,
//                title : $sce.trustAsHtml(item.querySelector('div.esc-lead-article-title-wrapper').innerHTML),
//                news_lead : item.querySelector('div.esc-lead-snippet-wrapper').textContent,
//                image : item.querySelector('img.esc-thumbnail-image').getAttribute('src'),
//                href : item.querySelector('a.article').getAttribute('url')
//            });
//        });
//        return listNews;
//    };
}]);

//angular.module('feedModule', ['ngResource'])
//	.factory('FeedLoader', function ($resource) {
//		return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
//			fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
//		});
//	})
//	.service('FeedList', function ($rootScope, FeedLoader) {
//		this.get = function(url) {
//					FeedLoader.fetch({q: url, num: 10}, {}, function (data) {
//						var feed = data.responseData.feed;
//						feeds.push(feed);
//					});
//				}
//
//			return feeds;
//		};
//	});