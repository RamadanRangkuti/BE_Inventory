/* eslint-disable no-undef */
const userModel = require('../models/user.model')
const response = require('../../helpers/formResponse')
const { v4: uuidv4 } = require('uuid')
const bycrpt = require('bcrypt')

const userController = {
  get: async (req, res) => {
    try {
      const { search, sortField, sortBy, page, limit } = req.query
      const query = { search, sortField, sortBy, page, limit }
      const result = await userModel.get(query)
      return response(res, 200, result)
    } catch (error) {
      return response(res, 500)
    }
  },
  getDetail: async (req, res) => {
    try {
      const payload = { id: req.params.id }
      const result = await userModel.getDetail(payload)
      if (result != null) {
        return response(res, 200, result)
      } else {
        return response(res, 404, 'Sorry data not found please check your input ID')
      }
    } catch (error) {
      return response(res, 500)
    }
  },
  add: async (req, res) => {
    try {
      const payload = {
        id_user: uuidv4(),
        fullname: req.body.fullname,
        email: req.body.email, // reguler expression email
        password: bycrpt.hashSync(req.body.password, 11),
        // comparesync
        picture: req.file.filename,
        role: req.body.role
      }
      const result = await userModel.add(payload)
      return response(res, 201, result)
    } catch (error) {
      return response(res, 500)
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const { fullname, email, password, role } = req.body

      const oldUser = await userModel.getDetail({ id })
      const picture = req.file ? req.file.filename : oldUser.picture // ternary operator

      const updatedFullname = fullname || oldUser.fullname
      const updatedEmail = email || oldUser.email
      const updatedPassword = password || oldUser.password
      const updatedRole = role || oldUser.role

      const result = await userModel.update({ id, fullname: updatedFullname, email: updatedEmail, password: updatedPassword, picture, role: updatedRole })

      if (oldUser.picture && oldUser.picture !== picture) {
        const filePath = path.join(__dirname, '..', '..', 'public', 'uploads', 'images', oldUser.picture)
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Failed to delete old file:', err)
          }
        })
      }
      return response(res, 201, result)
    } catch (error) {
      return response(res, 500)
    }
  },
  remove: async (req, res) => {
    try {
      const payload = {
        id: req.params.id
      }
      result = await userModel.remove(payload)
      return response(res, 200, result)
    } catch (error) {
      return response(res, 500)
    }
  }
}

module.exports = userController
