const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

// @route POST api/signup
// @desc Register Users
// @access Public

router.post('/',
    [
        check('login', 'Login is required')
            .not()
            .isEmpty(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({min: 6}
            ),
        check('email', 'Please enter a valid email').isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }


        const {login, email, password} = req.body;
        try {

            //Check user exists
            let user = await User.findOne({email});
            if (user) {
                res.status(400).json({errors: [{msg: 'This Email already exists'}]});
            }
            user = await User.findOne({login});
            if (user) {
                res.status(400).json({errors: [{msg: 'This Login already exists'}]});
            }


            user = new User({
                    login,
                    password,
                    email
                }
            );

            //Encrypt a password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 36000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }
);


module.exports = router;
