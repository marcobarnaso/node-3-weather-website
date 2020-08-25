const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#location')
const message2 = document.querySelector('#forecast')
const weatherImg = document.querySelector('#weatherImg')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locationInput = search.value
    message1.textContent = ''
    message2.textContent = 'Loading...'
    
    fetch('/weather?address=' + encodeURIComponent(locationInput)).then((response) => {
        response.json().then(({ error, location, forecast, weather_icons }) => {
            console.log(forecast)
            if (error) {
               return message2.textContent = error
            }
            weatherImg.src = weather_icons
            message1.textContent = location
            message2.textContent = forecast
        })
    })
})