function Cookies(argument) {
  var key;
  function set(key, value) {
    this.key = key;
    document.cookie = key+'='+value
  }
  function get(key) {
    return document.cookie.replace(/(?:(?:^|.*;\s*)key\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }
}
