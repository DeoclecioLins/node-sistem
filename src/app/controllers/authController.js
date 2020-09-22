const express = require('express');
const User = require('../models/User');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
};

router.post('/register', async (req, res) => {
    const { name, email } = req.body;        
    const passwd = await bcrypt.hash(req.body.passwd, 10);        
    
    try {
        console.log(email);
        if(await User.findOne({ where: {email:email} })){
            return res.status(400).send({ error: 'User alreadey exists!'});
        }

        const user = await User.create({ name, email, passwd });
        user.passwd = undefined;
        return res.send({ 
            user, 
            token : generateToken({id: user.id}),
        });
    } catch (error) {
        return res.status(400).send({error:'Registration failed'});
    }
});
router.post('/autenticate', async (req, res) =>{
    const { email,passwd } = req.body;
    const user = await User.findOne({ where:{email:email} });

    if(!user)
        return res.status(400).send({ error: 'User not found!'});
    
    
    if(!await bcrypt.compare(passwd, user.passwd))
        return res.status(400).send({ error: 'password invalid!'});
    
    user.passwd = undefined;

    return res.send({ 
        user, 
        token : generateToken({id: user.id}),
    });
}); 

module.exports = app => app.use('/auth', router);