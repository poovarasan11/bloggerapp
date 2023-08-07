
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import bodyParser from "body-parser";
import './auth.js';

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}
const app = express();
app.use(session({ secret: "cats" }))
app.use(passport.initialize());
app.use(passport.session())

app.use(bodyParser.json())

// const auth = require('./auth')
// require('./auth')


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));

app.get('/', (req, res) => {
    console.log("post method");
    res.send('<a href="/auth/google">Authenticate with Google</a>')
    // res.status(200).json({ message: "Wellcome Quiz" })
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
}))

app.get('/auth/failure', (req, res) => {
    res.send('Something went wroing..')
})

app.get('/protected', isLoggedIn, (req, res) => {
    // console.log("reqqqq", req.user)

    res.send(`Hello ${req.user.displayName}`)
})



app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy((err) => res.redirect('/'))
        // res.redirect('/');
    });
});


// app.post('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy((err) => res.redirect('/'));
// });


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server port..${PORT} `)
})

console.log("check")






















// import express from "express";
// import mongoose from "mongoose";

// import bodyParser from "body-parser";
// const app = express();
// app.use(bodyParser.json())



// mongoose.connect('mongodb://127.0.0.1:27017/test')
//     .then(() => console.log('Connected!'));




// const Schema = mongoose.Schema;
// const mySchema = new Schema({
//     userName: { type: String, },
//     email: { type: String, },
//     password: { type: String, },
// });
// const MyModel = mongoose.model('tests', mySchema);



// app.post('/register', async (req, res) => {
//     console.log("data", req.body)
//     const { userName, email, password } = req.body
//     const newUser = new MyModel({ userName, email, password })
//     if (!newUser) {
//         await newUser.save()
//         res.status(200).json({ message: "register created!" })
//     } else {
//         res.status(500).json({ message: "internall error!" })

//     }
// })




// app.post('/', (req, res) => {
//     console.log("post method");
//     res.status(200).json({ message: "Wellcome Quiz" })
// })




// const PORT = 6000
// app.listen(PORT, () => {
//     console.log(`Server port..${PORT} `)
// })


// console.log("check")















// const express = require('express')
// const app = express()

// app.get('/get', function (req, res) {
//     res.send('Hello World')
//     console.log("get method")
// })

// app.listen(3000, () => {
//     console.log("server port..3000")
// })
