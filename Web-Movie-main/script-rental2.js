document.addEventListener("DOMContentLoaded", function () {
    // 🟢 Lấy danh sách phim
    const movieElements = document.querySelectorAll(".movie-display");

    if (typeof moviesData === "undefined") {
        console.error("❌ moviesData chưa được định nghĩa!");
        return;
    }

    movieElements.forEach((movieElement) => {
        const movieId = movieElement.getAttribute("data-series");
        if (!movieId || !moviesData[movieId]) {
            console.error(`❌ Không tìm thấy dữ liệu cho phim có ID: ${movieId}`);
            return;
        }

        const selectedMovie = moviesData[movieId];
        
        if (movieElement.querySelector(".movie-title")) {
            movieElement.querySelector(".movie-title").textContent = selectedMovie.title;
        }
        if (movieElement.querySelector(".movie-categories")) {
            movieElement.querySelector(".movie-categories").textContent = selectedMovie.genre.join(", ");
        }
        if (movieElement.querySelector(".movie-bg")) {
            movieElement.querySelector(".movie-bg").style.backgroundImage = `url('${selectedMovie.background1}')`;
        }

        movieElement.addEventListener("click", function () {
            window.location.href = `Movie-details-rental2.html?series=${movieId}`;
        });
    });

    console.log("✅ Cập nhật danh sách phim!");

    // 🟢 Kiểm tra trang chi tiết phim
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("series");

    if (movieId && moviesData[movieId]) {
        const movie = moviesData[movieId];

        const updateText = (id, text) => {
            const element = document.getElementById(id);
            if (element) element.textContent = text;
        };

        updateText("movie-title", movie.title);
        updateText("movie-rating", movie.rating);
        updateText("movie-duration", movie.duration);
        updateText("movie-year", movie.year);
        updateText("movie-synopsis", movie.synopsis);
        updateText("movie-director", movie.director);
        updateText("movie-cast", movie.cast.join(", "));
        updateText("movie-genre", movie.genre.join(", "));
        updateText("movie-production", movie.production);

        const videoContainer = document.querySelector(".video-container");
        if (videoContainer && movie.background) {
            videoContainer.style.backgroundImage = `url('${movie.background}')`;
        }

        const moviePoster = document.getElementById("movie-poster");
        if (moviePoster && movie.background1) {
            moviePoster.src = movie.background1;
        }

        console.log("✅ Hiển thị thông tin phim thành công!");
    }

    // ============================
    // 🟢 Cập nhật slider phim
    // ============================
    const updateMovieSlider = (wrapperSelector, movies) => {
        const sliderWrapper = document.querySelector(wrapperSelector);
        if (!sliderWrapper) return;

        sliderWrapper.innerHTML = "";
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
    };

    if (document.querySelector(".related-movies .swiper-wrapper")) {
        const topMovies = Object.values(moviesData).sort((a, b) => b.rating - a.rating).slice(0, 5);
        updateMovieSlider(".related-movies .swiper-wrapper", topMovies);
    }

    if (document.querySelector(".recommended-movies .swiper-wrapper")) {
        const randomMovies = Object.values(moviesData).sort(() => 0.5 - Math.random()).slice(0, 5);
        updateMovieSlider(".recommended-movies .swiper-wrapper", randomMovies);
    }

    const initSwiper = (selector) => {
        if (!document.querySelector(selector)) return;
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
    };

    initSwiper(".related-movies");
    initSwiper(".recommended-movies");
});
