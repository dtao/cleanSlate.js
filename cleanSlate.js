(function(window) {

  var timeouts  = [],
      intervals = [],
      requests  = [],
      workers   = [];

  var origSetTimeout = window.setTimeout;
  window.setTimeout = function(fn, delay) {
    var timeout = origSetTimeout.apply(this, arguments);
    timeouts.push(timeout);
    return timeout;
  };

  var origSetInterval = window.setInterval;
  window.setInterval = function(fn, delay) {
    var interval = origSetInterval.apply(this, arguments);
    intervals.push(interval);
    return interval;
  };

  var origXHRequestSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(data) {
    requests.push(this);
    return origXHRequestSend.apply(this, arguments);
  };

  var origWorkerPostMessage = Worker.prototype.postMessage;
  Worker.prototype.postMessage = function(message) {
    workers.push(this);
    return origWorkerPostMessage.apply(this, arguments);
  };

  function forEach(collection, fn) {
    var len = collection.length,
        i   = -1;

    while (++i < len) {
      fn(collection[i]);
    }
  }

  function applyForEach(collection, fn) {
    forEach(collection, function(e) {
      fn.apply(e);
    });
  }

  window.Clean = {
    timeouts: function() {
      forEach(timeouts, window.clearTimeout);
      timeouts.length = 0;
    },

    intervals: function() {
      forEach(intervals, window.clearInterval);
      intervals.length = 0;
    },

    requests: function() {
      applyForEach(requests, XMLHttpRequest.prototype.abort);
      requests.length = 0;
    },

    workers: function() {
      applyForEach(workers, Worker.prototype.terminate);
      workers.length = 0;
    },

    slate: function() {
      Clean.timeouts();
      Clean.intervals();
      Clean.requests();
      Clean.workers();
    }
  };

}(window));
