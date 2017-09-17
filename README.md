# JavaScript: Advanced Fundamentals to jQuery & Pure DOM Scripting

##### Object.prototype.toString.call
```
Object.prototype.toString.call([])
// "[object Array]"
Object.prototype.toString.call(function(){})
// "[object Function]"
Object.prototype.toString.call({})
// "[object Object]"
Object.prototype.toString.call(null)
// "[object Null]"
Object.prototype.toString.call(undefined)
// "[object Undefined]"
Object.prototype.toString.call(1)
// "[object Number]"
Object.prototype.toString.call(1.1)
// "[object Number]"
Object.prototype.toString.call(NaN)
// "[object Number]"
Object.prototype.toString.call(Infinity)
// "[object Number]"
```
You can take a look at more details [here](https://gist.github.com/pbakondy/f442e91995e9d206c056)
and [this](http://luxiyalu.com/object-prototype-tostring-call/)


##### Array push

* `Array.prototype.push.apply(this, elements);`
* `[].push.apply(this, elements)`
