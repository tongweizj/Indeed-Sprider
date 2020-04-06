const forEachAsync = require('../utils/forEachAsync').forEachAsync
var requestAsync = require('requestsync');

function getPicsAsync(animal) {
    var flickerApi = "http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&tags=" + animal;

    return requestAsync({
        url: flickerApi
    });
}

let tmp = []

forEachAsync(['dogs', 'cats', 'octocats'], function (element) {
    return tmp.push(getPicsAsync(element));
}).then(function () {
    // then after all of the elements have been handled
    // the final callback fires to let you know it's all done
    console.log(tmp.length)
    console.log('All requests have finished');
});