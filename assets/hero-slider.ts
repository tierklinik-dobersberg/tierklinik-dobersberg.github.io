import $ from "jquery";

export function setupHeroSlider() {
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
}