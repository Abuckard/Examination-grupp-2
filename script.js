const apiKey = "d5a8b95a199a41d6e05051401fc657a9"
let form = document.getElementById("search-form")
let text = document.getElementById("search-input").value
let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${text}&format=json&nojsoncallback=1`
const imageDiv = document.getElementById("image-container")

console.log("text", text)

function fetchImages() {

  let text = document.getElementById("search-input").value;
  let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${text}&format=json&nojsoncallback=1`

  fetch(url)
  .then(response => response.json())
  .then(data => {

    let images = data.photos.photo.slice(0, 8)
    console.log(images)
  
    let imagesHtml = ``
  
    images.forEach(img => {
      const farmId = img.farm
      const serverId = img.server
      const id = img.id
      const secret = img.secret
      
      const imageUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_w.jpg`
      console.log("MIN BILD", imageUrl)
      imagesHtml += `<img src="${imageUrl}" class="image">`
      
    })
      imageDiv.innerHTML = imagesHtml
      const lightbox = document.createElement('div')
  lightbox.id = 'lightbox'
  document.body.appendChild(lightbox)

  const imagesTest = document.querySelectorAll('img')
  imagesTest.forEach(bild => {
    bild.addEventListener('click', e => {
      lightbox.classList.add('active')
      const img = document.createElement('img')
      img.src = bild.src
      img.classList.add('lightbox-img')
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild)
      }
      lightbox.appendChild(img)
    })
  })
  lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) 
    return
    lightbox.classList.remove('active')
  })
  
  })
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  text = document.getElementById("search-input").value;
  fetchImages();
})

console.log("BANAN")





/* const flickrKey = "5fc6b50d209c89a01df0bac5c1860aac";
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

fetchImages(); */

/* form.addEventListener("submit", function (event) {
  event.preventDefault();
  text = document.getElementById("search-input").value;
  fetchImages();
}); */

/* function openModal() {
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
 */