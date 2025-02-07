document.addEventListener("DOMContentLoaded", function () {
    const imageWrapper = document.querySelector(".image-wrapper");
    const backgroundBlur = document.querySelector(".background-blur");
    const totalImages = 20; // Number of images
    let currentIndex = 0;

    // Dynamically create and insert images
    for (let i = 1; i <= totalImages; i++) {
        let img = document.createElement("img");
        img.src = `images/image${i}.jpeg`; // Adjust path if needed
        if (i === 1) img.classList.add("active"); // First image is active
        imageWrapper.appendChild(img);
    }

    const images = document.querySelectorAll(".image-wrapper img");

    function showImage(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");

        // Update background with active image
        backgroundBlur.style.backgroundImage = `url('${images[index].src}')`;
    }

    document.querySelector(".next-btn").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    });

    document.querySelector(".prev-btn").addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    });

    // Initialize first image
    showImage(currentIndex);
});
