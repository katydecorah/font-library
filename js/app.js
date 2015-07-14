var app = angular.module('finder', [], function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
})

app.controller('ctrl', function($scope, $filter, $http, $location, $window) {
  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.starter = ($scope.currentPage - 1) * $scope.pageSize;
  $scope.data = [];
  $scope.searchCount = undefined;
  $scope.selectedOrder = 'alpha';
  $scope.dataTemp = [];
  $scope.url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE";

  var orderBy = $filter('orderBy');

  $scope.$watch(function () { return $location.url(); }, function () {

    var path = $location.path().split('/'),
    locationSearch = path[1],
    locationPage = path[2];

    $scope.selectedCategory = $location.search().category;
    $scope.selectedSubsets = $location.search().subset;
    $scope.selectedVariants = $location.search().variant;

    if ($.isNumeric(locationSearch)) {
      // if it's a number
      $scope.currentPage = parseInt(locationSearch);
      //$scope.starter = ($scope.currentPage - 1) * $scope.pageSize;

    } else if (locationSearch == undefined || locationSearch == '' ) {
      // if it's undefined or doesn't exist
      $scope.selectedTags = undefined;
      $scope.currentPage = 1;

    } else { // query the URL

      if (locationPage) {
        // if it has a page number
        $location.path("/"+locationSearch + "/" +locationPage);
        $scope.currentPage = parseInt(locationPage);

      } else if (locationSearch == undefined ) {
        // if it's undefined
        $scope.selectedTags = undefined;

      } else {
        // if it's just a tag
        $location.path("/"+locationSearch);

      }
      $scope.selectedTags = locationSearch.split('+').join(' ');
    }
  });


  $http.get('families.json')
  .then(function(res){
    $scope.dataTemp = res.data;
    $scope.helpWantedNewFont();
  });

  // merges families.json and Google Fonts API
  $http.get($scope.url).success(function(res){
    $scope.api = res.items;
    $scope.data = merge($scope.dataTemp,$scope.api);
  }).error(function(){
    // If app can't connect to Google Font API then just use families.json data
    $scope.data = $scope.dataTemp;
  });

  // reiterate: this breaks when the APIs aren't 1:1
  function merge(obj1,obj2) {
    var result = [];
    for (i in obj1) {
      if ( obj2.indexOf(obj1[i].family) ) {
        result.push({
          'family' : obj1[i].family,
          'tags' : obj1[i].tags,
          'count': obj1[i].tags.length,
          'variants': obj2[i].variants,
          'subsets': obj2[i].subsets,
          'category': obj2[i].category,
          'lastModified': obj2[i].lastModified,
          'lineNumber': parseInt(i) + 2
        });
      } else {
        console.log( 'Something is wrong, cc/' + obj1[i].family);
      }
    }
    return result;
  }

  // reiterate this
  /* log new fonts - fonts that needs to be added to families.json */
  $scope.helpWantedNewFont = function() {
    var storedFamilies = [],
    apiFamilies = [];

    angular.forEach($scope.dataTemp, function(key) {
      storedFamilies.push(key.family);
    });

    $http.get($scope.url)
    .then(function(res){
      $scope.api = res.data.items;

      angular.forEach($scope.api, function(key) {
        apiFamilies.push(key.family);
      });

      var needToAdd = _.difference(apiFamilies,storedFamilies);
      if (needToAdd.length) {
        console.groupCollapsed("New font alert!");
        console.info("Copy and paste the following into families.json. Be sure to keep the font family names in alphabetical order.");
        angular.forEach(needToAdd, function(key) {
          var found = $filter('filter')($scope.api, {family: key}, true);
          if (found.length) {
            var cat = found[0].category;
          }
          var lineNumb = parseInt(_.sortedIndex(storedFamilies,key)) + 2;
          console.log('{ "family": "'+key+'", "tags": [] },\t line ' + lineNumb);
        });
        console.groupEnd();
      }

    });

  };

  $scope.sendAnalytics = function() {
    $window.ga('send', 'pageview', { page: '/#'+$location.url() });
  };

  $scope.updateLocation = function() {
    $location.path("/"+$scope.selectedTags.replace(' ','+'));
    $scope.sendAnalytics();
  };

  $scope.reset = function() {
    $location.path("");
  };

  $scope.updateLocPage = function(i) {

    if( $scope.selectedTags) {
      $location.path("/"+$scope.selectedTags.replace(' ','+')+"/"+ ($scope.currentPage ) );
    }
    else {
      $location.path("/"+ ($scope.currentPage) );
    }

    window.scrollTo(0, 0);
    $scope.sendAnalytics();
  };

  $scope.resetPagination = function() {
    $scope.currentPage = 1;
    if ($scope.selectedTags) {
      $location.path("/"+$scope.selectedTags.split(' ').join('+') +"/")
    } else {
      $location.path("");
    }
    $scope.pageSize = 20;
    window.scrollTo(0, 0);
  };

  $scope.setSearch = function(x,y) {
    $location.search(x, y);
  }

  $scope.selectTag = function(i) {
    $scope.selectedTags = i;
    $scope.resetPagination();
    $location.path("/"+$scope.selectedTags.split(' ').join('+') +"/");
    $scope.sendAnalytics();
    $scope.tagCount = undefined;
  };

  $scope.removeTag = function() {
    $scope.selectedTags = undefined;
    $scope.resetPagination();
    $scope.reset();
    $scope.sendAnalytics();
  };

  $scope.removeCategory = function() {
    $scope.selectedCategory = undefined;
    $scope.resetPagination();
    $location.search('category', null);
  };

  $scope.removeVariant = function() {
    $scope.selectedVariants = undefined;
    $scope.resetPagination();
    $location.search('variant', null);
  };

  $scope.removeSubset = function() {
    $scope.selectedSubsets = undefined;
    $scope.resetPagination();
    $location.search('subset', null);
  };

  $scope.order = function(predicate, reverse) {
    $scope.data = orderBy($scope.data, predicate, reverse);
  };
  $scope.order('-lastModified',false);

  $scope.numberOfPages=function(){
    var myFilteredData = $filter('filter')($scope.data,$scope.search,true);
    return Math.ceil(myFilteredData.length/$scope.pageSize);
  };

  $scope.numberOfResults=function(){
    var myFilteredData = $filter('filter')($scope.data,$scope.search,true);
    return Math.ceil(myFilteredData.length);
  };

  $scope.uniqueTags = function() {
    return _.chain($scope.data)
    .pluck('tags')
    .flatten()
    .countBy()
    .value();
  };

  $scope.uniqueVariants = function() {
    return _.chain($scope.data)
    .pluck('variants')
    .flatten()
    .countBy()
    .value();
  };

  $scope.uniqueSubsets = function() {
    return _.chain($scope.data)
    .pluck('subsets')
    .flatten()
    .countBy()
    .value();
  };

  $scope.uniqueCategory = function() {
    return _.chain($scope.data)
    .pluck('category')
    .flatten()
    .countBy()
    .value();
  };



  $scope.clearFilters = function(){
    $scope.selectedTags =  undefined;
    $scope.selectedSubsets = undefined;
    $scope.selectedVariants = undefined;
    $scope.selectedCategory = undefined;
    $scope.currentPage = 1;
    $location.url($location.path());
    $location.path('');
    $scope.sendAnalytics();
  };
  
  angular.element(document).ready(function () {
    tinysort('#tags>button',{attr:'value'});
  });
  
});

app.filter('startFrom', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
});


app.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

// infinite scroll
$(window).scroll(function() {
  if ($(window).scrollTop() == ( $(document).height() - $(window).height()  ) ) {
    var tempScrollTop = $(window).scrollTop();
    var scope = angular.element($("#families")).scope();
    scope.$apply(function(){
      if (scope.searchCount.length >= scope.pageSize) {
        scope.pageSize = scope.pageSize + 10;
        scope.currentPage= scope.currentPage + 1;
        scope.starter = 0;
      }
    });
    $(window).scrollTop(tempScrollTop);
  }
});
