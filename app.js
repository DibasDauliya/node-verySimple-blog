const express = require('express'),
      bodyParser = require('body-parser'),
      ejs = require('ejs'),
      _ = require('lodash')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))


app.set('view engine', 'ejs')

app.use(express.static('public'))


const posts = []

const homePage = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat amet inventore accusamus quibusdam, veniam iste. Lorem ipsum dolor sit amet consectetur adipisicing.'

const aboutPage = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum exercitationem illum est nobis optio et modi incidunt quas autem, ipsum at sed, eveniet architecto, repellendus culpa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deleniti inventore labore saepe ea. Nisi minus reiciendis in!'

const contactPage = 'Porro corrupti non saepe, soluta hic et! Sit, similique, facere cum eveniet neque facilis hic consequuntur quam libero aut reprehenderit consequatur eaque repellat corrupti! Corrupti velit nemo accusamus consequatur nam voluptatibus aliquam tempore, quidem minima numquam quo in itaque! Velit, explicabo libero.'

app.get('/', (req, res) => {
    res.render('main', {posts, pageContent: homePage});
})

app.get('/about', (req, res) => {
    res.render('about', {pageTitle: 'About', pageContent: aboutPage});
})

app.get('/contact', (req, res) => {
    res.render('contact', {pageTitle: 'Contact', pageContent: contactPage});
})

app.get('/compose', (req, res) => {
    res.render('compose');
})

app.get('/posts/:name', (req, res) => {
    posts.forEach(post => {
        if(_.lowerCase(req.params.name) === _.lowerCase(post.title)) {

            res.render('post', {postTitle: post.title, postBody: post.body})

        } 
    })
})

// POST req from compose
app.post('/compose', (req, res) => {

    const post = {title: req.body.postTitle, body: req.body.postBody}
    posts.push(post)
    res.redirect('/')
})

app.listen(3000, () => console.log('Server is running in port 3000.'))