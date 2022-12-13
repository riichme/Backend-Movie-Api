const movieRouter = require('express').Router();
const movieController = require("../controllers/movieController.js")
const {authorizationAdmin, authorizationUser} = require("../middleware/auth.js");


movieRouter.post('/admin', authorizationAdmin, movieController.postMoviesAdmin)

movieRouter.post('/user/favorite', authorizationUser, movieController.postMoviesUserFavorite)

movieRouter.post('/user/rating', authorizationUser, movieController.postMoviesusersRating)

movieRouter.get('/cooming-soon', movieController.getMoviesCoomingSoon)

movieRouter.get('/', movieController.getMovies)

movieRouter.put('/:id', authorizationAdmin, movieController.putMoviesId)

movieRouter.delete('/:id', authorizationAdmin, movieController.deleteMoviesId)

module.exports = movieRouter