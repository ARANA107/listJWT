// const bcrypt = require('bcryptjs');
// const config = require('config');
// const jwt = require('jsonwebtoken');

// //Item Model

// const User = require('../../models/user');


// //@route  GET api/users
// //@desc   Register new User
// //@access Public 


// router.post('/',(req,res)=>{
// const {name,email,password} = req.body;

// //simple validation
// if(!name || !email ||!password){
//     return res.status(400).json({msg:'Please enter all fields'});
// }

// //check for existing user
// User.findOne({email})
// .then(user =>{
//     if(user) return res.status(400).json({msg: 'user already exsits'});

//     const newUser = new User({
//         name,
//         email,
//         password
//     }); 
//     //create salt and hash
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash(newUser.password, salt, (err,hash)=>{
//             if(err) throw err;
//             newUser.password = hash;
//             newUser.save()
//             .then(user=>{
//                 jwt.sign(
//                     {id:user.id},
//                     config.get('jwtSecret'),
//                     {expiresIn: 3600},
//                     (err,token)=>{
//                         if(err) throw err;
//                         res.json({
//                             token,
//                             user:{
//                                 id:user.id,
//                                 name:user.name,
//                                 email:user.email 
//                             }
//                         })
//                     }
//                     )
//             })
//         })
//     })
// })
// });


const express = require('express');
const router = express.Router();// User Model
const User = require('../../models/user');

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports= router;