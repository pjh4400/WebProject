const express = require('express');
const bycrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/User');

const router = express.Router();

router.post('/join',  isNotLoggedIn, async (req, res, next) => {
    const {id, password} = req.body;
    try {
        const exUser = await User.findOne({ id: id});
        if (exUser) {
            return res.json({status: 403, message: '이미 가입된 아이디입니다.'});       
        }
        const hash = await bycrypt.hash(password, 12);
        await User.create({
            id: id,
            password: hash,
        });
        return res.json({status: 200, message: '회원 가입 되었습니다.'});       
    } catch (error) {
        return next(error);    
    }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            return next(authError);
        }
        if(!user) {
            return res.json({status:403, message:'아이디 또는 비밀번호가 잘못되었습니다.'});
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                return next(loginError);
            }
            return res.json({status:200, message:'로그인되었습니다.'});
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req,res) => {
    req.logout();
    req.session.destroy();
    res.json({message: '로그아웃 되었습니다.'});
})

module.exports = router;