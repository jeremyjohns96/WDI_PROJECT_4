const router = require('express').Router();
const runs  = require('../controllers/runs');
const users  = require('../controllers/users');
const shapes  = require('../controllers/shapes');
const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');

router.route('/shapes')
  .get(shapes.index)
  .post(secureRoute, shapes.create);

router.route('/shapes/:id')
  .get(shapes.show)
  .put(secureRoute, shapes.update)
  .delete(secureRoute, shapes.delete);

//--------------------************-----------------------
router.route('/runs')
  .get(runs.index)
  .post(secureRoute, runs.create);

router.route('/runs/:id')
  .get(runs.show)
  .put(secureRoute, runs.update)
  .delete(secureRoute, runs.delete);
// .put(secureRoute, runs.saveRating);

router.route('/runs/:id/comments')
  .post(secureRoute, runs.createComment);


router.route('/runs/:id/comments/:commentId')
  .delete(secureRoute, runs.deleteComment);

router.route('/runs/:id/ratings')
  .post(secureRoute, runs.createRating);
//--------------------************-----------------------

router.route('/users')
  .get(users.index)
  .post(secureRoute, users.create);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

//--------------------************-----------------------

router.route('/login')
  .post(auth.login);

router.route('/oauth/strava')
  .post(oauth.strava);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
