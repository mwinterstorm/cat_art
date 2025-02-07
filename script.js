document.addEventListener("DOMContentLoaded", function () {
    const totalImages = 21;
    
    const historyLimit = totalImages - 1; // Adjust this value to change the history limit
    const imageHistory = new Array(); // Array to store image history
    const imageWrapper = document.querySelector(".image-wrapper");
    const backgroundBlur = document.querySelector(".background-blur");
    let currentIndex = 0;
    let autoSlide;

    // PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('service-worker.js')
          .then(function(registration) {
              console.log('Service Worker registered');
            })
          .catch(function(error) {
              console.log('Service Worker registration failed:', error);
            });
        });
      }

    // Create images dynamically
    for (let i = 1; i <= totalImages; i++) {
        let img = document.createElement("img");
        img.src = `images/image${i}.jpeg`;
        if (i === 1) img.classList.add("active"); // Only first image is visible initially
        imageWrapper.appendChild(img);
    }

    const images = document.querySelectorAll(".image-wrapper img");

    function showImage(index) {
        if (!images || images.length === 0) return; // Ensure images exist

        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");

        let indexblur = index
        // Ensure background updates properly
        if (backgroundBlur) {
            backgroundBlur.style.opacity = "0";
            setTimeout(() => {
                backgroundBlur.style.backgroundImage = `url('${images[indexblur].src}')`;
                backgroundBlur.style.opacity = "1";
            }, 300);
        }
    }

    let previousIndex = null; // Variable to store the previous index

    function nextImage() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * totalImages);
        } while (imageHistory.includes(newIndex)); // Check if newIndex is in the history
    
        // Add the current index to the history
        imageHistory.push(currentIndex);
    
        // Keep the history limited to the last 'historyLimit' images
        if (imageHistory.length > historyLimit) {
            imageHistory.shift(); // Remove the oldest entry
        }
    
        currentIndex = newIndex;
        showImage(currentIndex);
    }

    function prevImage() {
        if (imageHistory.length > 0) {
            currentIndex = imageHistory.pop(); // Get the last image from history
            showImage(currentIndex);
        }
    }

    document.querySelector(".next-btn").addEventListener("click", function () {
        clearInterval(autoSlide);
        nextImage();
        startAutoSlide();
    });

    document.querySelector(".prev-btn").addEventListener("click", function () {
        clearInterval(autoSlide);
        prevImage();
        startAutoSlide();
    });

    function startAutoSlide() {
        autoSlide = setInterval(nextImage, 4000); // Change every 4s
    }

    // Initialize carousel
    nextImage();
    startAutoSlide();

    //pause button
    const pauseBtn = document.querySelector(".pause-btn");
    let isPaused = false;

    function startAutoSlide() {
        autoSlide = setInterval(nextImage, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    pauseBtn.addEventListener("click", function () {
        if (isPaused) {
            startAutoSlide();
            pauseBtn.textContent = "Pause";
        } else {
            stopAutoSlide();
            togglePause(true);
            pauseBtn.textContent = "Resume";
        }
        isPaused = !isPaused;
        togglePause(false)
    });

    //show / hide elements 
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const titleBox = document.querySelector(".title-box")
    const legalBox = document.querySelector(".legal")
    let inactivityTimeout;

    async function toggleTitle(show) {
        if (show == true) {
            titleBox.classList.remove("hide-title");
            titleBox.classList.add("show-title");
        } else {
            await new Promise(resolve => setTimeout(resolve, 1600));
            titleBox.classList.remove("show-title");
            titleBox.classList.add("hide-title");
        }
    }

    async function toggleLegal(show) {
        if (show == true) {
            legalBox.classList.remove("hide-legal");
            legalBox.classList.add("show-legal");
        } else {
            await new Promise(resolve => setTimeout(resolve, 13000));
            titleBox.classList.remove("show-legal");
            legalBox.classList.add("hide-legal");
        }
    }

    function togglePause(show) {
        if (show == true) {
            pauseBtn.classList.remove("hide-buttons")
        } else { 
            if (isPaused == false) {
                pauseBtn.classList.add("hide-buttons")
            } 
        }
    }

    // Function to hide the buttons
    function hideButtons() {
        prevBtn.classList.add("hide-buttons");
        nextBtn.classList.add("hide-buttons");
        togglePause(false);
        toggleTitle(false);
        toggleLegal(false);
    }

    // Function to show the buttons
    function showButtons() {
        prevBtn.classList.remove("hide-buttons");
        nextBtn.classList.remove("hide-buttons");
        togglePause(true);
        toggleTitle(false);
        toggleLegal(true);
    }

    // Event listener for mouse movement
    document.addEventListener("mousemove", function () {
        showButtons(); // Show buttons immediately on mousemove
        clearTimeout(inactivityTimeout); // Clear any existing timeout

        // Set a new timeout to hide buttons after inactivity
        inactivityTimeout = setTimeout(hideButtons, 2600); // 2 seconds
    });

    // Initial state: Hide buttons after a delay
    inactivityTimeout = setTimeout(hideButtons, 2600);

    // stop rightclick - to stop causal stealing of images
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.querySelector(".copyright").addEventListener("click", function () {
        toggleTitle(true)
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", function (event) {
        if (event.key === " ") { // Spacebar for pause/resume
            event.preventDefault(); // Prevent default spacebar behavior (scrolling)
            pauseBtn.click(); // Simulate a click on the pause button
        } else if (event.key === "ArrowLeft") { // Left arrow for previous
            document.querySelector(".prev-btn").click();
        } else if (event.key === "ArrowRight") { // Right arrow for next
            document.querySelector(".next-btn").click();
        }
    });
});
