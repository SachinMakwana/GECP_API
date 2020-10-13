const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

exports.create = (req, res) => {
    if (!(req.body.username || req.body.password || req.body.role)) {
        return res.status(400).send({
            message: "Please Fill up Users Detailsnpm"
        });
    }
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    users.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

const refreshTokens = {};
const SECRET = 'VERY_SECRET_KEY!';
const passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
};

passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) {
        return done(null, false);
    }
    done(null, jwtPayload);
}))

passport.serializeUser(function (user, done) {
    done(null, user.username)
});

exports.find = (req, res) => {
    if (!(req.body.username || req.body.password)) {
        return res.status(400).send({
            message: "Please Fill up Users Details"
        });
    }

    Users.find({ $and: [{ username: req.body.username }, { password: req.body.password }] })
        .then(data => {
            if (data.length > 0) {
                const user = {
                    'username': data[0]['username'],
                    'role': data[0]['role']
                };

                const token = jwt.sign(user, SECRET, { expiresIn: "24H" })
                const refreshToken = randtoken.uid(256);
                refreshTokens[refreshToken] = req.body.username;
                res.json({ jwt: token, refreshToken: refreshToken, user: user });
            }
            else {
                res.status(500).send({ message: "Data Not Found" });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.logout = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken];
    }
    res.sendStatus(204);
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken in refreshTokens) {
        const user = {
            'username': refreshTokens[refreshToken],
            'role': req.body.role
        }
        const token = jwt.sign(user, SECRET, { expiresIn: 600 });
        res.json({ jwt: token })
    }
    else {
        res.sendStatus(401);
    }
};

exports.random = passport.authenticate('jwt'), (req, res) => {
    res.json({ value: Math.floor(Math.random() * 100) });
};

exports.findByUserName = (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({
            message: "Please Fill up Users Details"
        });
    }

    Users.find({ username: req.body.username })
        .then(data => {
            if (data.length > 0) {
                res.send(
                    {
                        role: data[0]['role']
                    }
                );
            }
            else {
                res.send({ message: "Data Not Found" });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
