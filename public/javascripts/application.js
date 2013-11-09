var Slideshow = {
  intervalID: null,

  advance: function() {
    var currentSlide = document.getElementsByClassName("slide-current")[0];
    var nextSlide    = document.getElementsByClassName("slide-next")[0];

    currentSlide.className = "slide slide-previous";
    nextSlide.className    = "slide slide-current";

    if (nextSlide.nextElementSibling) {
      nextSlide.nextElementSibling.className = "slide slide-next";
    } else {
      document.getElementsByClassName("slide")[0].className = "slide slide-next";
    }

    currentSlide.addEventListener("webkitAnimationEnd", function(e) {
      e.target.className = "slide";
    });
  },

  start: function() {
    this.intervalID = setInterval(this.advance, 5200);
  },

  stop: function() {
    clearInterval(this.intervalID);
  }
};

var About = {
  show: function(event) {
    event.target.style.display = "none";
    document.getElementById("about").className = "in";
    document.getElementById("about-close").style.display = "inline-block";
    Slideshow.stop();
    document.getElementById("slideshow").className = "blur";
  },

  hide: function(event) {
    event.target.style.display = "none";
    document.getElementById("about").className = "out";
    document.getElementById("about-btn").style.display = "inline-block";
    Slideshow.start();
    document.getElementById("slideshow").className = "focus";
  }
};
