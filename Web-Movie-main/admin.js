// Movie data
const relatedMovies = [
  {
    title: "The Matrix",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Interstellar",
    image:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Tenet",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Blade Runner",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dune",
    image:
      "https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Avatar",
    image:
      "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&w=800&q=80",
  },
];

const recommendedMovies = [
  {
    title: "Inception",
    image:
      "https://images.unsplash.com/photo-1685164754458-8f3a7cf87c76?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "The Dark Knight",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Memento",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Prestige",
    image:
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80",
  },
];

// Initialize YouTube Player
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video-player", {
    videoId: "YoHD9XEInc0",
    playerVars: {
      playsinline: 1,
      controls: 1,
      rel: 0,
    },
  });
}

// Handle play button click
document.getElementById("play-button").addEventListener("click", function () {
  document.getElementById("video-overlay").style.display = "none";
  player.playVideo();
});

// Create movie slide HTML
function createMovieSlide(movie) {
  return `
          <div class="swiper-slide">
              <div class="movie-slide">
                  <img src="${movie.image}" alt="${movie.title}">
                  <div class="movie-slide-overlay">
                      <div class="movie-slide-title">${movie.title}</div>
                  </div>
              </div>
          </div>
      `;
}

// Populate sliders with movies
function populateSlider(selector, movies) {
  const swiperWrapper = document.querySelector(`${selector} .swiper-wrapper`);
  movies.forEach((movie) => {
    swiperWrapper.innerHTML += createMovieSlide(movie);
  });
}

// Initialize sliders
document.addEventListener("DOMContentLoaded", function () {
  // Populate sliders
  populateSlider(".related-movies", relatedMovies);
  populateSlider(".recommended-movies", recommendedMovies);

  // Initialize Swiper
  const swiperOptions = {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  new Swiper(".related-movies", swiperOptions);
  new Swiper(".recommended-movies", swiperOptions);
});
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Xóa class "active" khỏi tất cả các nav-item
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Thêm class "active" vào nav-item được chọn
      this.classList.add("active");

      // Lấy ID của tab cần hiển thị
      const targetTab = this.getAttribute("data-tab");

      // Ẩn tất cả nội dung tab
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.style.display = "none";
      });

      // Hiển thị nội dung của tab được chọn
      const activeTab = document.getElementById(targetTab);
      if (activeTab) {
        activeTab.style.display = "block";
      }
    });
  });

  // Hiển thị tab mặc định (Dashboard)
  document.getElementById("dashboard").style.display = "block";
});
