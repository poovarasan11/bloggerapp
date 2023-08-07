// const passport = require('passport');/
import passport from 'passport';
import passport_google_oauth2 from 'passport-google-oauth2';
const GoogleStrategy = passport_google_oauth2.Strategy
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "27098971126-67dfn08rj8k6d1capqmvt23e4q6nnvn6.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

// console.log('GoogleStrategy ', GoogleStrategy)

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        // console.log('request', request)
        // console.log('accessToken:::', accessToken)
        // console.log('refreshToken::::', refreshToken)
        // console.log('done::::', done)

        console.log("checkkk", profile.email)
        return done(null, profile);

        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})