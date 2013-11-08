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
}

window.onload = function() {
  var aboutBtn = document.getElementById("about-btn");
  aboutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    var aboutArticle = document.getElementById("about");
    var slideshow = document.getElementById("slideshow");

    if (aboutBtn.innerText === "About") {
      Slideshow.stop();
      slideshow.className = "blur";
      aboutArticle.className = "in";
      aboutBtn.innerText = "Close";
    } else {
      Slideshow.start();
      slideshow.className = "focus";
      aboutArticle.className = "out";
      aboutBtn.innerText = "About";
    }
  })

  Slideshow.start();
}
