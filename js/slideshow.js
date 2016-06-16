function attachAnimationEndCallback(obj, method, callback) {
  var events = ["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"];

  for (var i = 0; i < events.length; i++) {
    obj[method](events[i], callback)
  }
};

window.getCleanHash = function() {
  // TODO: Verify that the hash is a valid album
  return window.location.hash.replace("#", "");
};

var Slideshow = {
  intervalID: null,
  container: null,

  currentAlbum: (function() {
    var hash = getCleanHash();
    return hash.length == 0 ? "avid-hailey" : hash;
  })(),

  advanceSlide: function() {
    var currentSlide = $(".slide-current");
    var nextSlide    = $(".slide-next");

    if (!nextSlide) return;

    var oneAfterNextSlide = nextSlide.next() || $(".slide:first-child");

    function animationEnded(event) {
      oneAfterNextSlide.addClass("slide-next");
      $(event.target).removeClass("slide-previous");

      attachAnimationEndCallback(currentSlide, "off", animationEnded);
    }

    attachAnimationEndCallback(currentSlide, "on", animationEnded);

    nextSlide.addClass("slide-current").removeClass("slide-next");

    currentSlide.addClass("slide-previous").removeClass("slide-current")
  },

  returnSlide: function() {
    var currentSlide = $(".slide-current");
    var nextSlide    = $(".slide-next");

    if (!nextSlide) return;

    var previousSlide = currentSlide.prev() || $(".slide:last-child");

    function animationEnded(event) {
      currentSlide.addClass("slide-next").removeClass("slide-current");

      $(event.target)
        .addClass("slide-current")
        .removeClass("slide-previous")
        .removeClass("reversed");

      nextSlide.removeClass("slide-next");

      attachAnimationEndCallback(previousSlide, "removeEventListener", animationEnded);
    }

    attachAnimationEndCallback(previousSlide, "addEventListener", animationEnded);

    nextSlide.removeClass("slide-next");
    previousSlide.addClass("reversed").addClass("slide-previous");
  },

  start: function() {
    this.intervalID = setInterval(this.advanceSlide, 5200);
  },

  startFromBeginning: function() {
    $(".slide-current").removeClass("slide-current");
    $(".slide-next").removeClass("slide-next");
    $(".slide-previous").removeClass("slide-previous");

    Slideshow.container
      .removeClass("transparent")
      .find(".slide:first").addClass("slide-current")
      .next().addClass("slide-next");

    Slideshow.start();
    //
    // // this.stop();
    // this.container.find(".slide:first").addClass("")
  },

  stop: function() {
    clearInterval(this.intervalID);
  },

  handleKeydown: function(event) {
    if (event.which == 37 || event.which == 39) {
      if (this.intervalID) { this.stop(); this.start(); }

      event.which == 37 ? this.returnSlide() : this.advanceSlide();
    }
  },

  bindKeyboardControls: function() {
    document.addEventListener("keydown", this.handleKeydown.bind(this))
  },

  changeAlbum: function() {
    var transitionDuration = Slideshow.container.css("transition-duration");
    var delay = parseInt(transitionDuration) * 1000;

    Slideshow.container
      .data("initial-transition-duration", transitionDuration)
      .css("transition-duration", Math.round(delay / 10) + "ms")
      .addClass("transparent");

    setTimeout(function() {
      Slideshow.container.empty()
      Slideshow.currentAlbum = getCleanHash();
      Slideshow.buildAlbum()
    }, delay / 5);
  },

  buildAlbum: function() {
    Albums.forEach(function(album) {
      if (album.id == Slideshow.currentAlbum) {
        for (var i = 1; i <= album.numberOfPhotos; i++) {
          $("<div>")
            .addClass("slide")
            .css({
              backgroundImage: "url(albums/" + album.id + "/" + i + ".jpg)"
            })
            .appendTo("#slideshow")
        }
      }
    });

    // TODO: Wire up error states and progress
    Slideshow.container
      .imagesLoaded({ background: ".slide" })
      .done( function( instance ) {
        Slideshow.startFromBeginning();

        var transitionDuration = Slideshow.container.data("initial-transition-duration");
        if (transitionDuration) Slideshow.container.css("transition-duration", transitionDuration)
      })
  },

  init: function() {
    this.container = $("#slideshow");

    this.bindKeyboardControls();

    window.addEventListener("hashchange", this.changeAlbum);

    this.buildAlbum();
  }
};
