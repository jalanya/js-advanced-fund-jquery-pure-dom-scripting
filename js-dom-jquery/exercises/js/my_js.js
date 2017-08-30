// 05 Context
DOT = function(obj, prop){
  if (obj.hasOwnProperty(prop)) {
    return obj[prop];
  } else if (obj.__proto__) {
    return DOT(obj.__proto__, prop)
  }
}

// 05 Context
DOTCALL = function(obj, prop, args){
  var fn = DOT(obj, prop);
  if (fn) {
   return fn.apply(obj, args);
  }
}

// 06 Prototypes
NEW = function(constructor, args){
  /*function F() {
    constructor.apply(this, args);
  }
  F.prototype = new constructor;
  return new F();
  */
  //create a new object
  //set new object's __proto__ to constructor's prototype
  //invoke our constructor with our new object as context
  //return our new object
  var o = {};
  o.__proto__ = constructor.prototype;
  constructor.apply(o, args);
  return o;
}

INSTANCEOF = function(obj, constructor){

}
