
app.controller('index', ['$scope','location', function($scope, location){
    var ch = {count:0};
     getlocation(function(latitude, longitude){
       ch.count++;
       if(ch.count <= 1){
         location.getlocal(latitude, longitude ,function(err, res){
           if (err==null) {
              console.log(res);
           }
           else {
             console.log(err);
           }
         });
       }else {
         console.log('request count:'+ch.count);
       }
     });

}]
);
