import $ from "jquery";
import { setupMenu } from './menu';
import { setupHeroSlider } from './hero-slider';
import { setupAccordions } from './accordion';


// Initialize the page.
$(function () {
  setupMenu();
  setupHeroSlider();
  setupAccordions();

  // Random-Bild für Leistungen
  const templates = $('template[data-id="user-images"]');
  if (!!templates && templates.length > 0 ) {
    const randomImgNode = templates[Math.ceil(Math.random() * (templates.length)) -1];

    $("#user-image-placeholder")
      .append($(randomImgNode).html())
  }
});

