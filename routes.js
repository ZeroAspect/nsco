const express = require("express")
const app = require("./config/config.js")
const hbs = require("express-handlebars")
const path = require("path")
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static files
app.engine("handlebars", hbs.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname + "/views"))

// Routes
app.get('/', async(req, res)=>{
  res.render('home')
})