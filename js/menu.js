var Menu = {
  main: null,
  clover: null,
  isHidden: true,

  show: function(event) {
    this.clover.addClass("transformed");

    Slideshow.stop();
    Slideshow.container.addClass("blur").removeClass("focus")

    animate(this.main.show(), "fade-in", {
      duration: 1100,
      timingFunction: "ease-out",
      fillMode: "forwards"
    }, (function() { this.isHidden = false; }).bind(this))
  },

  hide: function(event) {
    this.clover.removeClass("transformed");

    Slideshow.start();
    Slideshow.container.addClass("focus").removeClass("blur")

    animate(this.main, "fade-out", {
      duration: 600,
      timingFunction: "ease-out",
      fillMode: "forwards"
    }, (function(e) { e.hide(); this.isHidden = true; }).bind(this))
  },

  toggle: function(event) {
    this.isHidden ? this.show() : this.hide();
  },

  listAlbum: function(album) {
    $("<a>")
      .attr("href", "#" + album.id)
      .click(this.hide)
      .text(album.name)
      .appendTo($("<li>").appendTo("#albums"));
  },

  init: function() {
    this.main = $("main");
    this.clover = $("#clover");

    $("nav").click(this.toggle.bind(this));

    data.albums.forEach(this.listAlbum.bind(this));
  }
};
