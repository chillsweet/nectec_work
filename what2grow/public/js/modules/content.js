var app = angular.module('content',[]);
app.service('ManageServer', function($http){
  this.GetType =function(id,call){
       $http.get('/type')
      .then((value) => {
        call(checkByid(id,value.data));
      }, (err) => {
          call(value.status);
      });
  }
  this.update = (id) => {
    $http.get('/content/update/'+id)
    .then(value => {
      console.log(id);
      console.log(value);
    });
  };
  this.getContent = function(id,call){
    $http.get('content/data/'+id)
    .then((value) => {
      
      call(value.data);
    },(err)=>{
      call(value.status);
    });
  }
});
