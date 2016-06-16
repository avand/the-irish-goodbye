var Menu = {
  main: null,

  show: function(event) {
    Slideshow.stop();
    $(".slide-current").addClass("blur").removeClass("focus")
    Menu.main.addClass("in").removeClass("out");
  },

  hide: function(event) {
    Slideshow.startFromBeginning();
    $(".slide-current").addClass("focus").removeClass("blur")
    Menu.main.addClass("out").removeClass("in");
  },

  toggle: function(event) {
    $(".slide-current").hasClass("blur") ? Menu.hide() : Menu.show();
  },

  init: function() {
    this.main = $("main");

    $("nav").click(Menu.toggle);

    $("#clover").click(function() {
      $(this).toggleClass("transformed");
    });

    Albums.forEach(function(album) {
      $("<a>")
        .attr("href", "#" + album.id)
        .click(Menu.hide)
        .text(album.name)
        .appendTo($("<li>").appendTo("#albums"));
    });
  }
};
