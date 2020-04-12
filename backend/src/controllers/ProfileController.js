const connection = require('../database/connection')
const {getUser} = require('../auth')

module.exports = {
  async list(req, res) {
    const user = await getUser(req)
    console.log(user)

    const incidents = await connection('incidents')
      .select([
        "incidents.*",
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ])
      .whereIn('ong_id', function () {
        this.select(['ong_id']).from('ong_user')
          .where({user_id: user.id})
      })
      .innerJoin('ongs', 'ong_id', 'ongs.id')
    
    return res.json(incidents)
  }
}