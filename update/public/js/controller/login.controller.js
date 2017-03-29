app.controller('loginController', ['$scope','login', function($scope, login){
    $scope.send = function(user){
      login.sendlogin(user, function(err, data){

        if(err == null){
          window.location.href = '/'
        }
        else {
          console.log(err);
        }
      });
    }
}]
);
