/* ==========================================
   Fancy carousel
========================================== */

const container = document.getElementById("myCarousel");

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

const marksOptions = {
  infinite: true,
  transition: "slide",
  center: false
};



container ? Carousel(container, defOptions, {Arrows, Dots, Autoplay, Autoscroll, Lazyload }).init() : '';