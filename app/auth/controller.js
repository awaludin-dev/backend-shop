const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { getToken } = require('../../utils');

const register = async(req, res, next) => {
    try {
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) {
        if(err  && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function(err, user) {
        if(err) return next(err);
        if(!user) return res.json({
            error: 1,
            message: 'Email or password incorrect'
        });

        let signed = jwt.sign(user, config.secretKey);

        await User.findByIdAndUpdate(user._id, {$push: {token: signed}});

        return res.json({
            message: 'Login successfully',
            user,
            token: signed
        })
    })(req, res, next)
}

const logout = (req, res, next) => {
    let token = getToken(req);
    let user = User.findOne({token: {$in: [token]}}, {$pull: {token: token}}, {useFindAndModify: false});

    if(!token || !user) {
        res.json({
            error: 1,
            message: 'No user found!!'
        })
    }

    return res.json({
        error: 0,
        message: 'Logout berhasil'
    });
}

const localStrategy = async (email, password, done) => {
    try {
        let user = await User
            .findOne({email})
            .select('-__v -createdAt -updatedAt -cart_items -token');
        if(!user) return done();
        if(bcrypt.compareSync(password, user.password)) {
            ({password, ...userWithoutPassword} = user.toJSON());
            return done(null, userWithoutPassword);
        }
    } catch (err) {
        done(err, null);
    }
    done();
}

const me = (req, res, next) => {
    if(!req.user) {
        res.json({
            err: 1,
            message: 'You`re not login or token expired'
        })
    }

    return res.json(req.user);
}

module.exports = {
    register,
    login,
    logout,
    localStrategy,
    me
}