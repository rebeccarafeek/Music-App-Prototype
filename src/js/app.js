/**
 * WEB222 – Assignment 5
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Rebecca Rafeek
 *      Student ID: 168393239
 *      Date:       9 December 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

//function to create song cards
function createSongCard(song) {
  //creates card container
  let card = document.createElement("div");
  card.classList.add("card");

  let imageContainer = document.createElement("a");
  imageContainer.classList.add("image-container");
  imageContainer.href = song.link;
  imageContainer.target = "_blank";
  imageContainer.addEventListener("click", function () {
    window.open(song.link, "_blank");
  });

  let img = document.createElement("img");
  img.src = song.imageUrl;
  img.alt = song.title;
  img.classList.add("card-image");
  imageContainer.appendChild(img);
  card.appendChild(imageContainer);

  let title = document.createElement("h3");
  title.textContent = song.title;
  card.appendChild(title);

  let infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  let year = document.createElement("time");
  year.textContent = song.year;

  let duration = document.createElement("span");
  let minutes = Math.floor(song.length / 60);
  let seconds = song.length % 60;
  duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`; //rounds down to nearest int

  infoContainer.appendChild(year);
  infoContainer.appendChild(duration);
  card.appendChild(infoContainer);

  return card;
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

window.addEventListener("DOMContentLoaded", () => {
  // Get the menu element where the buttons will be added
  let menu = document.getElementById("menu");
  let selectedArtistElement = document.getElementById("selected-artist");
  let songsContainer = document.getElementById("song-cards");

  songsContainer.innerHTML = "";

  // Loop through all artists and create buttons
  artists.forEach((artist) => {
    let button = document.createElement("button");
    button.textContent = artist.name;
    button.addEventListener("click", () => showArtistDetails(artist));
    menu.appendChild(button);
  });

  // Function to show artist details
  function showArtistDetails(artist) {
    let artistLinks = artist.links
      .map((link) => `<a href="${link.url}" target="_blank">${link.displayName}</a>`)
      .join(", ");
    selectedArtistElement.innerHTML = `${artist.name} (${artistLinks})`;

    songsContainer.innerHTML = ""; //clears previous content

    // Display songs by filtering out the nonexplicit songs
    let artistSongs = songs.filter((song) => song.artistId === artist.artistId && !song.explicit);

    console.log({ artistSongs });

    //loops through the songs and displays in table
    artistSongs.forEach((song) => {
      let card = createSongCard(song);
      songsContainer.appendChild(card);
    });
  }

  let firstArtist = document.querySelector("#menu button");
  if (firstArtist) {
    firstArtist.click();
  }
});
