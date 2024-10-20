const express = require("express")
const app = require("./config/config.js")
const hbs = require("express-handlebars")
const path = require("path")
const User = require("./users/getUser.js")
const GetIP = require("./infra/ip.js")
const { marked } = require("marked")
const Post = require("./post/Post.js")
const db = require("./sequelize/sequelize.js")
const MySQL = require("./db/initial-db.js")
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static files
app.engine("handlebars", hbs.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname + "/views"))

// Routes
app.get('/', async(req, res)=>{
  const mysql = await MySQL()
  const ip = await GetIP()
  console.log(ip)
  try{
    const user = await User.findOne({
      where: {
        ip: ip.ip
      }
    })
    if(user === null){
      res.redirect('/login')
    } else{
      const [ posts, rows ] = await mysql.query(`SELECT * FROM Posts ORDER BY post_like DESC`)
      console.log(posts)
      res.render('home', { posts })
    }
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.get('/login', async(req, res)=>{
  const ip = await GetIP()
  try{
    const user = await User.findOne({
      where: {
        ip: ip.ip
      }
    })
    if(user === null){
      res.render('login')
    }else{
      res.redirect('/')
    }
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.post('/login', async(req, res)=>{
  const ip = await GetIP()
  const { email, senha } = req.body
  console.log(email, senha)
  try{
    const user = await User.findOne({
      where: {
        email: email,
        email: senha
      }
    })
    if(user === null){
      const error = `
      <div class="alert alert-warning" role="alert">
    <h4 class="alert-heading">Cuidado!</h4>
    <p>Tem algum caractere incorreto nas informações apresentadas.</p>
    <hr>
    <p class="mb-0">Nós nunca compartilharemos suas informações com mais ninguém.</p>
  </div>`
      res.render('login', { error })
    } else{
      const update = await User.update({
        ip: ip.ip
      },
      {
        where: {
          email: email,
          senha: senha
        }
      })
      res.redirect('/')
    }
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.get('/cadastrar', async(req, res)=>{
  const ip = await GetIP()
  try{
    const user = await User.findOne({
      where: {
        ip: ip.ip
      }
    })
    if(user === null){
      res.render('cadastrar')
    } else{
      res.redirect('/')
    }
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.post('/cadastrar', async(req, res)=>{
  const ip = await GetIP()
  const { nome, email, senha, bio } = req.body
  console.log(nome, email, senha)
  try{
    const deleteSpaces = nome.replace(' ', '')
    const formatUsername = deleteSpaces.toLowerCase()
    const user = await User.create({
      nome: formatUsername,
      email: email,
      senha: senha,
      bio: marked(bio),
      ip: ip.ip
    })
    console.log(user)
    res.redirect('/')
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.get('/publicar', async(req, res)=>{
  const ip = await GetIP()
  try{
    const user = await User.findOne({
      where: {
        ip: ip.ip
      }
    })
    if(user === null){
      res.redirect('/login')
    } else{
      res.render('publicar')
    }
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.get('/publicar/conteudo', async(req, res)=>{
  const ip = await GetIP()
  try{
    const user = await User.findOne({
      where: {
        ip: ip.ip
      }
    })
    if(user === null){
      res.redirect('/login')
    } else{
      res.render('publicar/conteudo', { user: user['nome'] })
    }
  } catch(error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})
app.post('/publicar/conteudo', async(req, res)=>{
  const ip = await GetIP()
  const { titulo, conteudo, fonte } = req.body
  console.log(titulo, conteudo)
  const user = await User.findOne({
    where: {
      ip: ip.ip
    }
  })
  try {
    if(user === null){
      res.redirect('/login')
    } else{
      const post = await Post.create({
        nome: user['nome'],
        titulo: titulo,
        conteudo: marked(conteudo),
        fonte: fonte,
        // post_like: '0'
      })
      console.log(post)
      res.redirect('/')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})