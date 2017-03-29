function getCookieId(name) {
  return document.cookie.replace(/(?:(?:^|.*;\s*)title\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}
function checkByid(id,data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].ty_con_id == id) {
      return data[i];
    }
  }
}
function setContent(data) {
  for(var key in data) {
    document.cookie=key+"="+data[key];
  }
}
function getContentByCookie() {
  var data = {
    con_id:'',
    con_name:'',
    con_part:'',
    con_description:''
  };
  for(var key in data) {
    data[key] = getCookig(key);
  }
  return data;
}
function show() {
  $('#icon').show('slow');
}
function hidw() {
  $('#icon').hide('slow');
}

function setId(id){
$('#'+id).hide('slow');
 $('#show'+id).toggle("slow", function(){
  var s = document.getElementById('show'+id).style.display;
  var vid = document.getElementById('video'+id);

  if (s == 'none') {
    vid.pause();
    $('#'+id).show('slow');
    $('#des'+id).show('slow');
  }else {
    $('#des'+id).hide('slow');
    vid.play();
  }
});

}
function getCookig(name) {
  var cookie = document.cookie.split(';');

  for (var i = 0; i < cookie.length; i++) {
     var content = cookie[i];
     var key = content.substring(1,content.indexOf('='));
     if (key == name) {
       return content.substring(content.indexOf('=')+1,content.length);
     }
  }
}
