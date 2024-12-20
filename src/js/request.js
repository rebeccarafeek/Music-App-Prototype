document.addEventListener("DOMContentLoaded", () => {
    const addSongLinkBtn = document.getElementById("add-song-link");
    const songLinksDiv = document.getElementById("song-links");

    addSongLinkBtn.addEventListener("click", () => {
        const newInput = document.createElement("input");
        newInput.type = "url";
        newInput.name = "song-links[]";
        newInput.placeholder = "Add a song/video link";
        newInput.required = true;
        songLinksDiv.appendChild(newInput);
    });

    const form = document.getElementById("artist-request-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            alert("Form submitted successfully! Here's the response: " + JSON.stringify(result, null, 2));
            form.reset();
        } catch (error) {
            alert("An error occurred while submitting the form. Please try again later.");
            console.error("Error:", error);
        }
    });
});