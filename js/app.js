var app = angular.module('finder', [], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('ctrl', function($scope, $filter, $http, $location) {
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.data = [];

  var path = $location.path().split('/');
  var locationSearch = path[1];
  var locationPage = path[2];

  if (locationPage){
    $scope.currentPage = locationPage - 1;
  } else {
    $scope.currentPage = 0;
  }

  if (locationSearch) {
    $scope.search = locationSearch;
  } else {
    $scope.search = 'tattoo';
    $location.path("/tattoo");
  }


  $http.get('families.json')
  .then(function(res){
    $scope.data = res.data;

    $scope.helpWantedTags();
    $scope.helpWantedNewFont();
  });

  /* log fonts that only have less than 1 tag */
  $scope.helpWantedTags = function() {
    console.groupCollapsed("Help wanted! These fonts need more tags in families.json");
    console.info("These fonts need more tags, add them to families.json. Learn more about the font by following the provided link to the font's specimen.");
    angular.forEach($scope.data, function(key) {
      if (key.tags.length < 2) {
        console.log(key.family + "\thttps://www.google.com/fonts/specimen/"+key.family.split(" ").join("+"));
      }
    });
    console.groupEnd();
  };

  /* log new fonts - fonts that needs to be added to families.json */
  $scope.helpWantedNewFont = function() {
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

      /*
      console.groupCollapsed("Not latin subset");
      var found = $filter('filter')($scope.api, {subsets:'!latin'});
      angular.forEach(found, function(key) {
      console.log(key.family + ' ' + key.subsets);
    });
    console.groupEnd();
    */

    var needToAdd = _.difference(apiFamilies,storedFamilies);
    if (needToAdd.length) {
      console.groupCollapsed("Help wanted! These fonts need to be added to families.json");
      console.info("Copy and paste the following into families.json. Be sure to keep the font family names in alphabetical order.");
      angular.forEach(needToAdd, function(key) {
        var found = $filter('filter')($scope.api, {family: key}, true);
        if (found.length) {
          var cat = found[0].category;
        }
        // check variants
        if ( $.inArray('regular', found[0].variants) == -1 ) {

          // if italic
          if(  $.inArray('italic', found[0].variants) == 0 ) {
            console.log('{ "family": "'+key+'", "tags": ["'+cat+'"], "italic": "400italic" },');
          } else {
            console.log('{ "family": "'+key+'", "tags": ["'+cat+'"], "weight": "'+found[0].variants[0]+'" },');
          }

        }
        // check subsets
        else if ( $.inArray('latin', found[0].subsets) == -1 ) {
          console.log('{ "family": "'+key+'", "tags": ["'+cat+'","'+found[0].subsets+'"] },');
        } else {
          console.log('{ "family": "'+key+'", "tags": ["'+cat+'"] },');
        }

      });
      console.groupEnd();
    }
  });

};


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
    start = +start;
    return input.slice(start);
  }
});
