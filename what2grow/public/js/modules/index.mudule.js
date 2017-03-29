angular.module('index', [])
.controller('ImoCtroller',['$scope','$http',function($scope,$http){
  $scope.simple = null;
$scope.content = [
  {
    name:'แนะโครงการ',
    url:'img/w2g/logo_w2g.png',
    link:'/about'
  },
  {
    name:'พืชพื้นที่',
    url:'img/w2g/cassava-leaf.png',
    link:'/content'
  },
  {
    name:'แก้ปัญหา',
    url:'img/w2g/13505216093_27d09f53a0_o.jpg',
    link:'/content'
  }
];
var types;
var ups;

$http.get('/type').then((type) => {
  types = type.data;
},(error)=>{
alert('error');
});

$scope.setCookie =function(index){
  document.cookie = 'title='+index;
}

//Loaction();

function getnumberLocation() {
  if (navigator.geolocation) {
          navigator.geolocation.watchPosition(showPosition);
  }
  else {
    alert('sytem loaction error ');
  }
}

function Loaction(){
  getnumberLocation();
  var la=document.cookie.replace(/(?:(?:^|.*;\s*)la\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var lon = document.cookie.replace(/(?:(?:^|.*;\s*)lon\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  getlocation(la,lon);


}
function showPosition(position) {
  document.cookie="la="+position.coords.latitude;
  document.cookie="lon="+position.coords.longitude;

}

function chekfiledata(value) {
  $http.get('/data')
  .then(function (res) {
    if(res.data != null){
          var current = res.data;
          if(current.province != value.province){
            sendSever(value);
              $scope.simple = value;
          }
          else {
           $scope.simple = res.data;
          }
    }else{
        $scope.simple = value;
        sendSever(value);
    }
  }, function(err){
    console.log(err);
  });

}





function getlocation(latitude,longitude){
  $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+'%2C'+longitude+'&language=th')
  .then(function(result){
        var value = result.data;
        if(value.status == "ZERO_RESULTS"){
          alert('google api cannot latitude an longitude');
          $http.get('/data').then((res)=>{
            $scope.simple=res.data;

          },(error)=>{
            console.log('error file data loacation');
          });
        }else {
          var data= formate(value,latitude,longitude);
          chekfiledata(data);
        }

  },function(err){
      alert('get location error');
  });
}
function subLoaction(long_name) {
  var name = long_name.substring(long_name.indexOf(" ")+1,long_name.length);
  return name;
}
function formate(data,la,lo){
  var compoent = data.results;
  var location = {};

  location.latitude = la;
  location.longitude = lo;
  location.tumbon = subLoaction(compoent[0].address_components[1].long_name);
  location.district = subLoaction(compoent[0].address_components[2].long_name);
  location.province = subLoaction(compoent[0].address_components[3].long_name);
  return location;

}
function sendSever(data) {
  $http.post('/loacation',data)
  .then(function(result){

  },function(err){

  });
}


}]);
