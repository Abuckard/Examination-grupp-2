const flickrKey = "5fc6b50d209c89a01df0bac5c1860aac";
const baseUrl = `https://api.flickr.com/services/rest`;
const method = "flickr.photos.search";
let pictures = document.getElementById("images-result");
let form = document.getElementById("search-form");
let text = document.getElementById("search-input").value;
let imgSize = "m";
let imageElement = document.querySelector('#images-result');

function fetchImages() {
  
  const mainUrl = `${baseUrl}?api_key=${flickrKey}&method=${method}&text=${text}&per_page=8&format=json&nojsoncallback=1`;
  fetch(mainUrl)
    .then((response) => response.json())
    .then((data) => {
      let imgUrls = [];
      data.photos.photo.forEach((img) => {
        let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
        imgUrls.push(imgUrl);
      });

      for (let i = 1; i <= imgUrls.length; i++) {
        if (imgUrls[i - 1]) {
          let imageElement = document.querySelector(`#images-result-${i}`);
          imageElement.src = imgUrls[i - 1];
        } else {
          console.log(`Bild ${i} kunde inte laddas`);
          
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

fetchImages();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  text = document.getElementById("search-input").value;
  fetchImages();
});

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}
