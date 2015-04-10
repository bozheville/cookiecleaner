if (!chrome.cookies) {
    chrome.cookies = chrome.experimental.cookies;
}

angular.module('CookieCleaner', [])
.controller('main', ['$scope', function($scope){
        $scope.domain = '';
        $scope.cookies = {};
        $scope.expanded = '';
        $scope.danger = '';
        $scope.tab = {};

        var getAllCookies = function(callback){
            $scope.cookies = {};
            chrome.tabs.getSelected(null, function(tab) {
                $scope.tab = tab;
                $scope.domain = tab.url.replace(/^(http[s]?:\/\/)?([^/]+)\/.*$/i, '$2');
                chrome.cookies.getAll({domain: $scope.domain}, function (e) {
                    for (var i in e) {
                        if(e.hasOwnProperty(i)){
                            $scope.cookies[e[i].name] = {value: e[i].value, path: e[i].path, domain: e[i].domain};
                        }
                    }
                    $scope.$apply();
                    if(typeof callback === 'function'){
                        callback();
                    }
                });
            });
        };

        var reloadOnEmptyCookiesList = function(){
            if(_.isEmpty($scope.cookies)){
                chrome.tabs.reload($scope.tab.id);
                window.close();
            }
        };

        $scope.save = function(key){
            chrome.cookies.remove({name:key, url: $scope.tab.url}, function(){
                chrome.cookies.set({name:key, url: $scope.tab.url, value: $scope.cookies[key].value});
            });
        };

        $scope.toggle = function(key){
            $scope.expanded = $scope.expanded === key ? '' : key;
        };

        $scope.rmCookie = function(key){
            chrome.cookies.remove({name:key, url: $scope.tab.url});
            getAllCookies(reloadOnEmptyCookiesList);
        };

        $scope.rmAllCookies = function(){
            if(confirm('Are you sure?')){
                _.each(Object.keys($scope.cookies), $scope.rmCookie);
            }

        };

        getAllCookies();
    }]);