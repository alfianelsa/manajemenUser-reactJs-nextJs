const { compare } = require("../helper/bcrypt")
const { encodeToken } = require("../helper/jwt")
const { User, Employee } = require("../models")

class Controller {
    static async login(req, res) {
        const { email, password } = req.body
        try {
            if (!email) {
                throw { code: 400, message: "Email is required" }
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { code: 404, message: "Invalid login" }
            }
            let comparePassword = compare(password, user.password)
            if (!comparePassword) {
                throw { code: 400, message: "Invalid login" }
            } else {
                const { id, email } = user
                let access_token = encodeToken({ id, email })
                res.status(200).json({ "access_token": access_token })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server Error' })
        }
    }

    static async readEmployee(req, res) {
        try {
            const data = await Employee.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server Error' })
        }
    }

    static async addEmployee(req, res) {
        const { nama, gender, image } = req.body
        try {
            const newEmployee = await Employee.create({ nama, gender, image })
            res.status(201).json(newEmployee)
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }
    }

    static async editEmployee(req, res) {
        try {
            const id = req.params.id
            const { nama, gender, image } = req.body
            const editEmployee = await Employee.update({ nama, gender, image }, {
                where: {
                    id
                }
            })
            res.status(201).json({ message: "success edit" })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }

    }

    static async deleteEmployee(req, res) {
        try {
            const id = req.params.id
            const data = await Employee.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ message: "Employee has been deleted" })
        } catch (error) {
            res.status(500).json({ message: 'Internal server Error' })
        }

    }

    static async readById(req, res) {
        const id = req.params.id
        try {
            const data = await Employee.findOne({
                where: {
                    id
                }
            })
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server Error' })
        }
    }

}

module.exports = Controller