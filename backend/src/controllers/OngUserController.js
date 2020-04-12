const crypto = require('crypto')

const connection = require('../database/connection')

module.exports = {

  async create(req, res) {
    const {ong_id} = req.params
    const {user_id} = req.body

    const [id] = await connection('ong_user').insert({
      ong_id, user_id
    })

    return res.json({ id })
  },
  async list(req, res) {
    const {ong_id} = req.params

    const users = await connection('ong_user')
    .select(['users.id', 'users.username', 'users.email'])
      .innerJoin('users', 'users.id', 'ong_user.user_id')
      .where({ong_id})
    
    return res.json(users)
  },
  async delete(req, res) {
    const {ong_id, user_id} = req.params

    await connection('ong_user').delete({
      ong_id, user_id
    })

    return res.status(204).send()
  }
}