const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../app/config/passport');
const foodController = require('../controllers/food');
const {validateBody, schemas} = require('../helpers/routeValidators');

const signInAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

router.route('/add')
    .post(jwtAuth, foodController.add);

//edits a foodItem
router.route('/edit')
    .post(jwtAuth, foodController.edit);

    //returns all food items from db
router.route('/find')
    .get(jwtAuth, foodController.findAll);

    //returns food based on id
router.route('/find/:id')
    .get(foodController.findById);

    //returns food added by a specific chef
router.route('/by/:chef')
    .get(jwtAuth, foodController.findByChef);

router.route('/rate')
    .post(jwtAuth, foodController.rate);

router.route('/getRatings')
    .post(jwtAuth, foodController.getRatings);

router.route('getStars')
    .post(jwtAuth, foodController.getStars);

router.route('/like')
    .post(jwtAuth, foodController.likeFood);

router.route('/favorite')
    .get(jwtAuth, foodController.favorite);
module.exports = {router};