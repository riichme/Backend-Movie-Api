const { User } = require('../models')
const {generateToken} = require('../helper/userToken.js')
const { checkPassword } = require('../helper/bcrypt.js')

class UserController  {
    static async registerUser(req, res, next) {
        const { username, password, role} = req.body
        try {
            const user = await User.create({
                username,
                role, 
                password,
            })
            res.status(201).json({ 
                id: user.id, 
                username: user.username,
            })

        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        const {username, password} = req.body
        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })

            if(!user) {
                throw {status: 400, message: "email or password incorrect"}
            } else {
                const isPasswords = checkPassword(password, user.password)
                if (!isPasswords) {
                    throw {status: 400, message: "email or password incorrect"}
                } else {
                    let obj = {
                        id: user.id,
                        username: user.username,
                    }
                    const access_token = generateToken(obj)
                    res.status(200).json({access_token})
                }
            }

        } catch (err) {
            next(err)
        }

    }

}

module.exports = UserController