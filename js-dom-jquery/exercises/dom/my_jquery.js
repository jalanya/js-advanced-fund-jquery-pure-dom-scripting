(function() {
  $ = function(selector) {
    if (!(this instanceof $)) {
      return new $(selector);
    }

    var elements;
    if (typeof selector === 'string') {
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
    },
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

  var makeTraverser = function(cb) {
    return function() {
      var elements = [],
      args = arguments;

      $.each(this, function(i, el) {
        var els = cb.apply(el, args);
        if (els && isArrayLike(els)) {
          [].push.apply(elements, els);
        } else if (els) {
          elements.push(els);
        }
      });
      return $(elements);
    }
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
    find: makeTraverser(function(selector) {
      return this.querySelectorAll(selector)
    }),
    next: makeTraverser(function() {
      var current = this.nextSibling;
      while (current && current.nodeType !== Node.ELEMENT_NODE) {
        current = current.nextSibling;
      }
      return current;
    }),
    prev: makeTraverser(function() {
      var current = this.previousSibling;
      while (current && current.nodeType !== Node.ELEMENT_NODE) {
        current = current.previousSibling;
      }
      return current;
    }),
    parent: makeTraverser(function() {
      return this.parentNode;
    }),
    children: makeTraverser(function() {
      return this.children;
    }),
    attr: function(attrName, value) {
      if (arguments.length > 1) {
        return $.each(this, function(i, el) {
          el.setAttribute(attrName, value);
        });
      } else {
        return this[0] && this[0].getAttribute(attrName);
      }
    },
    css: function(cssPropName, value) {
      if (arguments.length > 1) {
        return $.each(this, function(i, el) {
          el.style[cssPropName] = value;
        });
      } else {
        return this[0] &&
          document.defaultView.getComputedStyle(this[0])
          .getPropertyValue(cssPropName);
      }
    },
    width: function() {
      var clientWidth = this[0].clientWidth;
      var leftPadding = this.css("padding-left"),
          rightPadding = this.css("padding-right");
      return clientWidth - parseInt(leftPadding)
        - parseInt(rightPadding);
    },
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
