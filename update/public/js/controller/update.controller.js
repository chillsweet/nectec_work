
app.controller('update', ['$scope','$http','update', 'location',function($scope,$http, update, location){

  var count = 0;

  update.checknetwork(function(err, val){
    if(val.status){
      var val = document.getElementById("update");
      val.disabled = false;
    }

  });

  $http.get('/location.json').then(function (value) {
    $scope.place = value.data;
  },function (err) {
    console.log(err);
  });
  $scope.shoot = function(){

    update.checknetwork(function(err, val){
      setdownload(2, 'Seaching network');
      count++;
      if (err) {
        console.log(err);
        setdownload(2, 'Cannot connect Network');
      }
      else {


        setdownload(10,'Read Space')
        if(val){
          setdownload(20,'Read Space');
          update.checkspace(function(err, res){
              if (err) {
                  setdownload(20,'Read Space Error');
                  if (count < 3) {
                    setTimeout(function () {
                      alert('กรุณาอัปเดทไหม่อีกครั้ง');
                    }, 3000);
                  }else if(count >=  3 && count <= 6){
                    alert('อับเดทไหม่ อีก 20 นาที');
                  }else {
                    alert('อับเดทไหม่ อีก 24 ชั่วโมง');
                  }
              }
              else {
                if (res.status) {
                    $scope.state = false;
                    setdownload(50,'Dowload Content');
                    var num = 50;
                    var id = setInterval(function(){

                      if(num == 90){

                          clearInterval(id);


                      }else {
                        if($scope.state){
                            clearInterval(id);
                        }else {
                          setdownload(num,'Update Content');
                          num++;
                        }

                      }
                    },1000);
                    update.download((err, res)=>{
                      if(err){
                        setdownload(num,'Canot connection Dowload Server');
                      }else{
                        if(res.status == true){
                          $scope.state = true;
                          setdownload(100,'Success');

                        }else {
                          setdownload(num,'Error Update');
                          alert('ไม่สามารถอัปเดทได้ กรุณารอัปเดทไหม่อีกครั้ง');
                        }
                      }
                    });
                }else {

                  clearInterval(id);
                  setdownload(50,'Cannot Update Data Memry full');
                  actionmodal('myModal','hide');
                  var chekclear = window.confirm('เครื่องของท่านมีหน่วยความจำเต็ม ท่านจะลบข้อมูลเอง หรือ ไห้ระบบจัดการไห้');

                  if (chekclear) {
                    alert('ระบบจะทำการลบไห้อัตโนมัติ');
                  }else {
                    actionmodal('list','show');

                    console.log('test');
                  }
                }
              }
            });
        }
        else {
          setdownload(10,'Network cannot server');
        }
      }
    });
  }

$scope.list =  function(){
  actionmodal('myModal','show');
  $scope.shoot();
}

var ch = {count:0};
 getlocation(function(latitude, longitude){
   ch.count++;
   if(ch.count <= 1){
     location.getlocal(latitude, longitude ,function(err, res){
       if (err==null) {
          //console.log(res);
       }
       else {
         //console.log(err);
       }
     });
   }else {
     console.log('request count:'+ch.count);
   }
 });


}]);
