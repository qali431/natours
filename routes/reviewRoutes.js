const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
// router.use(authController.protect);
router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
router.get('/tour/:id', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

// router
//   .route('/')
//   .get(reviewController.getAllReviews)
//   .post(
//     authController.restrictTo('user'),
//     reviewController.setTourUserIds,
//     reviewController.createReview,
//   );

// router
//   .route('/:id')
//   .get(reviewController.getReview)
//   .patch(
//     authController.restrictTo('user', 'admin'),
//     reviewController.updateReview,
//   )
//   .delete(
//     authController.restrictTo('user', 'admin'),
//     reviewController.deleteReview,
//   );

module.exports = router;
