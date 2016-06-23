var Slideshow = {
  intervalID: null,
  container: null,
  fadeDuration: 3000,
  slideDuration: 5200,
  animationDuration: 900,
  animationTimingFunction: "cubic-bezier(.7, 0, .4, .8)",
  progressBar: null,

  getAlbumIDFromURL: function() {
    // TODO: Verify that the hash is a valid album
    hash = window.location.hash.replace("#", "");
    return hash.length == 0 ? null : hash;
  },

  advanceSlide: function() {
    var currentSlide = $(".slide-current");
    var nextSlide    = $(".slide-next");

    animate(currentSlide, "fly-out", {
      fillMode: "forwards",
      timingFunction: this.animationTimingFunction,
      duration: this.animationDuration
    }, function() {
      var newNextSlide = nextSlide.next();

      // Wrap around to the beginning
      if (newNextSlide.length == 0) newNextSlide = $(".slide:first-child")

      currentSlide.removeClass("slide-current");
      nextSlide.removeClass("slide-next").addClass("slide-current");
      newNextSlide.addClass("slide-next");
    })
  },

  start: function() {
    if (this.intervalID) return;

    this.intervalID = setInterval(this.advanceSlide.bind(this),
      this.slideDuration);
  },

  rewind: function() {
    $(".slide-current").removeClass("slide-current");
    $(".slide-next").removeClass("slide-next");

    this.container.find(".slide:first").addClass("slide-current")
      .next().addClass("slide-next");
  },

  stop: function() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  },

  changeAlbum: function() {
    this.stop();

    this.fadeOut(this.buildAlbum.bind(this));

    var transitionDuration = this.container.css("transition-duration");
    var delay = parseInt(transitionDuration) * 1000;
  },

  buildAlbum: function() {
    this.container.empty();

    var currentAlbumID = this.getAlbumIDFromURL() || data.albums[0].id;

    data.albums.forEach((function(album) {
      if (album.id == currentAlbumID) {
        $("title").text(`${album.name} - The Irish Goodbye`);

        for (var i = 1; i <= album.numberOfPhotos; i++) {
          $("<div>")
            .addClass("slide")
            .css("background-image", `url(albums/${album.id}/${i}.jpg)`)
            .appendTo(this.container)
        }
      }
    }).bind(this));

    this.container
      .find(".slide:first").addClass("slide-current")
      .next().addClass("slide-next");

    // TODO: Wire up error states and progress
    this.container
      .imagesLoaded({ background: ".slide" })
      .done((function() { this.fadeIn(); this.start(); }).bind(this));
  },

  fadeIn: function(callback) {
    this.fade(1, callback);
  },

  fadeOut: function(callback) {
    this.fade(0, callback);
  },

  fade: function(opacity, callback) {
    transition(this.container, { opacity: opacity }, {
      duration: this.fadeDuration
    }, callback)
  },

  init: function() {
    this.container = $("#slideshow").css("opacity", 0);
    this.progressBar = $("#slideshow-progress-bar");

    window.addEventListener("hashchange", this.changeAlbum.bind(this));

    this.buildAlbum();
  }
};
