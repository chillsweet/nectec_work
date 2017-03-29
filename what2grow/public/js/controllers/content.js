app.controller('contentController',['$scope','$http','$sce','ManageServer', function($scope, $http,$sce,ManageServer){


   var id = getCookieId('title');
  ManageServer.GetType(id,(value) => {$scope.type = value});
  ManageServer.getContent(id,(value) => {$scope.content = value;});
  $scope.action = (index) => {setContent($scope.content[index]);};
  $scope.toget = function(id){
    setId(id);
    ManageServer.update(id);
  }
  $scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

}]);
