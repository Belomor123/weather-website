//Fetch API can only run on client side scripts cuz it uses browser API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data)=> {
//     console.log(data)
//   })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageP = document.getElementById('messageP')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messageP.textContent = 'Processing Your Request' 
  fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageP.textContent = data.error
      } else {
        messageP.innerHTML = data.weather + '<br>Current Temperature: ' + data.temperature + '<br>Feels Like: ' + data.feelsLike + '<br>Location: ' + data.location
      }
    })
  })
})
