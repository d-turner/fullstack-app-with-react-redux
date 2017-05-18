// begin fileReader with promises - three methods: onLoad, onError, and onProgress
const fileReader = function($q) {
  // Why are we passing in scope here? - Answer: because the resolution of the promise is called with scope.$apply
  var onLoad = function(reader, deferred) {
    return function() {
      console.log(reader)
      deferred.resolve(reader.result);
    };
    // return function () {
    //   scope.$apply(function () {
    //     deferred.resolve(reader.result);
    //   });
    // };
  };

  var onError = function(reader, deferred) {
    return function() {
      deferred.reject(reader.result);
      // scope.$apply(() => {
      //   deferred.reject(reader.result);
      // });
    };
  };


  var getReader = function(deferred) {
    const reader = new FileReader();
    reader.onload = onLoad(reader, deferred);
    reader.onerror = onError(reader, deferred);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  var readAsText = function(file) {
    console.log(file);
    var deferred = $q.defer();

    // var reader = getReader(deferred, scope);
    var reader = getReader(deferred);
    reader.readAsText(file);

    return deferred.promise;
  };

  // TODO: how to maintain document state as the user changes stuff?
  var readAsXML = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsText(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL,
    readAsText,
    readAsXML,
  };
};

export default fileReader;
