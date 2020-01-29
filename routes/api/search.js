const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');

// @route GET employees api/search
// @desc Find employees
// @access Logged

router.get('/', async (req, res)=> {
    const search = req.query.search;
    try {
        const employees = await Employee.find( { $or: [
            {'lastName': {$regex: search} },
                { 'firstName': {$regex: search} },
                { 'middleName': {$regex: search} },
                { 'sex': {$regex: search} },
                { 'salary': {$regex: search} },
                { 'position': {$regex: search} }
            ] });
        res.json({employees});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;
