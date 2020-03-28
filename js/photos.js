"use strict";

const createFlickrUrl = photo => {
  return (
    "https://farm" +
    photo.farm +
    ".staticflickr.com/" +
    photo.server +
    "/" +
    photo.id +
    "_" +
    photo.secret +
    ".jpg"
  );
};

const addToGallery = (url, caption, id) => {
  const gallery = document.getElementById("photoGallery");
  const img = document.createElement("img");
  img.className = "photo-item";
  img.src = url;
  img.alt = "Photo of " + caption;
  const a = document.createElement("a");
  a.href = "https://www.flickr.com/photos/declanbyrd/" + id;
  a.appendChild(img);
  gallery.appendChild(a);
};

const getPhotos = async () => {
  try {
    const res = await fetch("/.netlify/functions/fetch-photos");
    const photos = await res.json();

    photos.forEach(photo => {
      const url = createFlickrUrl(photo);
      addToGallery(url, photo.title, photo.id);
    });
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", getPhotos);
