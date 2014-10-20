'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  "mobile-angular-ui",
  'myApp.view1',
  'myApp.view2',
  'myApp.home',
  'myApp.menu'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/vnexpress'});
}])

//http service
.service('httpService', function($http, $q){
  this.getNews = function(url){
      //Mapping url with data
      var domain = url.split('/')[2];
      var mappingData = dataConfig[domain];

      var deferred = $q.defer();
      $http({
        header:{},
        method: 'GET',
        url: "http://10.0.1.154:8888",
        params:{url:url}
      }).success(function(data){
        deferred.resolve(mappingData.getData(data));
      }).error(function(data){
        deferred.reject('There was an error')
      })
      return deferred.promise;
    }

     this.getNewsCategory = function(url){

     }
     this.getNewsPublisher = function(url){
        var deferred = $q.defer();
        $http({
            header:{},
            method: 'GET',
            url: "http://10.0.1.154:8888",
            params:{url:url}
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                deferred.reject('There was an error')
            })
        return deferred.promise;
     }
});

var dataConfig = {
    "vnexpress.net":vnexpressView,
    "dulich.vnexpress.net":vnexpressView,
    "kinhdoanh.vnexpress.net":{
            root:'#col_660',
            header:'div.title_news',
            heightLight:'div.short_intro',
            content:'div.fck_detail'
        },
    "tuoitre.vn":{
            root:'section.content',
            header:'#object_title',
            heightLight:'p.txt-head',
            content:'div.fck'
        },
    "vov.vn":{
            root:'div.container',
            header:'section.main-article >h1',
            heightLight:'p.sapo',
            content:'div.article-body'
        },
    "vtv.vn":{
            root:'div.contentleft',
            header:'h1.news-title',
            heightLight:'h2.news-sapo',
            content:'div.detail_left'
        },
    "www.thanhnien.com.vn":{
            root:'#print-news',
            header:'h1.mainTitle',
            heightLight:'h2.ms-rteElement-H2',
            content:'div.article-content'
        }
    };
