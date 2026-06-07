const swiper = new Swiper('.co-carousel', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  
  // Si quieres que se mueva solo
  autoplay: {
    delay: 3000,
  },

  // Animaciones de transición
  speed: 800,
  effect: 'slide',
});