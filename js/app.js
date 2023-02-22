const app = angular.module("finder", [], ($interpolateProvider) => {
  $interpolateProvider.startSymbol("[[");
  $interpolateProvider.endSymbol("]]");
});

app.controller("ctrl", ($scope, $filter, $http, $location, $window) => {
  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.starter = ($scope.currentPage - 1) * $scope.pageSize;
  $scope.data = [];
  $scope.searchCount = undefined;
  $scope.selectedOrder = "alpha";
  $scope.sorter = "tag";
  $scope.familySorter = "family";
  $scope.preview = undefined;
  // simple phrases in variant
  $scope.languages = {
    arabic: "مرحبا بالعالم",
    bengali: "ওহে বিশ্ব",
    cyrillic: "привет мир",
    "cyrillic-ext": "привет мир",
    devanagari: "हैलो वर्ल्ड",
    greek: "γειά σου Κόσμε",
    "greek-ext": "γειά σου Κόσμε",
    gujarati: "હેલો વર્લ્ડ",
    hebrew: "שלום עולם",
    khmer: "ជំរាបសួរពិភពលោក",
    tamil: "வணக்கம் உலக",
    telugu: "హలో వరల్డ్",
    thai: "สวัสดีชาวโลก",
    vietnamese: "xin chào",
  };

  $scope.$watch(
    () => {
      return $location.url();
    },
    () => {
      const path = $location.path().split("/"),
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
      } else if (locationSearch === undefined || locationSearch === "") {
        // if it's undefined or doesn't exist
        $scope.selectedTags = undefined;
        $scope.currentPage = 1;
      } else {
        // query the URL
        if (locationPage) {
          // if it has a page number
          $location.path(`/${locationSearch}/${locationPage}`);
          $scope.currentPage = parseInt(locationPage);
        } else if (locationSearch === undefined) {
          // if it's undefined
          $scope.selectedTags = undefined;
        } else {
          // if it's just a tag
          $location.path(`/${locationSearch}`);
        }
        $scope.selectedTags = locationSearch.split("+").join(" ");
      }
    }
  );

  $http({
    method: "GET",
    url: "generated/data.json",
  }).then(
    (res) => {
      $scope.data = res.data.families;
      $scope.tags = res.data.tags;
      $scope.variants = res.data.variants;
      $scope.variantCount = res.data.variants;
      $scope.subsets = res.data.subsets;
      $scope.categories = res.data.categories;
    },
    (res) => {
      console.log(res);
    }
  );

  $scope.sendAnalytics = function () {
    $window.ga("send", "pageview", { page: `/#${$location.url()}` });
  };

  $scope.updateLocation = function () {
    $location.path(`/${$scope.selectedTags.split(" ").join("+")}`);
    $scope.sendAnalytics();
  };

  $scope.reset = function () {
    $location.path("");
  };

  $scope.updateLocPage = function () {
    if ($scope.selectedTags) {
      $location.path(
        `/${$scope.selectedTags.split(" ").join("+")}/${$scope.currentPage}`
      );
    } else {
      $location.path(`/${$scope.currentPage}`);
    }
    window.scrollTo(0, 0);
    $scope.sendAnalytics();
  };

  $scope.resetPagination = function () {
    $scope.currentPage = 1;
    if ($scope.selectedTags) {
      $location.path(`/${$scope.selectedTags.split(" ").join("+")}/`);
    } else {
      $location.path("");
    }
    $scope.pageSize = 20;
    $scope.preview = undefined;
    window.scrollTo(0, 0);
  };

  $scope.setSearch = function (x, y) {
    $location.search(x, y);
  };

  $scope.selectTag = function (i) {
    $scope.selectedTags = i;
    $scope.resetPagination();
    $location.path(`/${$scope.selectedTags.split(" ").join("+")}/`);
    $scope.sendAnalytics();
    $scope.tagCount = undefined;
    $scope.preview = undefined;
  };

  $scope.selectPreview = function (i) {
    $scope.preview = i;
  };

  $scope.previewCode = function (i) {
    if (i == "monospace") {
      $scope.previewCodeCategory = true;
    } else {
      $scope.previewCodeCategory = false;
    }
  };

  $scope.selectPreviewVariants = function (i) {
    let styles;
    if (i.indexOf("italic") > 0) {
      styles = ".preview em { font-style: italic; }";
    } else {
      styles = ".preview em {font-style: normal; }";
    }
    if (
      i.indexOf("500") > 0 ||
      i.indexOf("600") > 0 ||
      i.indexOf("700") > 0 ||
      i.indexOf("800") > 0 ||
      i.indexOf("900") > 0
    ) {
      styles += ".preview strong { font-weight: bold; }";
    } else {
      styles += ".preview strong {font-weight: normal; }";
    }
    $scope.previewStyles = styles;
  };

  $scope.removeTag = function () {
    $scope.selectedTags = undefined;
    $scope.resetPagination();
    $scope.reset();
    $scope.sendAnalytics();
  };

  $scope.removeSearch = function () {
    $scope.search = undefined;
    $scope.resetPagination();
    $location.search("search", null);
  };

  $scope.removeCategory = function () {
    $scope.selectedCategory = undefined;
    $scope.resetPagination();
    $location.search("category", null);
  };

  $scope.removeVariant = function () {
    $scope.selectedVariants = undefined;
    $scope.resetPagination();
    $location.search("variant", null);
  };

  $scope.removeFullVariants = function () {
    $scope.fullVariant = undefined;
    $scope.resetPagination();
  };

  $scope.removeVariantCount = function () {
    $scope.selectedVariantCount = undefined;
    $scope.resetPagination();
    $location.search("variantCount", null);
  };

  $scope.removeSubset = function () {
    $scope.selectedSubsets = undefined;
    $scope.resetPagination();
    $location.search("subset", null);
  };

  $scope.numberOfPages = function () {
    const myFilteredData = $filter("filter")($scope.data, $scope.search, true);
    return Math.ceil(myFilteredData.length / $scope.pageSize);
  };

  $scope.numberOfResults = function () {
    const myFilteredData = $filter("filter")($scope.data, $scope.search, true);
    return Math.ceil(myFilteredData.length);
  };

  // build out the style attr for the font based on the search parameters and what the font supports
  $scope.familyStyle = function (font) {
    let style = `font-family: "${font.family}";`;

    if (
      font.variants.indexOf("regular") < 0 &&
      font.variants.indexOf("italic") >= 0
    ) {
      style += "font-style: italic;";
    }

    if (
      font.variants.indexOf("regular") < 0 &&
      font.variants.indexOf("italic") < 0
    ) {
      style += `font-weight: ${font.variants[0]};`;
    }

    // when users filters by variant
    if ($scope.selectedVariants !== undefined) {
      if ($scope.selectedVariants.match("italic") == "italic") {
        style += "font-style: italic;";
      }
      if (
        $scope.selectedVariants.match("italic") == "italic" &&
        $scope.selectedVariants > 0
      ) {
        style += `font-weight: ${$scope.selectedVariants};`;
      }
    }

    return style;
  };

  // provide sample in language if subset is filtered or the font doesn't have a latin subset
  $scope.languageSample = function (font) {
    let sample;

    if (font.subsets.indexOf("latin") < 0) {
      sample = $scope.languages[font.subsets];
    } else {
      for (const key in $scope.languages) {
        if ($scope.selectedSubsets == key) {
          sample = $scope.languages[key];
        }
      }
    }
    return sample;
  };

  // build the api call to retrieve the font
  $scope.fontCall = function (i) {
    //get font name
    let font = i.family.split(" ").join("+");
    // if no regular variant
    if (
      i.variants.indexOf("regular") < 0 &&
      i.variants.indexOf("italic") >= 0
    ) {
      font += `:${i.variants[0]}`;
    }
    // get selected variant
    if ($scope.selectedVariants !== undefined) {
      font += `:${$scope.selectedVariants}`;
    }
    // if no regular or italic?
    if (i.variants.indexOf("regular") < 0 && i.variants.indexOf("italic") < 0) {
      font += `:${i.variants[0]}`;
    }
    // if font is being previewed, get the full char font
    if ($scope.preview == i.family) {
      // get all variants
      font += `:${i.variants}`;
    } else if ($scope.customPreview) {
      // if the custom preview input exists, then get all of the characters
      //font +='&text=' + encodeURIComponent($scope.customPreview);
      // ^^ this is too slow
    } else {
      // otherwise get this text for the font
      font += `&text=${encodeURIComponent(i.family)}`;

      for (const key in $scope.languages) {
        if ($scope.selectedSubsets == key || i.subsets.indexOf("latin") < 0) {
          font += encodeURIComponent($scope.languages[key]);
        }
      }
      // set the subset
      if ($scope.selectedSubsets !== undefined) {
        font += `&subset=${$scope.selectedSubsets}`;
      }
    }
    return font;
  };

  $scope.clearFilters = function () {
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
    $location.path("");
    $scope.sendAnalytics();
  };
});

app.filter("startFrom", () => {
  return function (input, start) {
    start = +start;
    return input.slice(start);
  };
});

app.filter("ceil", () => {
  return function (input) {
    return Math.ceil(input);
  };
});

// infinite scroll
$(window).scroll(() => {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    const tempScrollTop = $(window).scrollTop();
    const scope = angular.element($("#families")).scope();
    scope.$apply(() => {
      if (scope.searchCount.length >= scope.pageSize) {
        scope.pageSize = scope.pageSize + 10;
        scope.currentPage = scope.currentPage + 1;
        scope.starter = 0;
      }
    });
    $(window).scrollTop(tempScrollTop);
  }
});
