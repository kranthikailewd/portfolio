document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".Carousel-slider");

  const slider = new MicroSlider(carousel, {
    indicators: true,
    indicatorText: ""
  });

  const hammer = new Hammer(carousel);
  const AUTOPLAY_DELAY = 3000;

  let autoplayTimer = null;
  let isInteracting = false;

  function startAutoplay() {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(() => slider.next(), AUTOPLAY_DELAY);
    }
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Start autoplay initially
  startAutoplay();

  /* -------------------------
     USER INTERACTION HANDLING
  --------------------------*/

  // Mouse interaction
  carousel.addEventListener("mousedown", () => {
    isInteracting = true;
    stopAutoplay();
  });

  carousel.addEventListener("mouseup", () => {
    isInteracting = false;
    startAutoplay();
  });

  // Touch interaction
  carousel.addEventListener("touchstart", () => {
    isInteracting = true;
    stopAutoplay();
  });

  carousel.addEventListener("touchend", () => {
    isInteracting = false;
    startAutoplay();
  });

  // Gesture events
  hammer.on("swipe", () => {
    stopAutoplay();
    startAutoplay();
  });

  hammer.on("tap", () => {
    stopAutoplay();
  });

  /* -------------------------
     SLIDE CLICK HANDLING
  --------------------------*/
  document.querySelectorAll(".slider-item").forEach(slide => {
    slide.addEventListener("click", e => {
      e.preventDefault();
      stopAutoplay();

      const href = slide.dataset.href;
      const target = slide.dataset.target || "_self";
      if (href && href !== "#") window.open(href, target);
    });
  });
});
