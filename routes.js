const express = require("express")
const app = require("./config/config.js")

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', async(req, res)=>{
  res.send("Hello World!")
})