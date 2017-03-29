'use strict';

function myFunction() {
  // Declare variables
  var input, filter, table, tr,  i;
  var td;
  input = document.getElementById("focusedInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query


}
$('#logout').click(function () {
  window.location.href = '/logout';
  console.log('good');
});
function calculate(late,current) {
  var timeDiff = Math.abs(late.getTime() - current.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  console.log(diffDays);
  return diffDays <= 1;
}
$('#update').click(function () {
  $('#myModal').modal('show');
});
$('.btn-setting').click(function(){
  $('.form-actions').show("slow");
  document.getElementById("disabledInputdate").disabled = false;
  document.getElementById("disabledInputwatch").disabled = false;
});
$('#end').click(function(){
  $('.form-actions').hide("slow");
  document.getElementById("disabledInputdate").disabled = true;
  document.getElementById("disabledInputwatch").disabled = true;
})
$('#save').click(function(){
  $('.form-actions').hide("slow");
  document.getElementById("disabledInputdate").disabled = true;
  document.getElementById("disabledInputwatch").disabled = true;
  var dateIn = $('#disabledInputdate').val();
  var watchIn = $('#disabledInputwatch').val();
  var url = '/update/config/edite';
  var condition = {date: dateIn, watch: watchIn };
  $.post(url, condition).done(function (value) {
    console.log(value);
  });
})
function getlocation(call) {
  if (navigator.geolocation) {

    navigator.geolocation.watchPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      call(latitude,longitude);
    });
  }else {
    call(null, null);
  }
}
function setfromat(data) {
console.log(data);
}
var count = 0;
function addpendTag(begin , center, berov){
  return begin+""+center+""+berov;
}
function setdownload(persen, text) {
  document.getElementById('color').style.width = persen+"%";
  let state = text+':';
  let begin = '<span class="must" id="score">';
  let center = persen+'%';
  let berov= '</span>';
  let  value = addpendTag(begin, center, berov);
  document.getElementById('state').innerHTML=state+value;
  if(persen == '100'){
    window.location.href = '/';
  }
}




function actionmodal(id,action) {
  $('#'+id).modal(action);
}
function reactionUpdate() {

console.log('redirect');

  $('#myModal').modal('show');

}
