const flickrKey = "5fc6b50d209c89a01df0bac5c1860aac"
const baseUrl = `https://api.flickr.com/services/rest`
const method = "flickr.photos.search";
let pictures = document.getElementById("images-result")
let form = document.getElementById('search-form')
let text = document.getElementById('search-input').value;
let imgSize = "m"



function fetchImages() {
    pictures.innerHTML = '';
    const mainUrl = `${baseUrl}?api_key=${flickrKey}&method=${method}&text=${text}&per_page=20&format=json&nojsoncallback=1`
    fetch(mainUrl)
      .then((response) => response.json())
      .then((data) => {
        data.photos.photo.forEach((img) => {
          let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`
          console.log(imgUrl);
          pictures.innerHTML += '<img src="' + imgUrl + '">';
        });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }
  
  fetchImages();

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    text = document.getElementById('search-input').value;
    fetchImages();
  });