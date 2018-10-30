fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      for(element in collection) {
        callback(collection[element])
      }

      return collection
    },

    map: function(collection, callback) {
      newCollection = []
      for(element in collection) {
        newCollection.push(callback(collection[element]))
      }

      return newCollection;
    },

    reduce: function(collection, callback, accumulator=0) {
      for(element in collection) {
        accumulator = callback(accumulator, collection[element], collection);
      }

      return accumulator
    },
    
    find: function(collection, callback) {
      for(element in collection) {
        if (callback(collection[element])) {
          return collection[element]
        }
      }
    },

    filter: function(collection, callback) {
      const resultsArray = []
      for(element in collection) {
        if (callback(collection[element])) {
          resultsArray.push(collection[element]);
        }
      }
      return resultsArray;
    },

    size: function(collection) {
      return Object.keys(collection).length
    },

    first: function(array, n=1) {
      const result = array.slice(0,n);
      if (result.length == 1) {
        return result[0]
      }
      return result
    },

    last: function(array, n=1) {
      const result = array.slice(array.length - n);
      if (result.length == 1) {
        return result[0]
      }
      return result
    },

    compact: function(array) {
      newArray = array.slice()

      for(let i = 0; i < newArray.length; i++) {
        if (!newArray[i] || newArray[i] == false) {
          newArray.splice(i, 1);
          i--
        }
      }

      return newArray; 
    },

    sortBy: function(array, callback) {
      const newArray = array.slice();
      return newArray.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    flatten: function(array, shallow=false) {
      let newArray = []
      let counter = 0

      let internalFlatten = function(internalArray){

        for (index in internalArray) {
          if (Array.isArray(internalArray[index]) && (counter < 1 || !shallow)) {
            ++counter
            internalFlatten(internalArray[index]);
            --counter
          } else {
            newArray.push(internalArray[index])
          }
        }
      }

      internalFlatten(array)
      return newArray
    },

    uniq: function(array, isSorted=false, callback=(x => x)) {
      newArray = []
      newArray.push(array[0])

      if (isSorted) {
        for(let i=0; i < array.length; i++) {
          if (callback(array[i]) !== callback(fi.last(newArray))) {
            newArray.push(array[i]);
          }

        }
      } else {

        for(let i=0; i < array.length; i++) {
          let unique = true

          for (let j=0; j < newArray.length; j++) {
            if (callback(array[i]) == callback(newArray[j])) {
                unique = false
              }
            }
            if (unique) { newArray.push(array[i]) }
          }
        }

      return newArray
    },

    keys: function(object) {
      keys = []
      for (key in object) {
        keys.push(key)
      }
      return keys
    },

    values: function(object) {
      values = []
      for (key in object) {
        values.push(object[key])
      }
      return values
    },

    functions: function(object) {
      let functions = []

      let keys = fi.keys(object)
      functions = fi.filter(keys, key => { return (typeof object[key]) === "function"})

       return functions.sort(function(nameOne, nameTwo) {return nameOne.localeCompare(nameTwo) })
    }

  }
})()

fi.libraryMethod()