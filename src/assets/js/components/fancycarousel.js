/* ==========================================
   Fancy carousel
========================================== */

const container = document.getElementById("myCarousel");
const aboutFacts = document.querySelector("#about-facts");
const aboutAdvantages = document.querySelector("#about-advantages");
const aboutPortfolio = document.querySelector("#about__portfolio-carousel");
const channels = document.querySelector("#channels");
const carpageCarousel = document.querySelector("#carpage-carousel");

const defOptions = {
  infinite: true,
  transition: "slide",
  center: false,
  Arrows: {
    prevTpl: "Налево епт",
    nextTpl: "Направо епт",
  },
  Autoplay: {
      pauseOnHover: false,
    },
    style: {
      "--f-progressbar-color": "#d70909",
      "--f-progressbar-height": "10px",
  },
  Dots: {
    dotTpl : "<button data-carousel-go-to=\"%i\" style=\"padding:5px;\">%d asd</button>",
    dynamicFrom: 3,
    dynamicPadd: 1,
  }
};

const aboutFactsOptions = {
  infinite: true,
  transition: "slide",
  center: true,
  slidesPerPage: 1,
  Autoplay: {
      pauseOnHover: false,
      showProgressbar: false,
      timeout: 3000
    }
};

const aboutAdvantagesOptions = {
  infinite: false,
  transition: "slide",
  center: false
};

const aboutPortfolioOptions = {
  infinite: false,
  transition: "slide",
  center: false,
  slidesPerPage: 1
};

const carpageCarouselOptions = {
  infinite: false,
  transition: "slide",
  center: false,
  slidesPerPage: 1,
  Thumbs: {
    type: "classic",
  }
};



container ? Carousel(container, defOptions, {Arrows, Dots, Autoplay, Autoscroll, Lazyload }).init() : '';

aboutFacts ? Carousel(aboutFacts, aboutFactsOptions, { Autoplay }).init() : '';
aboutAdvantages ? Carousel(aboutAdvantages, aboutAdvantagesOptions, { Arrows }).init() : '';
aboutPortfolio ? Carousel(aboutPortfolio, aboutPortfolioOptions, { Arrows }).init() : '';
channels ? Carousel(channels, aboutPortfolioOptions, { Arrows }).init() : '';
carpageCarousel ? Carousel(carpageCarousel, carpageCarouselOptions, { Arrows, Lazyload, Thumbs }).init() : '';