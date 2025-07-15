// ✅ Polyfill for Array.prototype.map
Array.prototype.myMap = function(callback, thisArg) {
    // 🚫 Validate that callback is a function
    if (typeof callback !== 'function')
        throw new TypeError(`${callback} is not a function`);

    // 🚫 Validate 'this' is not null or undefined
    if (this === null)
        throw new TypeError("Calling myMap on undefined");

    // 🔄 Convert 'this' to an object
    let arr = Object(this);
    // 📦 Create result array with same length
    let result = Array(arr.length);

    // 🧭 Loop through each index
    for (let i = 0; i < arr.length; i++) {
        // ✅ Skip sparse elements
        if (i in arr) {
            // 🔁 Execute callback with optional 'thisArg'
            result[i] = callback.call(thisArg, arr[i], i, arr);
        }
    }

    // 🔚 Return mapped result
    return result;
}

// 🧪 Test custom myMap and native map
console.log([1, 2, , 4].myMap((item) => { console.log(item, "item") }));
console.log("========");
console.log([1, 2, , 4].map((item) => { console.log(item, "item") }));


// ✅ Polyfill for Array.prototype.forEach
Array.prototype.myForEach = function(callback, thisArg) {
    // 🚫 Validate 'this'
    if (this === null) {
        throw new TypeError("call on undefined");
    }

    // 🚫 Validate callback
    if (typeof callback !== "function")
        throw new TypeError(`${callback} is not a function`);

    // 🔄 Convert to object
    let arr = Object(this);

    // 🧭 Loop through each item
    for (let i = 0; i < arr.length; i++) {
        // ✅ Skip holes
        if (i in arr) {
            // 🔁 Call the callback function
            callback.call(thisArg, arr[i], i, arr);
        }
    }
}

// 🧪 Test custom forEach and native forEach
console.log([1, 2, , 4].myForEach((item) => { console.log(item, "item") }));
console.log("========");
console.log([1, 2, , 4].forEach((item) => { console.log(item, "item") }));


// ✅ Polyfill for Array.prototype.filter
Array.prototype.myFilter = function(callback){
    // 🚫 Validate 'this'
    if (this === null) {
        throw new TypeError("call on undefined");
    }

    // 🚫 Validate callback
    if (typeof callback !== "function")
        throw new TypeError(`${callback} is not a function`);

    // 🔄 Convert to object
    let arr = Object(this);
    // 📦 Use dynamic result array
    let result = [];

    // 🧭 Loop through each item
    for(let i = 0; i < arr.length; i++){
        // ✅ Only if index exists and callback returns truthy
        if ((i in arr) && callback.call(null, arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }

    // 🔚 Return filtered result
    return result;
}

// 🧪 Test custom filter and native filter
console.log([10, 2, , 4].myFilter((item) => { return item/2 === 0 }));
console.log("========");
console.log([10, 2, , 4].filter((item) => { return item/2 === 0 }));


// ✅ Polyfill for Array.prototype.reduce
Array.prototype.myReduce = function(callback, initialValue){
    // 🚫 Validate callback
    if (typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function`);
    }

    // 🚫 Validate 'this'
    if (this == null) {
        throw new TypeError("calling on undefined");
    }

    // 🔄 Convert to object
    let arr = Object(this);
    let accum;
    let startIndex = 0;

    // ✅ Handle initialValue
    if (arguments.length >= 2) {
        accum = initialValue;
    } else {
        // ⚠️ Skip empty slots until first valid value
        while (startIndex < arr.length && !(startIndex in arr)) {
            startIndex++;
        }
        // 🚫 If all slots are empty, throw error
        if (startIndex >= arr.length) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        // 🎯 Use first defined value as accumulator
        accum = arr[startIndex++];
    }

    // 🧭 Loop through the rest of the array
    for (let i = startIndex; i < arr.length; i++) {
        if (i in arr) {
            // 🔁 Apply callback and update accumulator
            accum = callback.call(null, accum, arr[i], i, arr);
        }
    }

    // 🔚 Return final accumulated value
    return accum;
}

// 🧪 Test custom reduce and native reduce
console.log([10, 2, , 4].myReduce((accum, item) => { return item + accum }));
console.log("========");
console.log([10, 2, , 4].reduce((accum, item) => { return item + accum }));
