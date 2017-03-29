function deletes(object){

  if (typeof object == "object") {
    this.object = object;
  }else {
      this.object = [];
    console.log('cannot type oject');
  }

}

deletes.prototype.setObject = function (object) {
if (typeof object == "object") {
    this.object = object;
  }else {
    this.object = [];
    console.log('cannot type oject');
  }
};
deletes.prototype.add = function (object) {
  if (typeof object == "object") {
    this.object.push.apply(this.object,object);
  }else {
    this.object.push(object);

  }
};
deletes.prototype.getObject = function () {
  return this.object;
};
deletes.prototype.removifile = function () {
  if (this.object.length <= 0) {
    console.log('cannot file delete');
  }else {
    let fs = require('fs');
    for (val of this.object) {
      fs.unlink(val, function(err){
        if (err) {
          console.log('cannot delete file name'+ val);
        }else {
          console.log('complete delete file name: '+ val);
        }
      });
    }
  }
};

deletes.prototype.run = function () {

  if (this.object.length > 0) {
    this.removifile(this.object);
  }else {
    console.log('object length emtry');
  }
};

module.exports = deletes;
