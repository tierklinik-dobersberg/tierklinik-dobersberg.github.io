import $ from "jquery";

export function setupMenu() {
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
}