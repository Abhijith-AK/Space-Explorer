const apiKey = 'tLchwqkGNgTVfHC32f3VEEDuOlrJldtirfZA9bfP';
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');

// Function to fetch NASA images with a search query
function fetchImages(searchQuery = "space") {
    const nasaAPI = `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`;

    fetch(nasaAPI)
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = ''; // Clear the gallery before adding new images
            data.collection.items.slice(0, 30).forEach(item => {
                const image = item.links[0].href;
                const title = item.data[0].title || "No Title Available";
                const description = item.data[0].description || "No Description Available";

                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.alt = title;
                imgElement.classList.add("gallery-img");

                // When an image is clicked, open the modal with full view, title, and description
                imgElement.onclick = function () {
                    const modal = document.getElementById("imageModal");
                    const modalImg = document.getElementById("modalImage");
                    const captionText = document.getElementById("caption");

                    modal.style.display = "block";
                    modalImg.src = this.src;
                    captionText.innerHTML = `<strong>${title}</strong><br>${description}`;
                };

                gallery.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Initial call with a default search term
fetchImages();

// Search functionality
function searchImages() {
    const searchQuery = searchInput.value;
    fetchImages(searchQuery);
}

// Modal handling
const modal = document.getElementById("imageModal");
const closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function() {
    modal.style.display = "none";
};
