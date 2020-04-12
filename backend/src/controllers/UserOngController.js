const crypto = require('crypto')

const connection = require('../database/connection')

module.exports = {
  async list(req, res) {
    const {user_id} = req.params

    const users = await connection('ong_user')
      .select(['ongs.id', 'name', 'ongs.email', 'whatsapp', 'city', 'uf'])
      .innerJoin('ongs', 'ongs.id', 'ong_user.ong_id')
      .where({user_id})
    
    return res.json(users)
  },
}