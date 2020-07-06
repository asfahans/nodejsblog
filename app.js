const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://asfahan:test1234@nodejs.ke3ei.mongodb.net/nodejs?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000))
    //.then((result) => app.listen(3000))
    .catch(err => console.log(err));

// register View engine using EJS which has a great support with express
// EJS will look into the default folder of "views"
app.set('view engine', 'ejs')
// app.set('views', 'myviews') to change the default folder 'views' to 'myviews'

// Middleware & Static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))  // need this line for form submission

//Listen for requests
//app.listen(3000);

// // mongoose and mongo sandbox routes
// // add to the database
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({ // using model of Blog we are creating instance which we exported
//         title: 'New Blog 3',
//         snippet: 'About my new blog 3',
//         body: 'more about my new blog 3'
//     }) 

//     blog.save() // we have to save the model to the database
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err)
//     })
// });

// //retrive from the database
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// });

// //retrive a single record based on id from the database
// app.get('/single-blog', (req, res) => {
//     Blog.findById('5f02db1188cba13418c7d9c1')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// });


app.use((req, res, next) => {
    console.log('First Middleware')
    next();
})

app.get('/', (req, res) => {
    //res.send('<p>Home Page</p>')
    //res.sendFile('./views/index.html', { root: __dirname });
    res.redirect('/blogs')
})

app.use((req, res, next) => {
    console.log('Second Middleware')
    next()
})

app.get('/about', (req, res) => {
    //res.send('<p>Home Page</p>')
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs', blogRoutes);

// redirect
/*app.get('/about-us', (req, res) => {
    //res.send('<p>Home Page</p>')
    res.redirect('/about');
})*/

// 404 page USE THIS FUNCTION FOR EVERY INCOMING REQUEST WHEN NON OF THE CONDITION ABOVE MEETS
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404 - Page not found' })
})