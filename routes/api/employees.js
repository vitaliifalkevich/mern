const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Employee = require('../../models/Employee');


// @route GET employees api/
// @desc Get list of employees
// @access Logged

router.get('/', async (req, res)=> {
    try {
        const employees = await Employee.find();
        res.json({employees});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});
// @route GET employees api/
// @desc Get an employee
// @access Logged
router.get('/:employeeID', async (req, res)=> {
    try {
        const employee = await Employee.findOne({_id: req.params.employeeID});
        if (!employee) return res.status(400).json({msg: 'This employee was not founded'}) ;
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @route POST employees api/
// @desc Create new employee
// @access Logged

router.post('/',
    [
        check('firstName', 'First Name is required')
            .not()
            .isEmpty(),
        check('lastName', 'Last Name is required')
            .not()
            .isEmpty(),
        check('middleName', 'Middle Name is required')
            .not()
            .isEmpty(),
        check('sex', 'choose a sex')
            .not()
            .isEmpty(),
        check('phone', 'Phone is required')
            .not()
            .isEmpty(),
        check('salary', 'input salary')
            .not()
            .isEmpty(),
        check('position', 'choose a position')
            .not()
            .isEmpty(),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {firstName, lastName, middleName, sex, phone, salary, position} = req.body;
        const timeStamp = Date.now();

        try {

            //Check Employee exists
            let employee = await Employee.findOne({lastName});
            if (employee) {
                res.status(400).json({errors: [{msg: 'An Employee: '+ lastName + ' has existed already'}]});
            }


            employee = new Employee({
                firstName,
                lastName,
                middleName,
                sex,
                phone,
                timeStamp,
                salary,
                position
                }
            );

            await employee.save((err, newEmployee)=> {
                console.log("success");
                res.json({newEmployee});
            });


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });
// @route PUT employees api/
// @desc edit & update an employee
// @access Logged
router.put('/:employeeID',
    [
        check('firstName', 'First Name is required')
            .not()
            .isEmpty(),
        check('lastName', 'Last Name is required')
            .not()
            .isEmpty(),
        check('middleName', 'Middle Name is required')
            .not()
            .isEmpty(),
        check('sex', 'choose a sex')
            .not()
            .isEmpty(),
        check('phone', 'Phone is required')
            .not()
            .isEmpty(),
        check('salary', 'input salary')
            .not()
            .isEmpty(),
        check('position', 'choose a position')
            .not()
            .isEmpty(),

    ],
    async (req, res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    const {firstName, lastName, middleName, sex, phone, salary, position} = req.body;
    const updatedEmployee = {
        firstName,
        lastName,
        middleName,
        sex,
        phone,
        salary,
        position
    };

    try {

        const employee = await Employee.findOneAndUpdate({_id: req.params.employeeID}, updatedEmployee, {
            new: true
        });
        return res.json(employee);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route DELETE employees api/
// @desc Delete an employee
// @access Logged
router.delete('/:employeeID', async (req, res)=>{
    try {
        const employeeDeleted = await Employee.findOneAndRemove({_id: req.params.employeeID});
        if (!employeeDeleted) return res.status(400).json({msg: 'This employee was not founded'}) ;
        res.json(employeeDeleted);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
