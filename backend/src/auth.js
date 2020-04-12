const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const settings = require('./settings')

const connection = require('./database/connection')

async function requireLogin(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).json({error: 'Authorization headers not found'}).send()
  }
  console.log(req.headers)
  const token = req.headers.authorization.split(' ')[1]
  try {
    console.log(token)
    const decoded = jwt.verify(token, settings.ACCESS_TOKEN_SECRET)
    next()
  } catch (e) {
    return res.status(403).json({error: 'Forbidden'}).send()
  }
}

async function getUser(req) {

  const token = req.headers.authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, settings.ACCESS_TOKEN_SECRET)
    const {username} = decoded
  
    const user = await connection('users')
      .where('username', username)
      .select(['id', 'username', 'email'])
      .first()
  
    return user
  } catch (e) {
    return undefined
  }

}

module.exports = {getUser, requireLogin}