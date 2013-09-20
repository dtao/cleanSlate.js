this.onmessage = function(e) {
  setTimeout(function() {
    this.postMessage('Worker received message: ' + e.data);
  }, 1000);
};
