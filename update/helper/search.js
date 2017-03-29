var seach =  function(value , method, object){
  this.value = value;
  this.method = method;
  this.object = object;
};
seach.prototype.setmethod = function (method) {
      this.method = method;
};
seach.prototype.setvalue = function (value) {
  this.value = value;
};
seach.prototype.setobject = function (object) {
  this.object = object;
};
seach.prototype.call = function() {
  return this.object.find((item) => {
    return item[this.method] === this.value;
  });
};

module.exports = seach;
