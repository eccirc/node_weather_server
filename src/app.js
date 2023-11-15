const path = require("path")
const express = require("express")
const hbs = require("hbs")

const { geolocation } = require("./utils/geolocation")
const { forecast } = require("./utils/weather")


const app = express()
//define paths
const publicDir = path.join(__dirname, "../public")
const viewsDir = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
//handlebars config
app.set("view engine", "hbs")
app.set("views", viewsDir)
hbs.registerPartials(partialsPath)
//express settings
app.use(express.static(publicDir))

const routesArr = (authorName) => { 
    return [
    {
    route: "/",
    file: "index",
    content: {
        title: "Weather",
        authorName,
        },
    },
    {
    route: "/about",
    file: "about",
    content: {
        title: "About",
        authorName,
        src: "./images/me&bike_hc.jpg"
        },
    },
    {
    route: "/help",
    file: "help",
    content: {
        title: "Help",
        message: "You are seeing a help message!",
        authorName,
        },
    },
    {
    route: "/help/*",
    file: "404",
    content: {
        title: "Not found",
        message: "Sorry, no help articles",
        link:{ path: "/help", name: "help" },
        authorName,
        },
    },
    {
    route: "/*",
    file: "404",
    content: {
        title: "Not found",
        link: { path: "/", name: "home" },
        message: "Sorry, there's nothing to see here!",
        authorName,
        },
    }
]
}

app.get("/products", (req, res) => {
    console.log(req.query)
    if(!req.query){
        return res.send({
            error: "You must provide a query parameter."
        })
    }
    console.log(req.query)
    return res.send({
        products: []
    })
})

app.get("/weather", (req, res) => {
    const { address = null } = req.query;
    if(!address){
        return res.send({
            error: "You must provide an address!"
        })
    }
    geolocation(address, (error, { latitude, longitude } = {}) => {
        if(error){
           return res.send({error})
        }
        if(!latitude || !longitude){ return res.send({ error: "Invalid coords" }) 
        } else {
            forecast(latitude, longitude, (error, weatherData) => {
                if(error){ return res.send({ error: "Error fetching weather data, " + error }) }
                res.send({
                    latitude,
                    longitude,
                    ...weatherData,
                })
            })
        }
    })
    console.log(req.query.address)
})

routesArr("David 2023").forEach(route => {
    app.get(route.route, (req, res) => {
        res.render(route.file, route.content)
    })
})





app.listen(3000, () => {
    console.log("listening on port 3000")
})