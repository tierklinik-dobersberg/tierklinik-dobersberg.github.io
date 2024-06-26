import Reveal from "reveal.js";
import $ from "jquery";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";

$(function () {
  let deck = new Reveal({
    plugins: [Markdown],
    autoSlide: 5000,
    loop: true,
    width: "100%",
    height: "100%",
  });

  deck.initialize();
});
