//require('./css/font-awesome.min.css');
require('./app.scss');
require('angular');
require('angular-scroll');
var objectFitImages = require('object-fit-images');

var app = angular.module("testTask", ['duScroll']);

app.filter('items', function(){
    return function(input, types){
        return input.filter(function (item) {
            return types.hasOwnProperty(item["type"].toLowerCase()) && types[item["type"].toLowerCase()];
        });
    }
});

app.controller('headerCtrl', ['$scope', function($scope){
    $scope.loadImage = function(){
    	return require('./images/logo.png');
    }
}]);

app.controller('productsCtrl', ['$scope', 'itemsFilter', function ($scope, itemsFilter) {
	
	$scope.data = {
		"items": [
		{
			"id" : "sfsdfdf",
			"type" : "Child",
			"img" : require('./images/t-shirt-example.png'),
			"price" : "3.20",
			"name" : "T-SHIRT",
			"options": ["Size", "S", "M", "L", "XL"]
		}
		,{
			"id" : "dsgfbcvbvcb",
			"type" : "Child",
			"img" : require('./images/pants-example.png'),
			"price" : "13.30",
			"name" : "Pants FORCLAZ",
			"options": ["Size", "M", "XL"]
		}
		,{
			"id" : "qwedsf",
			"type" : "Men",
			"img" : require('./images/t-shirt-example.png'),
			"price" : "5.00",
			"name" : "T-SHIRT",
			"options": ["Size", "XL"]
		}
		,{
			"id" : "dsgfgdavcxv",
			"type" : "Women",
			"img" : require('./images/pants-example.png'),
			"price" : "3.21",
			"name" : "T-SHIRT",
			"options":  ["Size", "S", "M", "L", "XL"]
		}
		,{
			"id" : "sdfggfdgxcvxc",
			"type" : "Women",
			"img" : require('./images/backpack-example.png'),
			"price" : "31",
			"name" : "backpack",
			"options": ["color", "red", "blue", "black"]
		}
		, {
			"id" : "xcvxvsdsdfd",
			"type" : "Other",
			"img" : require('./images/backpack-example.png'),
			"price" : "0",
			"name" : "car",
			"options": ["color", "red", "blue", "black"]
		}
  	]
	};

	$scope.showCategory = {
			"men" : true,
			"women" : true,
			"child": false
	};

    $scope.filteredItems = itemsFilter($scope.data.items,$scope.showCategory);
	
	$scope.changeFilter  = function (obj) {
		return !$scope.showCategory[obj];
	};

	$scope.resetFilter = function() {
        $scope.showCategory['men'] = true;
        $scope.showCategory['women'] = true;
        $scope.showCategory['child'] = false;
	};

    angular.element(document).ready(function () {
        var someImages = document.querySelectorAll('img.product-block__image');
        objectFitImages(someImages);
        document.querySelector(".wrapper-banner").style.height = window.innerHeight + 'px';
    });

    angular.element(window).bind('resize', function(){
        document.querySelector(".wrapper-banner").style.height = window.innerHeight + 'px';
    });
}]);


app.controller('menuCtrl', ['$scope', function ($scope) {
	
	$scope.data = {
		"footerMenu" : [
			{
				"name": "Credits",
				"link": "https://softswiss.com/",
				"title": "credits"
			},
			{
				"name": "Privacy",
				"link": "https://softswiss.com/",
				"title": "privacy"
			},
			{
				"name": "About",
				"link": "https://www.softswiss.com/about-us/",
				"title": "about us"
			},
			{
				"name": "Contact",
				"link": "https://www.softswiss.com/contact-us/",
				"title": "contact us"
			}
		]};

}]);

function ProductController() {
	var ctrl = this;
    ctrl.$onInit = function() {
        ctrl.options = ctrl.data.options.slice(1);
        console.log(ctrl.options);
        ctrl.placeholder = ctrl.data.options[0];
        ctrl.selectedOption = null;
    };
}

app.component('productItem', {
    template: require('./product.html'),
    controller: ProductController,
	bindings: {
    	data: "<"
	}
});