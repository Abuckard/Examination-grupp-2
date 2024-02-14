const apiKey = "d5a8b95a199a41d6e05051401fc657a9"
let form = document.getElementById("search-form")
let text = document.getElementById("search-input").value
let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${text}&sort=relevance&format=json&nojsoncallback=1`
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
      const imageUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_c.jpg`
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