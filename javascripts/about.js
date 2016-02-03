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

    document.getElementsByClassName("slide-current")[0].className = "slide slide-current blur";
    document.getElementById("about").className = "in";

    about.addEventListener("webkitAnimationEnd", About.animationEnd);
  },

  hide: function(event) {
    Slideshow.start();

    document.getElementsByClassName("slide-current")[0].className = "slide slide-current focus";

    var about = document.getElementById("about");
    about.className = "out";
  },

  toggle: function(event) {
    if (document.querySelector(".slide-current").classList.contains("blur")) {
      About.hide();
    } else {
      About.show();
    }
  }
};
