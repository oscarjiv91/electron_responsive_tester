var myApp = angular.module('myApp', ['ngAnimate']);


myApp.controller('deviceController', function($scope, Device, $compile,  $timeout, $sce, $exceptionHandler,  $http, LS) {

    $scope.allDevices = [];

    $http.get('./devices.json').success(function(data) {

      var serializedData = JSON.parse(JSON.stringify(data));
      serializedData["phones"].forEach(function(obj) {
          var device = new Device('phone', obj.model, obj.width, obj.height, obj.name, false, obj.top, obj.bottom, obj.right, obj.left);
          $scope.allDevices.push(device);
       });

       serializedData["tablets"].forEach(function(obj) {
           var device = new Device('tablets', obj.model, obj.width, obj.height, obj.name, false, obj.top, obj.bottom, obj.right, obj.left);
           $scope.allDevices.push(device);
        });

        serializedData["desktop"].forEach(function(obj) {
            var device = new Device('desktop', obj.model, obj.width, obj.height, obj.name, false, obj.top, obj.bottom, obj.right, obj.left);
            $scope.allDevices.push(device);
        });

        if(LS.getData() != null){
             var savedShowedDevices = JSON.parse(LS.getData());
             savedShowedDevices.forEach(function(obj){
               var device = new Device(obj.type, obj.model, obj.width, obj.height, obj.name, true, obj.top, obj.bottom, obj.right, obj.left);
               ;

               $scope.allDevices.forEach(function(dev){
                  if(device.model == dev.model){
                    dev.show = true;
                  }
               });
             });
        }
    });

   $scope.stringURL = $sce.trustAsResourceUrl("");
   $scope.globalURL = $sce.trustAsResourceUrl("http://xataka.com");

   $scope.convertToTrustUrl = function(url){
              // Check if url exists
              var xhttp= new XMLHttpRequest();
              var errorCount = 0;
              try{
                xhttp.onreadystatechange = function() {

                  if (xhttp.readyState == 4 && xhttp.status == 0) {
                    alert("Server response not received.");
                  }else{
                    if((xhttp.getResponseHeader('x-frame-options') == "DENY" || xhttp.getResponseHeader('x-frame-options') == "SAMEORIGIN") && xhttp.readyState == 4){
                      console.log("response DENY or SAMEORIGIN");
                      alert("Webpage does not allow to load this content.");
                    }
                  }
                };
                xhttp.open("GET", addhttp(url), true);
                xhttp.send();
              }catch(e){
                console.log('catch', e);
              }

              $scope.globalURL = $sce.trustAsResourceUrl(addhttp(url));
              changeStateOfFrames();
              refreshFrames(url);

          };

    $scope.refresh = function(url){
               changeStateOfFrames();
               showIndicator();
               refreshFrames(url);
           };

     $scope.scrollToDevice = function(id){
                scrollToDevice(id);
            };

     $scope.refreshDevice = function(id){
                refreshDevice(id, $scope.globalURL);
            };

     $scope.onEnd = function(){
                $timeout(function(){
                    scaleFrames();
                    showIndicator();
                }, 10);
            };

     $scope.toggleDeviceView = function(device) {
       var devicesToShow = [];
       $scope.allDevices.forEach(function(device){
         if(device.show)
            devicesToShow.push(device);
       });
        LS.setData(JSON.stringify(devicesToShow));
      };

});

// Device model
myApp.factory('Device', function($http) {

    var Device = function(type, model, width, height, name, show, top, bottom, right, left) {
        this.type = type;
        this.model = model;
        this.width = width;
        this.height = height;
        this.name = name;
        this.show = show;
        this.top = top;
        this.bottom = bottom;
        this.right = right;
        this.left = left;
    };
    return Device;
})

// Render the template with the device data
myApp.directive('deviceDetail', function($timeout) {
return {
    restrict: 'A',
    templateUrl: 'scripts/device.html',
    }
});

// Called when a ng-repeat ends
myApp.directive("repeatEnd", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});

myApp.factory('$exceptionHandler', function() {
  return function(exception, cause) {
    exception.message += ' (caused by "' + cause + '")';
    throw exception;
  };
});

myApp.factory("LS", function($window, $rootScope) {
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    }
  };
});
