app.controller('content', ['$scope','content' ,function($scope, content){
  $scope.searchFish   = '';
  $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;
  content.getContent(function(err,res){
    if (err ==  null) {

        for (var i = 0; i < res.length; i++) {
          res[i].status = false;
        }
        $scope.data = res;
    }
    else {
      console.log(err.status);
    }
  });
  var item =[];
  var data = [];
  $scope.checkAll = function (item, id) {


    if(item.check == false){
      for (var i = 0; i < $scope.data.length; i++) {
        $scope.data[i].status = false;
      }
    }else {
      for (var i = 0; i < $scope.data.length; i++) {
        $scope.data[i].status = true;
      }
    }

    };
  $scope.caldate  = function(time){
    console.log(calculate(new Date(time),new Date()));
    return calculate(new Date(time),new Date());
  }
  $scope.selectItem = function(index){

    if ($scope.data[index].status) {
      $scope.data[index].status = false;
      item.splice(index);

    }
    else {
      item.push(index);
      $scope.data[index].status = true;

    }

  }
  $scope.deleteContent = function(){

    var temp = $scope.data.filter(data => data.status == true);
    var id = $scope.data.filter(data => data.status == true).map((content) => content.con_id);

    content.delete(id, function(err,data){
    //  console.log(data);
    });
    for (var i = 0; i < temp.length; i++) {
      console.log($scope.data.indexOf(temp[i]));
      $scope.data.splice($scope.data.indexOf(temp[i]), 1);
    }

}



}]);
