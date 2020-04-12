const crypto = require('crypto')

const connection = require('../database/connection')

module.exports = {

  async create(req, res) {
    const {username, password, email} = req.body

    const salt = crypto.randomBytes(16).toString('hex')

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const [id] = await connection('users').insert({
      username, email, salt, password: hash
    })

    return res.json({ id })
  },
}