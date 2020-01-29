const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

// @route GET api/auth
// @desc Login Users
// @access Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route POST api/auth
// @desc Login User & get token
// @access Public

router.post('/',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password is required').exists(),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }


        const {email, password} = req.body;
        try {

            //Check user exists
            let user = await User.findOne({email});
            if (!user) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'This email is not register'}]});
            }

            const isMatchPassword = await bcrypt.compare(password, user.password);

            if (!isMatchPassword) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'Invalid Password'}]});

            }
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
