
var app = angular.module('finder', [], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

// then compare the array to families.json
app.controller('ctrl', function($scope, $filter, $http, $location) {
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.data = [];

  var path = $location.path().split('/');
  var locationSearch = path[1];
  var locationPage = path[2];

  if(locationPage){
    $scope.currentPage = locationPage - 1;
  }else {
    $scope.currentPage = 0;
  }

  if(locationSearch) {
    $scope.search = locationSearch;
  } else {
    $scope.search = 'tattoo';
    $location.path("/tattoo");
  }


  $http.get('families.json')
  .then(function(res){
    $scope.data = res.data;

    // log fonts that only have less than 1 tag
    angular.forEach($scope.data, function(key) {
      if (key.tags.length < 2) {
        console.log("Needs more tags: " + key.family + "\thttps://www.google.com/fonts/specimen/"+key.family.split(" ").join("+"));
      }
    });

    // log new fonts - fonts that needs to be added to families.json
    var storedFamilies = [];
    var apiFamilies = [];
    var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE";
    angular.forEach($scope.data, function(key) {
      storedFamilies.push(key.family);
    });
    $http.get(url)
    .then(function(res){
      $scope.api = res.data.items;

      angular.forEach($scope.api, function(key) {
        apiFamilies.push(key.family);
      });
      var needToAdd = _.difference(apiFamilies,storedFamilies);
      angular.forEach(needToAdd, function(key) {
        var found = $filter('filter')($scope.api, {family: key}, true);
         if (found.length) {
             var cat = found[0].category;
         }
        console.log('Need to add: { "family": "'+key+'", "tags": ["'+cat+'"] },\thttp://www.google.com/fonts#UsePlace:use/Collection:'+key.split(' ').join('+'));
      });
    });
  });


  $scope.updateLocation = function() {
    $location.path("/"+$scope.search);
  };
  $scope.reset = function() {
    $location.path("");
    $scope.search = "";
  };

  $scope.updateLocPage = function() {
    $location.path("/"+$scope.search+"/"+ ($scope.currentPage + 1 ) );
    window.scrollTo(0, 0);
  };

  $scope.resetPagination = function() {
    $scope.currentPage = 0;
    $scope.updateLocation();
  };

  $scope.selectTag = function(i) {
    $scope.search = i;
    $scope.resetPagination();
    $location.path("/"+i);
    window.scrollTo(0, 0);
  };

  $scope.numberOfPages=function(){
    var myFilteredData = $filter('filter')($scope.data,$scope.search,true);
    return Math.ceil(myFilteredData.length/$scope.pageSize);
  }

  $scope.numberOfResults=function(){
    var myFilteredData = $filter('filter')($scope.data,$scope.search,true);
    return Math.ceil(myFilteredData.length);
  }

  $scope.uniqueTags = function() {
    return _.chain($scope.data)
    .pluck('tags')
    .flatten()
    .countBy()
    .value();
  };
})

app.filter('startFrom', function() {
  return function(input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});
