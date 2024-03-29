/*jshint -W054 */
;(function (exports) {
    'use strict';
  
    var BREAK = {};
    var exp = {};
  
    function create(PromiseA) {
      PromiseA = PromiseA.Promise || PromiseA;
  
  
      function forEachAsync(arr, fn, thisArg) {
        var result = PromiseA.resolve();
  
        arr.forEach(function (item, k) {
          result = result.then(function () {
  
            var ret
              ;
  
            if (thisArg) {
              ret = fn.call(thisArg, item, k, arr);
            } else {
              ret = result = fn(item, k, arr);
            }
  
            if (!ret || !ret.then) {
              ret = PromiseA.resolve(ret);
            }
  
            return ret.then(function (val) {
              if (val === forEachAsync.__BREAK) {
                return PromiseA.reject(new Error('break'));
                //throw new Error('break');
              }
  
              return val;
            });
          });
        });
  
        result.catch(function (e) {
          if ('break' !== e.message) {
            throw e;
          }
        });
  
        return result;
      }
  
      forEachAsync.__BREAK = BREAK;
  
      return forEachAsync;
    }
  
    /*
    exp = forEachAsync.forEachAsync = forEachAsync;
    exports = exports.forEachAsync = forEachAsync.forEachAsycn = forEachAsync;
    exports.create = forEachAsync.create = function () {};
    */
  
    /* globals Promise */
    if ('undefined' !== typeof Promise) {
      exp.forEachAsync = create(Promise);
    }
    else {
      try {
       exp.forEachAsync = create(require('bluebird'));
      } catch(e) {
        console.warn("This version of node doesn't support promises. Please `npm install --save bluebird` in your project.");
      }
    }
  
    exports.forEachAsync = exp.forEachAsync.forEachAsync = exp.forEachAsync || function () {
      throw new Error("You did not supply a Promises/A+ implementation. See the warning above.");
    };
    exports.forEachAsync.create = create;
  
  }('undefined' !== typeof exports && exports || window));