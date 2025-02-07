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
    
        console.log("Showing image:", images[index].src); // Debugging
    
        // Ensure background updates properly
        if (backgroundBlur) {
            backgroundBlur.style.opacity = "0";
            setTimeout(() => {
                backgroundBlur.style.backgroundImage = `url('${images[index].src}')`;
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
});
