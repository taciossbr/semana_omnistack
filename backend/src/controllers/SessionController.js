const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const settings = require('../settings')

const connection = require('../database/connection')

module.exports = {
  async create(req, res) {
    const {username = '', password = ''} = req.body;

    const user = await connection('users')
      .where('username', username)
      .select('*')
      .first()
    
    if (!user) {
      return res.status(400).json({error: 'Incorrect username'})
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== user.password) {
      return res.status(400).json({error: 'Incorrect password'})
    }

    const {id, email} = user
    const token = jwt.sign({username}, settings.ACCESS_TOKEN_SECRET)

    return res.json({
      access_token: token,
      user: {id, username, email}
    })

  }
}