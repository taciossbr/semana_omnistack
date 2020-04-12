
const connection = require('../database/connection')
const {getUser} = require('../auth')

module.exports = {

  async list(req, res) {
    const {page = 1} = req.query

    const [count] = await connection('incidents').count();
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ])

    res.header('X-Total-Count', count['count(*)'])
    return res.json(incidents)
  },
  async create(req, res) {
    const {title, description, value, ong_id} = req.body

    const user = await getUser(req)

    const user_ongs = await connection('ong_user')
      .select('ong_id')
      .where({user_id: user.id})

    const user_ongs_ids = user_ongs.map(el => el.ong_id)

    if (!new Set(user_ongs_ids).has(ong_id)) {
      return res.status(401).json({error: 'You don\'t have permissions'})
    }

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    })

    return res.json({ id })
  },
  async delete(req, res) {
    const {id} = req.params

    const {ong_id} = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    const user = await getUser(req)

    const user_ongs = await connection('ong_user')
      .select('ong_id')
      .where({user_id: user.id})

    const user_ongs_ids = user_ongs.map(el => el.ong_id)

    if (!new Set(user_ongs_ids).has(ong_id)) {
      return res.status(401).json({error: 'You don\'t have permissions'})
    }

    await connection('incidents').where('id', id).delete()

    return res.status(204).send();
  }
}