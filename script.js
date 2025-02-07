document.addEventListener("DOMContentLoaded", function () {
    const imageWrapper = document.querySelector(".image-wrapper");
    const backgroundBlur = document.querySelector(".background-blur");
    const totalImages = 20; 
    let currentIndex = 0;
    let autoSlide;

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
    

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
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
    showImage(currentIndex);
    startAutoSlide();

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const titleBox = document.querySelector(".title-box")
    let inactivityTimeout;

    // Function to hide the buttons
    function hideButtons() {
        prevBtn.classList.add("hide-buttons");
        nextBtn.classList.add("hide-buttons");
        titleBox.classList.add("hide-buttons");
    }

    // Function to show the buttons
    function showButtons() {
        prevBtn.classList.remove("hide-buttons");
        nextBtn.classList.remove("hide-buttons");
        titleBox.classList.remove("hide-buttons");
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
});
