import $ from "jquery";



// Initialize the page.
$(function () {
  // Close each dropdown if the user clicks outside of it
  $(window).on("click", function (event) {
    var closest = $(event.target).closest(".nav-li") || [];
    if (closest.length === 0) {
      $(".nav-li").removeClass("show");
    }

    var inToggle = $(event.target).closest("#menu-toggle") || [];

    if (inToggle.length === 1) {
      $("#menu").toggleClass("active");
      $("#menu-toggle").toggleClass("active");
    }
  });

  let debounced: number | null = null;

  function showSubMenu(event) {
    console.log("show-sub-menu");

    if (!$(this).hasClass("show")) {
      $(".nav-li").not(self).removeClass("show");
      event.preventDefault();
    } else {
      return;
    }

    if ($(this).children(".dropdown-content").length == 0) {
      return;
    }

    if (!!debounced) {
      clearTimeout(debounced);
    }

    var self = this;
    $(".nav-li").not(self).removeClass("show");

    $(self).addClass("show");
  }

  $(".nav-li").on("mouseover", showSubMenu);
  $(".nav-li").on("click", showSubMenu);
  $(".nav-li").on("mouseleave", function (event) {
    if (!!debounced) {
      clearTimeout(debounced);
    }

    debounced = setTimeout(() => {
      $(this).removeClass("show");
      debounced = null;
    }, 100);
  });

  function showMenu(event) {
    $("#menu").toggleClass("active");
    $("#menu-toggle").toggleClass("active");

    event.bubbles = false;
    event.preventDefault();
    event.stopPropagation();
  }
  $("#menu-toggle").on("click", showMenu);

  $("#backdrop").on("click", function(event) {
    showMenu(event);
  })


  // Random-Bild für Leistungen
  const templates = $('template[data-id="user-images"]');
  if (!!templates && templates.length > 0 ) {
    const randomImgNode = templates[Math.ceil(Math.random() * (templates.length)) -1];

    $("#user-image-placeholder")
      .append($(randomImgNode).html())
  }

  // Header slide-show
  const slideContainer = document.getElementById("slide-container");
  const overlay = $("#slide-container-overlay");

  if (!!slideContainer) {
    const len = $("template[data-slide]")?.length || 0;

    let current = 0;
    $(slideContainer).empty()

    let run = () => {
      current = current + 1;
      if (current > len) {
        current = 1;
      }

      $(slideContainer).find('picture.finished')
        .remove();

      $(slideContainer).find('picture')
        .addClass('finished')
        .first()
        .fadeOut('slow');

      const next = $(`template[data-slide="${current}"]`);

      if ($(next).attr("data-slide-darken") === "true") {
        $(overlay).removeClass("hidden")
      } else {
        $(overlay).addClass("hidden")
      }

      $(slideContainer).append(next.html());
    };

    run();

    setInterval(run, 10000)
  }

  console.log("initialized");
});

