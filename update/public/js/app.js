var app  = angular.module('myapp',[]);

app.service('login', function($http){
  this.sendlogin = function(data,call){
      $http.post('/user/login',data).then((res)=>{
        call(null,res.data)
      }, (err)=>{
        call(err,null);
      });
  }
});
app.service('location', function ($http) {
  this.getlocal = function(latitude, longitude, call){
    var temp ={latitude:latitude, longitude:longitude};
    var url = '/user/location';
    $http.post(url,temp).then(function(res){
      call(null, res.data);
    },function(err){
      call(err, null)
    })
  }
});

app.service('update', function($http){
  this.checknetwork = function(call) {
    $http.get('/test/checknetwork').then((value) => {
      call(null, value.data);
    }, (err)=>{
      call(err.status, null);
    });
  }
  this.checkspace = function(call){
    $http.get('/test/checkspace').then((value) => {
      call(null, value.data);
    }, (err)=>{
      call(err, null)
    })
  }

  this.download = function(call){
    $http.get('/test/download').then((value) => {
      call(null,value.data);
    },(err)=>{
      call(err, null)
    });
  }
});

app.service('content', function($http){
  this.getContent =  function(call){
    $http.get('/data/content').then((value) => {
      call(null, value.data);
    },(err)=>{
      call(err, null);
    });
  }
  this.delete = function(data, call){
    $http.post('/data/content/delete',data).then((value) => {
      call(null, value.data);
    },(err)=>{
      call(err, null);
    });
  }
});
