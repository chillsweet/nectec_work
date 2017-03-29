app.controller('postController',['$scope','ManageServer',($scope, ManageServer)=>{
  $scope.post=getContentByCookie();
  ManageServer.update($scope.post.con_id);
  $scope.back = ()=>{
    window.location.href="/content";
  }

}]);
