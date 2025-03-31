document.addEventListener("DOMContentLoaded", function () {
    // 🟢 Lấy danh sách phim
    const movieElements = document.querySelectorAll(".movie-display");

    movieElements.forEach((movieElement) => {
        const movieId = movieElement.getAttribute("data-series");

        if (!movieId || !moviesData[movieId]) {
            console.error(`❌ Không tìm thấy dữ liệu cho phim có ID: ${movieId}`);
            return;
        }

        const selectedMovie = moviesData[movieId];

        // Cập nhật nội dung phim vào HTML
        movieElement.querySelector(".movie-title").textContent = selectedMovie.title;
        movieElement.querySelector(".movie-categories").textContent = selectedMovie.genre.join(", ");
        movieElement.querySelector(".movie-bg").style.backgroundImage = `url('${selectedMovie.background1}')`;

        // Khi click vào phim, chuyển đến trang chi tiết
        movieElement.addEventListener("click", function () {
            window.location.href = `Movie-details-rental2.html?series=${movieId}`;
        });
    });

    console.log("✅ Cập nhật thành công danh sách phim!");

    // 🟢 Lấy ID phim từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("series");

    if (!movieId || !moviesData[movieId]) {
        console.error("❌ Không tìm thấy dữ liệu phim!");
        return;
    }

    const movie = moviesData[movieId];

    // 🟢 Cập nhật nội dung phim vào HTML
    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-rating").textContent = movie.rating;
    document.getElementById("movie-duration").textContent = movie.duration;
    document.getElementById("movie-year").textContent = movie.year;
    document.getElementById("movie-synopsis").textContent = movie.synopsis;
    document.getElementById("movie-director").textContent = movie.director;
    document.getElementById("movie-cast").textContent = movie.cast.join(", ");
    document.getElementById("movie-genre").textContent = movie.genre.join(", ");
    document.getElementById("movie-production").textContent = movie.production;

    // 🟢 Thay video bằng background
    const videoContainer = document.querySelector(".video-container");
    if (movie.background) {
        videoContainer.style.backgroundImage = `url('${movie.background}')`;
    } else {
        console.error("❌ Không tìm thấy hình nền `background`!");
    }

    // 🟢 Thêm background1 vào poster phim
    const moviePoster = document.getElementById("movie-poster");
    if (movie.background1) {
        moviePoster.src = movie.background1;
    } else {
        console.error("❌ Không tìm thấy hình nền `background1`!");
    }

    console.log("✅ Hiển thị thông tin phim thành công!");

    // ============================
    // 🟢 Cập nhật slider Top Rated
    // ============================

    const topMovies = Object.values(moviesData)
        .sort((a, b) => b.rating - a.rating) // Sắp xếp theo rating giảm dần
        .slice(0, 5); // Lấy 5 bộ phim đầu tiên

    updateMovieSlider(".related-movies .swiper-wrapper", topMovies);

    // ================================
    // 🟢 Cập nhật slider Recommended (ngẫu nhiên)
    // ================================

    const randomMovies = Object.values(moviesData)
        .sort(() => 0.5 - Math.random()) // Trộn danh sách ngẫu nhiên
        .slice(0, 5); // Lấy 5 phim bất kỳ

    updateMovieSlider(".recommended-movies .swiper-wrapper", randomMovies);

    // 🟢 Khởi tạo Swiper cho cả 2 slider
    initSwiper(".related-movies");
    initSwiper(".recommended-movies");

});

// ============================
// 🔄 Hàm cập nhật Slider phim
// ============================

function updateMovieSlider(wrapperSelector, movies) {
    const sliderWrapper = document.querySelector(wrapperSelector);
    if (!sliderWrapper) {
        console.error(`❌ Không tìm thấy slider: ${wrapperSelector}`);
        return;
    }

    sliderWrapper.innerHTML = ""; // Xóa dữ liệu cũ trước khi cập nhật

    movies.forEach(movie => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide", "movie-slide");
        slide.innerHTML = `
            <img src="${movie.background1}" alt="${movie.title}">
            <div class="movie-slide-overlay"></div>
            <div class="movie-slide-info">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.rating}</p>
                <p>${movie.genre.join(", ")}</p>
            </div>
        `;
        sliderWrapper.appendChild(slide);
    });

    console.log(`✅ Cập nhật slider: ${wrapperSelector}`);
}

// ============================
// 🛠️ Hàm khởi tạo Swiper
// ============================

function initSwiper(selector) {
    new Swiper(selector, {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    console.log(`✅ Khởi tạo Swiper cho: ${selector}`);
}
