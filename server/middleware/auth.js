const { decodeToken } = require('../helper/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { code: 404, message: 'Invalid Token' }
        }
        const data = decodeToken(access_token)
        const user = await User.findByPk(data.id)
        if (!user) {
            throw { code: 404, message: 'Invalid Token' }
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})

    }
}

module.exports = {authentication}