console.log("client side!");

const title = document.getElementById("main_title")

// let i = 0;
// let sinCount = 0;
// setInterval(() => {
//     i += 0.01;
//     sinCount = Math.ceil((Math.sin(i) + 1) * 100);
//     title.style.color = `rgb(${255 - sinCount} , ${Math.ceil(i % 255)} , ${255 - sinCount})`
// }, 10);


const getWeatherOnClick = (address, callback) => {
    fetch(`http://localhost:3000/weather?address=${address}`, {
    "Access-Control-Allow-Origin": true
    }).then(res => {
    res.json().then(data => {
        return callback({...data});
    })
})
}

const weatherForm = document.querySelector("form")
const searchBar = document.getElementById("search-bar")
const weatherSection = document.getElementById("weather-data")
const errorSection = document.getElementById("error")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    weatherSection.textContent = "Loading..."
    getWeatherOnClick(searchBar.value, (data) => {
        if(data.error){
            errorSection.textContent = data.error
            weatherSection.textContent = ""
        } else {
            errorSection.textContent = ""
            weatherSection.textContent = ""
            const innerPre = document.createElement("pre")
            const weatherImage = document.createElement("img")
            weatherImage.src = data?.current?.weather_icons ? data.current.weather_icons[0] : ""
            innerPre.innerHTML = JSON.stringify(data,  null, 2)
            weatherSection.appendChild(weatherImage)
            weatherSection.appendChild(innerPre)
        }
    })
})

