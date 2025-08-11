(function ($) {
  "use strict";

  // ✅ Initialize AOS animation
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });

  // ✅ Initialize Isotope
  const initIsotope = function () {
    $(".grid").each(function () {
      const $grid = $(this).isotope({
        itemSelector: ".portfolio-item",
        filter: $(".button-group .is-checked").attr("data-filter"),
      });

      $(".button-group").on("click", "a", function (e) {
        e.preventDefault();
        const filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });

        $(".button-group .is-checked").removeClass("is-checked");
        $(this).addClass("is-checked");
      });
    });
  };

  // ✅ Initialize Chocolat lightbox
  const initChocolat = function () {
    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });
  };

  // ✅ Preloader and Isotope on window load
  $(window).on("load", function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  });

  // ✅ Document ready initializations
  $(document).ready(function () {
    initChocolat();

    // Swiper initializations
    const swiperSettings = {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    };

    new Swiper(".servicesSwiper", {
      ...swiperSettings,
      slidesPerView: 1,
      spaceBetween: 30,
    });

    new Swiper(".testimonialsSwiper", {
      ...swiperSettings,
      slidesPerView: 3,
      spaceBetween: 30,
      breakpoints: {
        300: { slidesPerView: 1 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      },
    });

    new Swiper(".worksSwiper", {
      ...swiperSettings,
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        300: { slidesPerView: 1 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      },
    });

    new Swiper(".articlesSwiper", {
      ...swiperSettings,
      slidesPerView: 3,
      spaceBetween: 20,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      breakpoints: {
        300: { slidesPerView: 1 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      },
    });

    new Swiper(".logosSwiper", {
      ...swiperSettings,
      slidesPerView: 2,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      breakpoints: {
        576: { slidesPerView: 1, spaceBetween: 30 },
        768: { slidesPerView: 3, spaceBetween: 40 },
        992: { slidesPerView: 5, spaceBetween: 50 },
      },
    });
  });

  // ✅ Enhanced Menu Toggle Functionality
  document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-toggle-btn");
    const dropdown = document.getElementById("menuDropdown");

    if (menuBtn && dropdown) {
      menuBtn.addEventListener("click", function () {
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", function (e) {
        if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });

      // Optional: Smooth scroll to section
      dropdown.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
          dropdown.style.display = "none";
          document.body.style.overflow = "auto";
        });
      });
    }
  });
})(jQuery);
