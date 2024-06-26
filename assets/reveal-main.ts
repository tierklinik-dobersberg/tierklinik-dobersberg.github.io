import Reveal from "reveal.js";
import $ from "jquery";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';

$(function () {
  let autoplay = $("[data-reveal-autoplay]").attr("data-reveal-autoplay") !== "false";

  let deck = new Reveal({
    plugins: [Markdown, RevealNotes],
    autoSlide: autoplay ? 5000 : undefined,
    loop: true,
    width: "100%",
    height: "100%",
  });

  deck.initialize();
});
