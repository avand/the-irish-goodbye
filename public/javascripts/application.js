var Slideshow = {
  intervalID: null,

  advanceSlide: function() {
    var currentSlide      = document.querySelector(".slide-current");
    var nextSlide         = document.querySelector(".slide-next");

    if (!nextSlide) return;

    var oneAfterNextSlide = nextSlide.nextElementSibling || document.querySelector(".slide:first-child");

    function animationEnded(event) {
      oneAfterNextSlide.classList.add("slide-next");

      event.target.classList.remove("slide-previous");

      currentSlide.removeEventListener("webkitAnimationEnd", animationEnded);
    }

    currentSlide.addEventListener("webkitAnimationEnd", animationEnded);

    nextSlide.classList.add("slide-current");
    nextSlide.classList.remove("slide-next");

    currentSlide.classList.remove("slide-current")
    currentSlide.classList.add("slide-previous")
  },

  returnSlide: function() {
    var currentSlide  = document.querySelector(".slide-current");
    var nextSlide     = document.querySelector(".slide-next");

    if (!nextSlide) return;

    var previousSlide = currentSlide.previousElementSibling || document.querySelector(".slide:last-child");

    function animationEnded(event) {
      currentSlide.classList.remove("slide-current");
      currentSlide.classList.add("slide-next");

      event.target.classList.remove("slide-previous");
      event.target.classList.remove("reversed");
      event.target.classList.add("slide-current");

      nextSlide.classList.remove("slide-next");

      previousSlide.removeEventListener("webkitAnimationEnd", animationEnded);
    }

    previousSlide.addEventListener("webkitAnimationEnd", animationEnded);

    nextSlide.classList.remove("slide-next");
    previousSlide.classList.add("reversed");
    previousSlide.classList.add("slide-previous");
  },

  start: function() {
    this.intervalID = setInterval(this.advanceSlide, 5200);
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

  init: function() {
    this.bindKeyboardControls();
    this.start();
  }
};

var About = {
  animationEnd: function(event) {
    switch (event.target.className) {
      case "out":
        event.target.removeAttribute("class");
        break;
    }
  },

  show: function(event) {
    Slideshow.stop();

    event.target.style.display = "none";
    document.getElementById("about-close").style.display = "inline-block";

    document.getElementsByClassName("slide-current")[0].className = "slide slide-current blur";
    document.getElementById("about").className = "in";

    about.addEventListener("webkitAnimationEnd", About.animationEnd);
  },

  hide: function(event) {
    Slideshow.start();

    event.target.style.display = "none";
    document.getElementById("about-btn").style.display = "inline-block";

    document.getElementsByClassName("slide-current")[0].className = "slide slide-current focus";

    var about = document.getElementById("about");
    about.className = "out";
  }
};
