
import express from "express";
// import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import mongoose from "./config/database.js";
import './auth.js';
import loginRouter from './router/loginRouter.js'


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}
const app = express();
app.use(session({ secret: "cats" }))
app.use(passport.initialize());
app.use(passport.session())

app.use(bodyParser.json())
app.use('/bloguser', loginRouter)
app.get('/', (req, res) => {
    console.log("post method");
    res.send('<a href="/auth/google">Authenticate with Google</a>')
    // res.status(200).json({ message: "Wellcome Blogger" })
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
    const { email } = req.user.email;
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


