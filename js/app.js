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
  $scope.sorter = 'tag';
  $scope.familySorter = 'family';
  $scope.preview = undefined;
  $scope.url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE";
    
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
    
    // create unique tag array
    $scope.tags = [ _.map(  
      _.chain($scope.data)
      .pluck('tags')
      .flatten()
      .countBy()
      .value() , function (num,key) {
        return { tag: key, value: num }
      })];
      
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
    
    $scope.selectPreview = function(i) {
      $scope.preview = i;
    };
    
    $scope.selectPreviewVariants = function(i) {
      var styles;
      if ( i.indexOf('italic') > 0 ){
        var styles = ".preview em { font-style: italic; }";
      } else {
        var styles = ".preview em {font-style: normal; }";
      }
      if ( i.indexOf(500) > 0 || i.indexOf(600) > 0 || i.indexOf(700) > 0 || i.indexOf(800) > 0 || i.indexOf(900) > 0 ){
        styles += ".preview strong { font-weight: bold; }";
      } else {
        styles += ".preview strong {font-weight: normal; }";
      }
      $scope.previewStyles = styles;
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
    
    $scope.numberOfPages=function(){
      var myFilteredData = $filter('filter')($scope.data,$scope.search,true);
      return Math.ceil(myFilteredData.length/$scope.pageSize);
    };
    
    $scope.numberOfResults=function(){
      var myFilteredData = $filter('filter')($scope.data,$scope.search,true);
      return Math.ceil(myFilteredData.length);
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
    
    $scope.fontCall = function(i) {
      //get font name
      var font = i.family.replace(' ','+');
      // if no regular variant
      if (i.variants.indexOf('regular') < 0 && i.variants.indexOf('italic') >= 0) {
        font += ':' + i.variants[0];
      }
      // get selected variant
      if ($scope.selectedVariants != undefined) {
        font += ':' + $scope.selectedVariants;
      }
      // if no regular or italic?
      if (i.variants.indexOf('regular') < 0 && i.variants.indexOf('italic') < 0 ) {
        font += ':'+i.variants[0];
      }
      
      // text
      if (i.subsets.indexOf('latin') >=0) {
        font +='&text=' + i.family.replace(' ','+')
      }
      
      // arabic
      if ($scope.selectedSubsets == 'arabic') {
        font += 'مرحبا بالعالم';
      }
  
      // cyrillic
      if ($scope.selectedSubsets == 'cyrillic' || $scope.selectedSubsets == 'cyrillic-ext') {
        font += 'привет мир';
      }
      
      // devanagari
      if ($scope.selectedSubsets == 'devanagari') {
        font += 'हैलो वर्';
      }
      // greek
      if ( (i.subsets.indexOf('latin') < 0 && i.subsets.indexOf('greek') >= 0) ||  $scope.selectedSubsets == 'greek' || $scope.selectedSubsets == 'greek-ext' ) {
        font += 'γειά σου Κόσμε्';
      }
      
      // hebrew
      if ($scope.selectedSubsets == 'hebrew') {
        font += 'שלום עולם';
      }
      
      // telugu
      if ($scope.selectedSubsets == 'telugu') {
        font += 'హలో వరల్డ్';
      }
      
      // vietnamese
      if ($scope.selectedSubsets == 'vietnamese') {
        font += 'xin chào';
      }
      
      // set the subset
      if ( $scope.selectedSubsets != undefined ){
        font += '&subset=' + $scope.selectedSubsets;
      }
      
      return font;
    };
    
    
    // build out the style attr for the font based on the search parameters and what the font supports
    $scope.familyStyle = function(font) {
      
      
      var style = 'font-family: ' + font.family + ';';
      
      if ( font.variants.indexOf('regular') < 0 && font.variants.indexOf('italic') >= 0 ) {
        style += 'font-style: italic;';
      }
      
      if ( font.variants.indexOf('regular') < 0 && font.variants.indexOf('italic') < 0 ) {
        style += 'font-weight: '+font.variants[0] +';';
      }
      
      // when users filters by variant
      if ($scope.selectedVariants != undefined) {
        if ($scope.selectedVariants.match('italic') == 'italic') {
          style += 'font-style: italic;';
        }
        if ( $scope.selectedVariants.match('italic') == 'italic' && $scope.selectedVariants > 0 ) {
          style += 'font-weight: ' + $scope.selectedVariants +';';
        }
      }
      
      return style
    };
    
    $scope.languageSample = function(font) {
      
      var sample;
      
      // khmer
      if ( font.subsets.indexOf('latin') < 0 && font.subsets.indexOf('khmer') >= 0 ) {
        var sample = 'ជំរាបសួរពិភពលោក';
      }
      //arabic 
      if ($scope.selectedSubsets == 'arabic') {
        var sample = 'مرحبا بالعالم';
      }
      //cyrillic (russian)
      if ( $scope.selectedSubsets == 'cyrillic' || $scope.selectedSubsets == 'cyrillic-ext' ) {
        var sample = 'привет мир';  
      }
      // devanagari (hindi)
      if ($scope.selectedSubsets == 'devanagari') {
        var sample = 'हैलो वर्ल्ड';
      } 
      // greek
      if ((font.subsets.indexOf('latin') < 0 && font.subsets.indexOf('greek') >= 0) || ( $scope.selectedSubsets == 'greek' || $scope.selectedSubsets == 'greek-ext' )) {
        var sample = 'γειά σου Κόσμε';
      }
      // hebrew
      if ($scope.selectedSubsets == 'hebrew') {
        var sample = 'שלום עולם';
      }
      // telugu
      if ($scope.selectedSubsets == 'telugu') {
        var sample = 'హలో వరల్డ్';
      }
      // vietnamese
      if ($scope.selectedSubsets == 'vietnamese') {
        var sample = 'xin chào';
      }
      
      return sample
    }
    
    // build the api call to retrieve the font
    $scope.fontCall = function(i) {
      //get font name
      var font = i.family.replace(' ','+');
      // if no regular variant
      if (i.variants.indexOf('regular') < 0 && i.variants.indexOf('italic') >= 0) {
        font += ':' + i.variants[0];
      }
      // get selected variant
      if ($scope.selectedVariants != undefined) {
        font += ':' + $scope.selectedVariants;
      }
      // if no regular or italic?
      if (i.variants.indexOf('regular') < 0 && i.variants.indexOf('italic') < 0 ) {
        font += ':'+i.variants[0];
      }
      
      // text
      if (i.subsets.indexOf('latin') >=0) {
        font +='&text=' + i.family.replace(' ','+')
      }
      
      // arabic
      if ($scope.selectedSubsets == 'arabic') {
        font += 'مرحبا بالعالم';
      }
  
      // cyrillic
      if ($scope.selectedSubsets == 'cyrillic' || $scope.selectedSubsets == 'cyrillic-ext') {
        font += 'привет мир';
      }
      
      // devanagari
      if ($scope.selectedSubsets == 'devanagari') {
        font += 'हैलो वर्';
      }
      // greek
      if ( (i.subsets.indexOf('latin') < 0 && i.subsets.indexOf('greek') >= 0) ||  $scope.selectedSubsets == 'greek' || $scope.selectedSubsets == 'greek-ext' ) {
        font += 'γειά σου Κόσμε्';
      }
      
      // hebrew
      if ($scope.selectedSubsets == 'hebrew') {
        font += 'שלום עולם';
      }
      
      // telugu
      if ($scope.selectedSubsets == 'telugu') {
        font += 'హలో వరల్డ్';
      }
      
      // vietnamese
      if ($scope.selectedSubsets == 'vietnamese') {
        font += 'xin chào';
      }
      
      // set the subset
      if ( $scope.selectedSubsets != undefined ){
        font += '&subset=' + $scope.selectedSubsets;
      }
      
      return font;
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
