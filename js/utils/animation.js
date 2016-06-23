(function() {
  window.animationQueue = [];

  window.runAnimationQueue = function(queueCallback) {
    var animationName, animationOptions, callback, element, nextAnimation, properties, transitionOptions;
    nextAnimation = window.animationQueue.shift();
    if (!nextAnimation) {
      if (queueCallback) {
        queueCallback();
      }
      return;
    }
    element = nextAnimation[0];
    callback = nextAnimation[3];
    if (typeof nextAnimation[1] === "string") {
      animationName = nextAnimation[1];
      animationOptions = nextAnimation[2];
      return animate(element, animationName, animationOptions, function(element) {
        if (callback) {
          callback(element);
        }
        return runAnimationQueue(queueCallback);
      });
    } else {
      properties = nextAnimation[1];
      transitionOptions = nextAnimation[2];
      return transition(element, properties, transitionOptions, function(element) {
        if (callback) {
          callback(element);
        }
        return runAnimationQueue(queueCallback);
      });
    }
  };

  window.animate = function(element, animationName, options, callback) {
    var properties;
    options || (options = {});
    options.delay || (options.delay = 0);
    options.duration || (options.duration = 100);
    options.fillMode || (options.fillMode = "forwards");
    properties = {
      "animation-delay": options.delay + "ms",
      "animation-direction": options.direction,
      "animation-duration": options.duration + "ms",
      "animation-fill-mode": options.fillMode,
      "animation-name": animationName,
      "animation-iteration-count": options.iterationCount,
      "animation-timing-function": options.timingFunction,
      "animation-play-state": options.playState
    };
    element.css(properties);
    return setTimeout((function() {
      for (prop in properties) properties[prop] = "";
      element.css(properties)

      if (callback) return callback(element);
    }), options.duration);
  };

  window.transition = function(element, properties, options, callback) {
    options || (options = {});
    options.delay || (options.delay = Math.round(parseFloat(element.css("transition-delay")) * 1000));
    options.duration || (options.duration = Math.round(parseFloat(element.css("transition-duration")) * 1000));
    properties["transition-timing-function"] = options.timingFunction;
    properties["transition-delay"] = options.delay + "ms";
    properties["transition-duration"] = options.duration + "ms";
    element.css(properties);

    if (callback) {
      element.on("transitionend oTransitionEnd webkitTransitionEnd", function() {
        callback(element)
      })
    }
  };

}).call(this);
