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

  // Memory Game Logic
  document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.querySelector(".memory-game");
    const resetButton = document.getElementById("reset-game-btn");
    const movesCountSpan = document.getElementById("moves-count");
    const timerSpan = document.getElementById("timer");
    const winModal = document.getElementById("win-modal");
    const highScoreSpan = document.getElementById("high-score");
    const finalMovesSpan = document.getElementById("final-moves");
    const finalTimeSpan = document.getElementById("final-time");
    const winModalTitle = document.getElementById("win-modal-title");
    const newHighScoreForm = document.getElementById("new-high-score-form");
    const saveScoreBtn = document.getElementById("save-score-btn");
    const playAgainBtn = document.getElementById("play-again-btn");

    if (!gameContainer) return;

    const icons = [
      "fa-robot",
      "fa-microchip",
      "fa-solar-panel",
      "fa-code",
      "fa-brain",
      "fa-bolt",
      "fa-atom",
      "fa-satellite-dish",
    ];
    let cards = [...icons, ...icons];

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let timerInterval = null;
    let seconds = 0;
    let matchedPairs = 0;
    const totalPairs = icons.length;

    function loadHighScore() {
      const highScoreData = JSON.parse(
        localStorage.getItem("memoryGameHighScore")
      );
      if (highScoreData) {
        highScoreSpan.textContent = `${highScoreData.score} Moves (by ${highScoreData.name})`;
        return highScoreData.score;
      }
      highScoreSpan.textContent = "N/A";
      return null;
    }

    function createBoard() {
      gameContainer.innerHTML = "";
      shuffle(cards);
      cards.forEach((icon) => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.icon = icon;

        card.innerHTML = `
          <div class="front-face">
            <i class="fas fa-question"></i>
          </div>
          <div class="back-face">
            <i class="fas ${icon}"></i>
          </div>
        `;
        gameContainer.appendChild(card);
        card.addEventListener("click", flipCard);
      });
    }

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    function flipCard() {
      if (timerInterval === null) {
        startTimer();
      }

      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add("flip");

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }

      secondCard = this;
      incrementMoves();
      checkForMatch();
    }

    function checkForMatch() {
      let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
      isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      matchedPairs++;
      if (matchedPairs === totalPairs) {
        winGame();
      }

      resetBoard();
    }

    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 1200);
    }

    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
      winModal.classList.remove("visible");
      newHighScoreForm.style.display = "none";
      document.getElementById("play-again-container").style.display = "block";
      winModalTitle.textContent = "You Won!";

      resetBoard();
      moves = 0;
      matchedPairs = 0;
      movesCountSpan.textContent = "0";
      stopTimer();
      seconds = 0;
      timerSpan.textContent = "0s";
      createBoard();
    }

    function incrementMoves() {
      moves++;
      movesCountSpan.textContent = moves;
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        seconds++;
        timerSpan.textContent = `${seconds}s`;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    function winGame() {
      stopTimer();
      setTimeout(() => {
        finalMovesSpan.textContent = moves;
        finalTimeSpan.textContent = `${seconds}s`;
        winModal.classList.add("visible");

        // Check and update high score
        const currentHighScore = loadHighScore();
        if (currentHighScore === null || moves < currentHighScore) {
          winModalTitle.textContent = "New High Score!";
          newHighScoreForm.style.display = "block";
          document.getElementById("play-again-container").style.display =
            "none";
        }
      }, 500);
    }

    function saveHighScore() {
      const playerNameInput = document.getElementById("player-name");
      const playerName = playerNameInput.value.trim() || "Anonymous";

      const highScoreData = {
        score: moves,
        name: playerName,
      };

      localStorage.setItem(
        "memoryGameHighScore",
        JSON.stringify(highScoreData)
      );
      loadHighScore();

      newHighScoreForm.style.display = "none";
      document.getElementById("play-again-container").style.display = "block";
      playerNameInput.value = "";
    }

    // Initial game setup
    loadHighScore();
    createBoard();
    resetButton.addEventListener("click", resetGame);
    playAgainBtn.addEventListener("click", resetGame);
    saveScoreBtn.addEventListener("click", saveHighScore);
    winModal.addEventListener("click", function (e) {
      if (e.target === winModal) {
        winModal.classList.remove("visible");
      }
    });
  });
})(jQuery);
