const { application } = require('express');
var express = require('express');
var router = express.Router();
const { User, Course } = require("./models");
const { authenticateUser } = require("./middleware/auth-user");
const auth = require('basic-auth');
var bcrypt = require('bcryptjs');


/* Custom middleware for error handling */
function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

/* GET api/users - returns all properties and values for current auth user */ 
router.get('/users',
//  authenticateUser, 
 asyncHandler(async(req, res) => {
   const user = await req.currentUser;
  res.status(200).json(user);
}));


/* POST /api/users - creates a new user */
router.post('/users',
  // authenticateUser, 
 asyncHandler(async(req, res) => {
    try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    }  catch(err) {
    console.log('ERROR:', err.name);
    
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraint') {
      const errors = await error.errors.map(err => err.message);
      res.status(400).json({ errors })
    } else {
      throw err; 
    }
  }
}));

/* GET api/courses - returns all courses including User associated */
router.get('/courses', asyncHandler(async(req, res, next) => {
        const courses = await Course.findAll({
          include: [
            {
              model: User,
            },
          ],
        });
        res.status(200).json(courses);
  }));

/* GET api/courses/:id - returns corresponding course and associated User */
router.get('/courses/:id', asyncHandler(async(req, res, next) => {
      const course = await Course.findOne(req.params.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json(course);
  }));

/* POST api/courses - creates a new course */
router.post('/courses', 
// authenticateUser,
asyncHandler(async(req, res, next) => {
    try {
    const course = await Course.create();
    res.status(201);
    } catch (err) {
      console.log('ERROR:', err.name);

      if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraint') {
      const errors = await error.errors.map(err => err.message);
      res.status(400).json({ errors })
    } else {
      throw error; 
  }
    }
  }));
/* PUT api/courses/:id - updates the corresponding course  */
router.put('/courses/:id', 
// authenticateUser,
asyncHandler(async(req, res, next) => {
      try {
      const course = await Course.update(req.params.id);
      res.status(201);
      } catch (err) {
        console.log('ERROR:', err.name);

        if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraint') {
        const errors = await error.errors.map(err => err.message);
        res.status(400).json({ errors })
      } else {
        throw err; 
      }
      }
  }));

/* DELETE api/courses/:id - deletes the corresponding course */
router.delete('/courses/:id', 
// authenticateUser,
asyncHandler(async(req, res, next) => {
      try {
      const course = await Course.findByPK(req.params.id);
      await course.destroy()
      res.status(204).end();
      } catch (err) {
        res.status(500).json({message: err.message})
      }
}));

module.exports = router; 