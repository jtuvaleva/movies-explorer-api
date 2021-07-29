const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { checkPermission } = require('../middlewares/permission');
const { validateMovieEntry } = require('../middlewares/validation');

router.get('/movies', getMovies);

router.post('/movies', validateMovieEntry, addMovie);

router.delete('/movies/:movieId', checkPermission, deleteMovie);

module.exports = router;
