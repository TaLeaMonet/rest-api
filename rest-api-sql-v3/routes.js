const { application } = require('express');
var express = require('express');
var router = express.Router();
var course = require( './models').Course;

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

/* User Authentication Middleware */

const  authenticateUser = (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);
  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the data store
    // by their username (i.e. the user's "key"
    // from the Authorization header).
    const user = users.find(u => u.username === credentials.name);

    // If a user was successfully retrieved from the data store...
    if (user) {
      // Use the bcryptjs npm package to compare the user's password
      // (from the Authorization header) to the user's password
      // that was retrieved from the data store.
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);

    // If the passwords match...
    if (authenticated) {
      console.log(`Authentication successful for username: ${user.username}`);

      // Then store the retrieved user object on the request object
      // so any middleware functions that follow this middleware function
      // will have access to the user's information.
      req.currentUser = user;
    } else {
      message = `Authentication failure for username: ${user.username}`;
    }
  } else {
    message = `User not found for username: ${credentials.name}`;
  }
} else {
  message = 'Auth header not found';
}
// If user authentication failed...
if (message) {
  console.warn(message);
  // Return a response with a 401 Unauthorized HTTP status code.
  res.status(401).json({ message: 'Access Denied' });
} else {
  // Or if user authentication succeeded...
  // Call the next() method.
  next();
}
};


/* GET api/users - returns all properties and values for current auth user */ 
router.get('api/users', authenticateUser, asyncHandler(async(req, res) => {
   //may need to use WHERE clause inside .findOne() method. 
  const user = await User.findOne();
  res.status(200);
}));
/* POST /api/users - creates a new user */
router.post('api/users', authenticateUser, asyncHandler(async(req, res) => {
    try {
    const user = await User.create(req.body);
    res.status(201);
    } catch (err) {
    console.log('ERROR:', err.name);
    }
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraint') {
      const errors = await error.errors.map(err => err.message);
      res.status(400).json({ errors })
    } else {
      throw err; 
    }
}));


/* GET api/courses - returns all courses including User associated */
router.get('api/courses', asyncHandler(async(req, res, next) => {
        const courses = await Course.findAll({
          include: [
            {
              model: User,
            },
          ],
        });
        res.status(200);
  }));

/* GET api/courses/:id - returns corresponding course and associated User */
router.get('api/courses/:id', asyncHandler(async(req, res, next) => {
      const course = await Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200);
  }));

/* POST api/courses - creates a new course */
router.post('api/courses', asyncHandler(async(req, res, next) => {
    try {
    const course = await Course.create();
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
/* PUT api/courses/:id - updates the corresponding course  */
router.put('api/courses/:id', asyncHandler(async(req, res, next) => {
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
router.delete('api/courses/:id', asyncHandler(async(req, res, next) => {
      try {
      const course = await Course.findByPK(req.params.id);
      await course.destroy()
      res.status(204).end();
      } catch (err) {
        res.status(500).json({message: err.message});
      }
}));

module.exports = router; 