window.TheIrishGoodbye = {
  hello: function() {
    Hammer(document.getElementById("slideshow-container")).on("tap", Slideshow.advanceSlide);

    Slideshow.init();

    setTimeout(function() { document.querySelector("#slideshow").classList.remove("transparent") }, 400);

    document.querySelector("nav").addEventListener("click", About.toggle);

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-71804104-3', 'auto');
    ga('send', 'pageview');
  }
}
