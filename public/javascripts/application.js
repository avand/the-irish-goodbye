var Slideshow = {
  intervalID: null,

  advance: function() {
    var currentSlide = document.getElementsByClassName("slide-current")[0];
    var nextSlide    = document.getElementsByClassName("slide-next")[0];

    currentSlide.className = "slide slide-previous";
    nextSlide.className    = "slide slide-current";

    currentSlide.addEventListener("webkitAnimationEnd", function(e) {
      e.target.className = "slide";
    });

    if (nextSlide.nextElementSibling) {
      nextSlide = nextSlide.nextElementSibling;
    } else {
      nextSlide = document.getElementsByClassName("slide")[0];
    }

    nextSlide.className = "slide slide-next";
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
    Slideshow.stop();

    event.target.style.display = "none";
    document.getElementById("about-close").style.display = "inline-block";

    document.getElementsByClassName("slide-current")[0].className = "slide slide-current blur";
    document.getElementById("about").className = "in";
  },

  hide: function(event) {
    Slideshow.start();

    event.target.style.display = "none";
    document.getElementById("about-btn").style.display = "inline-block";

    document.getElementsByClassName("slide-current")[0].className = "slide slide-current focus";

    var about = document.getElementById("about");
    about.className = "out";
    about.addEventListener("webkitAnimationEnd", function(e) { e.target.className = ""; });
  }
};
