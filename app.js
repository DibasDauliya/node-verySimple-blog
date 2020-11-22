const express = require('express'),
  bodyParser = require('body-parser'),
  ejs = require('ejs'),
  _ = require('lodash'),
  mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.static('public'))

// mongoose
mongoose.connect('mongodb://localhost/postDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const postSchema = new mongoose.Schema({
  title: String,
  body: String
})

const Post = mongoose.model('Post', postSchema)

// const posts = []

const homePage =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat amet inventore accusamus quibusdam, veniam iste. Lorem ipsum dolor sit amet consectetur adipisicing.'

const aboutPage =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum exercitationem illum est nobis optio et modi incidunt quas autem, ipsum at sed, eveniet architecto, repellendus culpa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti inventore labore saepe ea. Nisi minus reiciendis in!'

const contactPage =
  'Porro corrupti non saepe, soluta hic et! Sit, similique, facere cum eveniet neque facilis hic consequuntur quam libero aut reprehenderit consequatur eaque repellat corrupti! Corrupti velit nemo accusamus consequatur nam voluptatibus aliquam tempore, quidem minima numquam quo in itaque! Velit, explicabo libero.'

app.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (!err) {
      res.render('main', { posts, pageContent: homePage })
    }
  })
})

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About', pageContent: aboutPage })
})

app.get('/contact', (req, res) => {
  res.render('contact', { pageTitle: 'Contact', pageContent: contactPage })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.get('/posts/:name', (req, res) => {
  const paramName = req.params.name

  //   Post.findOne({ title: paramName }, (err, found) => {
  //     if (paramName === found.title) {
  //       res.render('post', { postTitle: found.title, postBody: found.body })
  //     }
  //   }).catch(console.log('ee'))

  Post.find((err, posts) => {
    if (!err) {
      posts.forEach((post) => {
        if (_.lowerCase(post.title) === _.lowerCase(paramName)) {
          res.render('post', { postTitle: post.title, postBody: post.body })
        }
      })
    }
  })
})

//  throw
// return

// POST req from compose
app.post('/compose', (req, res) => {
  const post = { title: req.body.postTitle, body: req.body.postBody }

  const postOne = Post({
    title: post.title,
    body: post.body
  })

  postOne.save()

  //   posts.push(postOne)
  res.redirect('/')
})

app.listen(3000, () => console.log('Server is running in port 3000.'))
