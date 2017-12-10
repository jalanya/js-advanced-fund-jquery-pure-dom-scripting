(function() {
  $ = function(selector) {
    if (!(this instanceof $)) {
      return new $(selector);
    }

    var elements;
    if (Object.prototype.toString.call(selector) === '[object String]') {
      elements = document.querySelectorAll(selector);
    } else {
      elements = selector;
    }

    for (var i = 0; i < elements.length; i++) {
      this[i] = elements[i];
    }
    this.length = elements.length;
  };

  $.extend = function(target, object) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        target[prop] = object[prop];
      }
    }
    return target;
  };

  // Static methods
  var isArrayLike = function(obj) {
    if (typeof obj.length === "number") {
      if (obj.length === 0) {
        return true;
      } else if (obj.length > 0) {
        return (obj.length - 1) in obj;
      }
    }
    return false;
  };

  $.extend($, {
    isArray: function(obj) {
     return Object.prototype.toString.call(obj) === '[object Array]'
    },
    each: function(collection, cb) {
      if (isArrayLike(collection)) {
        for (var i = 0; i < collection.length; i++) {
         var value = collection[i];
         cb.call(value, i, value);
        }
      } else {
        for (var prop in collection) {
         var value = collection[prop];
         cb.call(value, prop, value);
        }
      }
      return collection;
    },
    makeArray: function(arr) {
     var array = [];
     $.each(arr, function(i, value){
       array.push(value);
     });
     return array;
    },
    proxy: function(fn, context) {
     return function() {
      return fn.apply(context, arguments);
     }
    }
  });

  var getText = function (el) {
    var txt = "";
    $.each(el.childNodes, function(i, childNode) {
      if (childNode.nodeType === Node.TEXT_NODE) {
        txt += childNode.nodeValue;
      } else if (childNode.nodeType === Node.ELEMENT_NODE){
        txt += getText(childNode);
      }
    });
    return txt;
  };

  $.extend($.prototype, {
    html: function(newHtml) {
      if (arguments.length) {
        $.each(this, function(i, el) {
          el.innerHTML = newHtml;
        });
        return this;
      } else {
        return this[0].innerHTML;
      }
    },
    val: function(newVal) {
      if (arguments.length) {
        $.each(this, function(i, el) {
          el.value = newVal;
        });
        return this;
      } else {
        return this[0].value;
      }
    },
    text: function(newText) {
      if (arguments.length) {
        // setter
        // loop and ...
        this.html("");
        $.each(this, function(i, el) {
          // set innerHTML to ""
          //el.innerHTML = ''; This is fine. However, it would be better if this outside the iteration.
          // document.createTextNode with newText
          var textNode = document.createTextNode(newText);
          // and append to the element.
          el.appendChild(textNode);
        });
      } else {
        return this[0] && getText(this[0]);
      }
    },
    find: function(selector) {
      var elements = [];
      $.each(this, function(i, el) {
        var childElements = el.querySelectorAll(selector);
        [].push.apply(elements, childElements);
      });
      return $(elements);
    },
    next: function() {},
    prev: function() {},
    parent: function() {},
    children: function() {},
    attr: function(attrName, value) {},
    css: function(cssPropName, value) {},
    width: function() {},
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    hide: function() {},
    show: function() {},

    // Events
    bind: function(eventName, handler) {},
    unbind: function(eventName, handler) {},
    has: function(selector) {
      var elements = [];

      $.each(this, function(i, el) {
        if(el.matches(selector)) {
          elements.push(el);
        }
      });

      return $( elements );
    },
    on: function(eventType, selector, handler) {
      return this.bind(eventType, function(ev){
        var cur = ev.target;
        do {
          if ($([ cur ]).has(selector).length) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      });
    },
    off: function(eventType, selector, handler) {},
    data: function(propName, data) {},

    // Extra
    addClass: function(className) {},
    removeClass: function(className) {},
    append: function(element) {}
  });

  $.buildFragment = function(html) {};
})();
