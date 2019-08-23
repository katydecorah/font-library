var app = angular.module('finder', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

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
  $scope.url =
    'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDK4Jz71F7DQCrUhXYaF3xgEXoQGLDk5iE';
  // simple phrases in variant
  $scope.languages = {
    arabic: 'مرحبا بالعالم',
    bengali: 'ওহে বিশ্ব',
    cyrillic: 'привет мир',
    'cyrillic-ext': 'привет мир',
    devanagari: 'हैलो वर्ल्ड',
    greek: 'γειά σου Κόσμε',
    'greek-ext': 'γειά σου Κόσμε',
    gujarati: 'હેલો વર્લ્ડ',
    hebrew: 'שלום עולם',
    khmer: 'ជំរាបសួរពិភពលោក',
    tamil: 'வணக்கம் உலக',
    telugu: 'హలో వరల్డ్',
    thai: 'สวัสดีชาวโลก',
    vietnamese: 'xin chào'
  };

  $scope.$watch(
    function() {
      return $location.url();
    },
    function() {
      var path = $location.path().split('/'),
        locationSearch = path[1],
        locationPage = path[2];
      $scope.selectedCategory = $location.search().category;
      $scope.selectedSubsets = $location.search().subset;
      $scope.selectedVariants = $location.search().variant;
      $scope.search = $location.search().search;
      $scope.selectedVariantCount = parseInt($location.search().variantCount);
      if ($.isNumeric(locationSearch)) {
        // if it's a number
        $scope.currentPage = parseInt(locationSearch);
        //$scope.starter = ($scope.currentPage - 1) * $scope.pageSize;
      } else if (locationSearch === undefined || locationSearch === '') {
        // if it's undefined or doesn't exist
        $scope.selectedTags = undefined;
        $scope.currentPage = 1;
      } else {
        // query the URL
        if (locationPage) {
          // if it has a page number
          $location.path('/' + locationSearch + '/' + locationPage);
          $scope.currentPage = parseInt(locationPage);
        } else if (locationSearch === undefined) {
          // if it's undefined
          $scope.selectedTags = undefined;
        } else {
          // if it's just a tag
          $location.path('/' + locationSearch);
        }
        $scope.selectedTags = locationSearch.split('+').join(' ');
      }
    }
  );

  $http({
    method: 'GET',
    url: 'families.json'
  }).then(
    function successCallback(res) {
      $scope.dataTemp = res.data;
    },
    function errorCallback(res) {
      console.log(res);
    }
  );

  // merges families.json and Google Fonts API
  $http({
    method: 'GET',
    url: $scope.url
  }).then(
    function successCallback(res) {
      $scope.api = res.data.items;
      $scope.data = merge($scope.dataTemp, $scope.api);
      // create unique tag array
      $scope.tags = _.map(
        _.chain($scope.data)
          .pluck('tags')
          .flatten()
          .countBy()
          .value(),
        function(num, key) {
          return { tag: key, value: num };
        }
      );
      // create unique variants array
      $scope.variants = _.map(
        _.chain($scope.data)
          .pluck('variants')
          .flatten()
          .countBy()
          .value(),
        function(num, key) {
          return { variant: key };
        }
      );
      // create unique variant count array
      $scope.variantCount = _.map(
        _.chain($scope.data)
          .pluck('variantCount')
          .flatten()
          .countBy()
          .value(),
        function(num, key) {
          return { count: parseInt(key) };
        }
      );
      // create unique subset array
      $scope.subsets = _.map(
        _.chain($scope.data)
          .pluck('subsets')
          .flatten()
          .countBy()
          .value(),
        function(num, key) {
          return { subset: key };
        }
      );
      // create unique category array
      $scope.categories = _.map(
        _.chain($scope.data)
          .pluck('category')
          .flatten()
          .countBy()
          .value(),
        function(num, key) {
          return { category: key };
        }
      );
    },
    function errorCallback() {
      // If app can't connect to Google Font API then just use families.json data
      $scope.data = $scope.dataTemp;
    }
  );

  // reiterate: this breaks when the APIs aren't 1:1
  function merge(obj1, obj2) {
    var result = [];
    for (var i in obj1) {
      // check the API, does it match any values in families.json?
      var match = _.where(obj2, { family: obj1[i].family });
      if (match.length > 0) {
        // if there's a match push it to the final dataarray

        // Check for main variants
        var hasItalic = false,
          hasBold = false,
          hasRegular = false,
          fullVariant = false;
        if (match[0].variants.indexOf('italic') != -1) {
          hasItalic = true;
        }
        if (
          match[0].variants.indexOf('regular') != -1 ||
          match[0].variants.indexOf('400') != -1
        ) {
          hasRegular = true;
        }
        if (
          match[0].variants.indexOf('500') != -1 ||
          match[0].variants.indexOf('600') != -1 ||
          match[0].variants.indexOf('700') != -1 ||
          match[0].variants.indexOf('800') != -1 ||
          match[0].variants.indexOf('900') != -1
        ) {
          hasBold = true;
        }

        if (hasBold && hasRegular && hasItalic) {
          fullVariant = true;
        }

        result.push({
          family: obj1[i].family,
          tags: obj1[i].tags,
          count: obj1[i].tags.length,
          variants: match[0].variants,
          variantCount: match[0].variants.length, // number of variants
          hasItalic: hasItalic,
          hasBold: hasBold,
          hasRegular: hasRegular,
          fullVariant: fullVariant,
          subsets: match[0].subsets,
          category: match[0].category,
          lastModified: match[0].lastModified,
          lineNumber: parseInt(i) + 2
        });
      }
    }
    return result;
  }

  $scope.sendAnalytics = function() {
    $window.ga('send', 'pageview', { page: '/#' + $location.url() });
  };

  $scope.updateLocation = function() {
    $location.path('/' + $scope.selectedTags.replace(' ', '+'));
    $scope.sendAnalytics();
  };

  $scope.reset = function() {
    $location.path('');
  };

  $scope.updateLocPage = function() {
    if ($scope.selectedTags) {
      $location.path(
        '/' + $scope.selectedTags.replace(' ', '+') + '/' + $scope.currentPage
      );
    } else {
      $location.path('/' + $scope.currentPage);
    }
    window.scrollTo(0, 0);
    $scope.sendAnalytics();
  };

  $scope.resetPagination = function() {
    $scope.currentPage = 1;
    if ($scope.selectedTags) {
      $location.path('/' + $scope.selectedTags.split(' ').join('+') + '/');
    } else {
      $location.path('');
    }
    $scope.pageSize = 20;
    $scope.preview = undefined;
    window.scrollTo(0, 0);
  };

  $scope.setSearch = function(x, y) {
    $location.search(x, y);
  };

  $scope.selectTag = function(i) {
    $scope.selectedTags = i;
    $scope.resetPagination();
    $location.path('/' + $scope.selectedTags.split(' ').join('+') + '/');
    $scope.sendAnalytics();
    $scope.tagCount = undefined;
    $scope.preview = undefined;
  };

  $scope.selectPreview = function(i) {
    $scope.preview = i;
  };

  $scope.previewCode = function(i) {
    if (i == 'monospace') {
      $scope.previewCodeCategory = true;
    } else {
      $scope.previewCodeCategory = false;
    }
  };

  $scope.selectPreviewVariants = function(i) {
    var styles;
    if (i.indexOf('italic') > 0) {
      styles = '.preview em { font-style: italic; }';
    } else {
      styles = '.preview em {font-style: normal; }';
    }
    if (
      i.indexOf('500') > 0 ||
      i.indexOf('600') > 0 ||
      i.indexOf('700') > 0 ||
      i.indexOf('800') > 0 ||
      i.indexOf('900') > 0
    ) {
      styles += '.preview strong { font-weight: bold; }';
    } else {
      styles += '.preview strong {font-weight: normal; }';
    }
    $scope.previewStyles = styles;
  };

  $scope.removeTag = function() {
    $scope.selectedTags = undefined;
    $scope.resetPagination();
    $scope.reset();
    $scope.sendAnalytics();
  };

  $scope.removeSearch = function() {
    $scope.search = undefined;
    $scope.resetPagination();
    $location.search('search', null);
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

  $scope.removeFullVariants = function() {
    $scope.fullVariant = undefined;
    $scope.resetPagination();
  };

  $scope.removeVariantCount = function() {
    $scope.selectedVariantCount = undefined;
    $scope.resetPagination();
    $location.search('variantCount', null);
  };

  $scope.removeSubset = function() {
    $scope.selectedSubsets = undefined;
    $scope.resetPagination();
    $location.search('subset', null);
  };

  $scope.numberOfPages = function() {
    var myFilteredData = $filter('filter')($scope.data, $scope.search, true);
    return Math.ceil(myFilteredData.length / $scope.pageSize);
  };

  $scope.numberOfResults = function() {
    var myFilteredData = $filter('filter')($scope.data, $scope.search, true);
    return Math.ceil(myFilteredData.length);
  };

  // build out the style attr for the font based on the search parameters and what the font supports
  $scope.familyStyle = function(font) {
    var style = 'font-family: "' + font.family + '";';

    if (
      font.variants.indexOf('regular') < 0 &&
      font.variants.indexOf('italic') >= 0
    ) {
      style += 'font-style: italic;';
    }

    if (
      font.variants.indexOf('regular') < 0 &&
      font.variants.indexOf('italic') < 0
    ) {
      style += 'font-weight: ' + font.variants[0] + ';';
    }

    // when users filters by variant
    if ($scope.selectedVariants !== undefined) {
      if ($scope.selectedVariants.match('italic') == 'italic') {
        style += 'font-style: italic;';
      }
      if (
        $scope.selectedVariants.match('italic') == 'italic' &&
        $scope.selectedVariants > 0
      ) {
        style += 'font-weight: ' + $scope.selectedVariants + ';';
      }
    }

    return style;
  };

  // provide sample in language if subset is filtered or the font doesn't have a latin subset
  $scope.languageSample = function(font) {
    var sample;

    if (font.subsets.indexOf('latin') < 0) {
      sample = $scope.languages[font.subsets];
    } else {
      for (var key in $scope.languages) {
        if ($scope.selectedSubsets == key) {
          sample = $scope.languages[key];
        }
      }
    }
    return sample;
  };

  // build the api call to retrieve the font
  $scope.fontCall = function(i) {
    //get font name
    var font = i.family.replace(' ', '+');
    // if no regular variant
    if (
      i.variants.indexOf('regular') < 0 &&
      i.variants.indexOf('italic') >= 0
    ) {
      font += ':' + i.variants[0];
    }
    // get selected variant
    if ($scope.selectedVariants !== undefined) {
      font += ':' + $scope.selectedVariants;
    }
    // if no regular or italic?
    if (i.variants.indexOf('regular') < 0 && i.variants.indexOf('italic') < 0) {
      font += ':' + i.variants[0];
    }
    // if font is being previewed, get the full char font
    if ($scope.preview == i.family) {
      // get all variants
      font += ':' + i.variants;
    } else if ($scope.customPreview) {
      // if the custom preview input exists, then get all of the characters
      //font +='&text=' + encodeURIComponent($scope.customPreview);
      // ^^ this is too slow
    } else {
      // otherwise get this text for the font
      font += '&text=' + encodeURIComponent(i.family);

      for (var key in $scope.languages) {
        if ($scope.selectedSubsets == key || i.subsets.indexOf('latin') < 0) {
          font += encodeURIComponent($scope.languages[key]);
        }
      }
      // set the subset
      if ($scope.selectedSubsets !== undefined) {
        font += '&subset=' + $scope.selectedSubsets;
      }
    }
    return font;
  };

  $scope.clearFilters = function() {
    $scope.selectedTags = undefined;
    $scope.selectedSubsets = undefined;
    $scope.selectedVariants = undefined;
    $scope.selectedVariantCount = undefined;
    $scope.fullVariant = undefined;
    $scope.selectedCategory = undefined;
    $scope.customPreview = undefined;
    $scope.search = undefined;
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
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    var tempScrollTop = $(window).scrollTop();
    var scope = angular.element($('#families')).scope();
    scope.$apply(function() {
      if (scope.searchCount.length >= scope.pageSize) {
        scope.pageSize = scope.pageSize + 10;
        scope.currentPage = scope.currentPage + 1;
        scope.starter = 0;
      }
    });
    $(window).scrollTop(tempScrollTop);
  }
});
