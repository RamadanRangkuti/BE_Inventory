const db = require('../../helpers/connection')

const userModel = {
  get: (query) => {
    return new Promise((resolve, reject) => {
      const { search, sortField, sortBy, page, limit } = query
      let queryString = 'SELECT * FROM users'
      if (search) {
        queryString += ` WHERE names ILIKE '%${search}%'`
      }
      if (sortField && sortBy) {
        queryString += ` ORDER BY ${sortField} ${sortBy}`
      }
      if (page && limit) {
        queryString += ` LIMIT ${limit} OFFSET ${page * limit - limit}`
      }
      db.query(queryString, (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows)
        }
      })
    })
  },
  getDetail: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id_user=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  },
  add: ({ id_user, fullname, email, password, picture, role }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users(id_user, fullname, email, password, picture, role) VALUES ($1, $2, $3, $4, $5, $6)', [id_user, fullname, email, password, picture, role],
        (err, result) => {
          if (err) {
            reject(err.message)
          } else {
            resolve({ id_user, fullname, email, password, picture, role })
          }
        })
    })
  },
  update: ({ id, fullname, email, password, picture, role }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET fullname=$1, email=$2, password=$3, picture=$4, role=$5 WHERE id_user=$6',
        [fullname, email, password, picture, role, id],
        (err, result) => {
          if (err) {
            reject(err.message)
          } else {
            resolve({ id, fullname, email, password, picture, role })
          }
        }
      )
    })
  },
  remove: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id_user=$1', [id], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(`succes deleted data id : ${id}`)
        }
      })
    })
  }
}

module.exports = userModel
