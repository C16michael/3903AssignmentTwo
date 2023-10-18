//Cristiano Michael
// Wait for the HTML document to be fully loaded and parsed before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Get references to various HTML elements by their IDs
    const widthInput = document.getElementById("width"); // Input for image width
    const heightInput = document.getElementById("height"); // Input for image height
    const grayscaleCheckbox = document.getElementById("grayscale"); // Checkbox for grayscale
    const loadImageButton = document.getElementById("loadImage"); // Button to load image
    const image = document.getElementById("image"); // Image element to display the loaded image

    // Add a click event listener to the "Load Image" button
    loadImageButton.addEventListener("click", function () {
        // Get the user-specified width, height, and grayscale settings
        const width = widthInput.value;
        const height = heightInput.value;
        const grayscale = grayscaleCheckbox.checked;

        // Construct the image URL based on user input
        const imageUrl = `https://picsum.photos/${width}/${height}?${grayscale ? "grayscale" : ""}`;

        // Fetch the random image using the constructed URL
        fetch(imageUrl)
            .then((response) => {
                // Check if the HTTP response is successful
                if (response.ok) {
                    // Convert the response to a Blob (binary data)
                    return response.blob();
                } else {
                    throw new Error("Failed to load image"); // Throw an error if the response is not successful
                }
            })
            .then((imageBlob) => {
                // Create an object URL for the image blob, which can be used to display the image
                const imageUrl = URL.createObjectURL(imageBlob);

                // Set the 'src' attribute of the image element to the generated object URL
                image.src = imageUrl;
            })
            .catch((error) => {
                // Handle any errors that may occur during the image loading process
                console.error(error);
            });
    });
});
