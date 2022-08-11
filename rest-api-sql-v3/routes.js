var express = require('express');
var router = express.Router();
var Course = require( '../models').Course;

/* GET api/courses - returns all courses including User associated */
router.get('api/courses', async(req, res, next) => {
    try {
        const courses = Course.findAll();
        res.status(200);
    } catch(err) {
          
    }
  });

/* GET api/courses/:id - returns corresponding course and associated User */
router.get('api/courses/:id', async(req, res, next) => {
    try {

    } catch(err) {

    }
  });

/* POST api/courses - creates a new course */
router.post('api/courses', async(req, res, next) => {
    try {

    } catch(err) {

    }
  });
/* PUT api/courses/:id - updates the corresponding course  */
router.put('api/courses/:id', async(req, res, next) => {
    try {

    } catch(err) {

    }
  });

/* DELETE api/courses/:id - deletes the corresponding course */
router.delete('api/courses/:id', async(req, res, next) => {
    try {

    } catch(err) {

    }
  });