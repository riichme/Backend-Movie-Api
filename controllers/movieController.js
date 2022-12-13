const { Movie } = require('../models')

class MovieController {
    static async postMoviesAdmin(req, res, next) {
        let { name, url, cooming_soon } = req.body
        console.log(req.loggedUser, "<<<<<<")
        let {id} = req.loggedUser
        try {
            const data = await Movie.create({
                name, 
                url, 
                cooming_soon,
                UserId : id
            })
            res.status(201).json(data)

        } catch(err) {
            next(err)
        }
    }

    static async postMoviesUserFavorite(req, res, next) {
        let { name, url, favorite } = req.body
        console.log(req.loggedUser, "<<<<<<")
        let {id} = req.loggedUser
        try {
            const data = await Movie.create({
                name, 
                url,
                favorite,
                UserId : id
            })
            res.status(201).json(data)

        } catch(err) {
            next(err)
        }
    }

    static async postMoviesusersRating(req, res, next) {
        let { name, url, rating } = req.body
        console.log(req.loggedUser, "<<<<<<")
        let {id} = req.loggedUser
        try {
            const data = await Movie.create({
                name, 
                url,
                rating,
                UserId : id
            })
            res.status(201).json(data)

        } catch(err) {
            next(err)
        }
    }

    static async getMovies(req, res, next) {
        console.log(req, "<<")
        try {
            const data = await Movie.findAll({})
           if(data) {
               res.status(200).json(data);
           } 
        }
        catch(err) {
            next(err)
        }
    }
    
    static async getMoviesCoomingSoon(req, res, next) {
        const {cooming_soon} = req.query
        try {
            const data = await Movie.findAll({
                where: {
                    cooming_soon
                }
            })
           if(data) {
               res.status(200).json(data);
           } 
        }
        catch(err) {
            next(err)
        }
    }

    static async putMoviesId(req, res, next) {
        let { name, url, cooming_soon } = req.body
        let id = +req.params.id
        let data = {
            name, 
            url,
            cooming_soon,
        }

        try {
            const updated = await Movie.update(data, { where: { id: id }, returning: true })
            if (!updated) {
                throw {status: 404, message: "error not found"}
            } else {
                res.status(200).json({
                    updated: updated[1][0]
                })
            }
        } catch (err) {
            next(err)
        }

    }

    static async deleteMoviesId(req, res, next) {
        let id = +req.params.id
        try {
            const deleted = await Movie.destroy({ where: { id: id }, returning: true })
            if (!deleted) {
                throw {status: 404, message: "error not found"}
            } else {
                res.status(200).json({
                    message: "Movie successfully deleted"
                })
            }
        } catch(err) {
            next(err)
        }
    }

}

module.exports = MovieController