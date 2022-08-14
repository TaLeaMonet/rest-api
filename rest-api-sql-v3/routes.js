var express = require('express');
var router = express.Router();
var Course = require( '../models').Course;

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
router.get('api/users', asyncHandler((req, res) => {
   //may need to use WHERE clause inside .findOne() method. 
  const user = User.findOne();
  res.status(200);
}));
/* POST /api/users - creates a new user */
router.post('api/users', asyncHandler((req, res) => {
    const user = User.create();
    res.status(201);
}));


/* GET api/courses - returns all courses including User associated */
router.get('api/courses', asyncHandler((req, res, next) => {
        const courses = Course.findAll({
          include: [
            {
              model: User,
            },
          ],
        });
        res.status(200);
  }));

/* GET api/courses/:id - returns corresponding course and associated User */
router.get('api/courses/:id', asyncHandler((req, res, next) => {
      const course = Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200);
  }));

/* POST api/courses - creates a new course */
router.post('api/courses', asyncHandler((req, res, next) => {
      const course = Course.create();
      res.status(201);
  }));
/* PUT api/courses/:id - updates the corresponding course  */
router.put('api/courses/:id', asyncHandler((req, res, next) => {
      const course = Course.update();
      res.status(201);
  }));

/* DELETE api/courses/:id - deletes the corresponding course */
router.delete('api/courses/:id', asyncHandler((req, res, next) => {
      const course = Course.destroy();
      res.status(204);
}));