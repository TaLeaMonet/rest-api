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
router.get('/users', authenticateUser, asyncHandler(async(req, res) => {
   const user = await req.currentUser;
  res.status(200).json({user});
}));


/* POST /api/users - creates a new user */
router.post('/users', asyncHandler(async(req, res) => {
    try {
    const user = await User.create(req.body);
    res.status(201).location("/").end();
    }  catch(err) {
    console.log('ERROR:', err.name);
      res.status(400).json({ err })
      throw err;
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
      const course = await Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json(course);
  }));

/* POST api/courses - creates a new course */
router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {
    const course = await Course.create(req.body);
    res.status(201).location(`/courses/${course.id}`).end();
  }));

/* PUT api/courses/:id - updates the corresponding course  */
router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res, next) => {
      const course = await Course.findByPk(req.params.id);
      const user = await req.currentUser; 
      if (course.userId === user.id) {
        await course.update(req.body);
        res.status(204).end();
      } else {
       next();
      }
  }));

/* DELETE api/courses/:id - deletes the corresponding course */
router.delete('/courses/:id', authenticateUser, asyncHandler(async(req, res, next) => {
      try {
      const course = await Course.findByPk(req.params.id);
      const user = await req.currentUser; 
      console.log("req information displayed:", req.currentUser);
      console.log("Testing out user info:", user);
      if(course.userId === user.id) {
      await course.destroy()
      res.status(204).end();
      } else {
        next();
      }
      } catch (err) {
        res.status(500).json({message: err.message})
      }
}));

module.exports = router; 