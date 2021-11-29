$(function () {
  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();
});

// modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// HEADER
(function () {
  // Variables
  var $curve = document.getElementById("curve");
  var last_known_scroll_position = 0;
  var defaultCurveValue = 350;
  var curveRate = 3;
  var ticking = false;
  var curveValue;

  // Handle the functionality
  function scrollEvent(scrollPos) {
    if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
      curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
      $curve.setAttribute(
        "d",
        "M 800 300 Q 400 " + curveValue + " 0 300 L 0 0 L 800 0 L 800 300 Z"
      );
    }
  }

  // Scroll Listener
  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        scrollEvent(last_known_scroll_position);
        ticking = false;
      });
    }

    ticking = true;
  });
})();
