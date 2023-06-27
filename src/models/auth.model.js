const db = require('../../helpers/connection')
const authModel = {
  login: (email) => {
    // console.log('Email:', email)
    // console.log('Password:', password)
    return new Promise((resolve, reject) => {
      db.query('SELECT email, password, role FROM users WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result.rows[0])
        }
      })
    })
  }
}

module.exports = authModel
