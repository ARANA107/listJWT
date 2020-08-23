const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Item Model

const User = require('../../models/user');


//@route  GET api/auth
//@desc   Auth User
//@access Public 


router.post('/login',(req,res)=>{
const {email,password} = req.body;

//simple validation
if(!email ||!password){
    return res.status(400).json({msg:'Please enter all fields'});
}

//check for existing user
User.findOne({email})
.then(user =>{
    if(!user) return res.status(400).json({msg: 'user does not exsit'});

    //validate password
    bcrypt.compare(password, user.password)
    .then(isMatch=>{
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});
        jwt.sign(
            {id:user.id},
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err,token)=>{
                if(err) throw err;
                res.json({
                    token,
                    user:{
                        id:user.id,
                        name:user.name,
                        email:user.email 
                    }
                })
            }
            ) 
    })
})
});

router.post('/register',(req,res)=>{
const {name,email,password} = req.body;
console.log(name,email,password);
//simple validation
if(!name || !email ||!password){
    return res.status(400).json({msg:'Please enter all fields'});
}

//check for existing user
User.findOne({email})
.then(user =>{
    if(user) return res.status(400).json({msg: 'user already exsits'});

    const newUser = new User({
        name,
        email,
        password
    }); 
    //create salt and hash
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user=>{
                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email 
                            }
                        })
                    }
                    )
            })
        })
    })
})
});

//@route  GET api/auth/user
//@desc   Get User Data
//@access Private

// router.get('/user',auth,(req,res)=>{
//     User.findById(req.user.id)
//     .select('-password')
//     .then(user=>res.json(user));
// })
router.get('/user', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) throw Error('User Does not exist');
      res.json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });



module.exports= router;