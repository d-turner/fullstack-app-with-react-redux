
const fileReader = function($q) {
  const onLoad = function(reader, deferred) {
    return function() {
      deferred.resolve(reader.result);
    };
  };

  const onError = function(reader, deferred) {
    return function() {
      deferred.reject(new Error(`An error occurred for FileReader: ${reader.result}`));
    };
  };

  const onProgress = function(event) {
    return function() {
      if (event.lengthComputable) {
        const max = event.total;
        const value = event.loaded;
        console.log(`Max: ${max}, Value: ${value}`);
      }
    };
  };

  const getReader = function(deferred) {
    const reader = new FileReader();
    reader.onload = onLoad(reader, deferred);
    reader.onerror = onError(reader, deferred);
    reader.onprogress = onProgress;
    return reader;
  };

  const readAsDataURL = function(file) {
    const deferred = $q.defer();
    const reader = getReader();
    reader.readAsDataURL(file);
    return deferred.promise;
  };

  const readAsText = function(file) {
    const deferred = $q.defer();
    const reader = getReader(deferred);
    reader.readAsText(file);
    return deferred.promise;
  };

  const readAsXML = function(file) {
    const deferred = $q.defer();
    const reader = getReader();
    reader.readAsText(file);
    return deferred.promise;
  };

  return {
    readAsDataURL,
    readAsText,
    readAsXML,
  };
};

export default fileReader;
