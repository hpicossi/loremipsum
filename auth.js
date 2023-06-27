const password = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const passport = require('passport');

passport.use(
    new localStorage(async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { name: username}});

            if(!user){
                return done(null, false, { message: 'Incorrect username.'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if(!passwordMatch){
                return done(null, false, { message: 'Incorrect password.'});
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});