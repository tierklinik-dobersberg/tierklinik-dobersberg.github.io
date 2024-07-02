import $ from "jquery";

declare var umami: any;

export class Accordion {
  static CONTENT_CLOSED = "opacity-0 scale-y-0 h-0";
  static CONTENT_OPENED = "opacity-100 scale-y-100 h-fit";
  static ICON_CLASSES = "transform transition ease-in-out origin-center";

  private header: JQuery<HTMLElement>;
  private content: JQuery<HTMLElement>;
  private icons: JQuery<HTMLElement>;

  constructor(private element: JQuery<HTMLElement>) {
    this.header = element.children("[data-accordion-title]").first();
    this.content = element.children("[data-accordion-content]").first();
    this.icons = this.header.find("[data-accordion-icon] svg");

    this.close();

    // setup default classes
    this.content.addClass(
      "transform transition-all duration-150 ease-in-out origin-top"
    );
    this.content.removeClass("hidden");

    this.icons.addClass(Accordion.ICON_CLASSES);

    this.header.on("click", () => {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    });

    this.close();
  }

  public get isOpen(): boolean {
    return !this.content.hasClass("opacity-0");
  }

  public close() {
    this.content.removeClass(Accordion.CONTENT_OPENED);
    this.content.addClass(Accordion.CONTENT_CLOSED);
    this.icons.toggleClass("scale-100 scale-0");
    this.element.removeClass("bg-gray-50");
  }

  public open() {
    this.content.removeClass(Accordion.CONTENT_CLOSED);
    this.content.addClass(Accordion.CONTENT_OPENED);
    this.icons.toggleClass("scale-100 scale-0");
    this.element.addClass("bg-gray-50");

    try {
      const umamiEvent = this.header.attr("data-accordion-title");
      if (!!umamiEvent) {
        umami.track("FAQ: " + umamiEvent)
      }
    } catch(err) {}
  }
}

export function setupAccordions() {
  $("[data-accordion]").each((_, element) => {
    new Accordion($(element));
  });
}
