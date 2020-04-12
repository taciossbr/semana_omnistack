const express = require('express');

const { getUser, requireLogin } = require('./auth')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const UserController = require('./controllers/UserController')
const OngUserController = require('./controllers/OngUserController')
const UserOngController = require('./controllers/UserOngController')

const OngValidator = require('./validators/OngValidator')
const IncidentValidator = require('./validators/IncidentValidator')
const UserValidator = require('./validators/UserValidator')
const SessionValidator = require('./validators/SessionValidator')
const OngUserValidator = require('./validators/OngUserValidator')
const UserOngValidator = require('./validators/UserOngValidator')


const router = express.Router();

router.post('/sessions', SessionValidator.create, SessionController.create)

// OngController

router.get('/ongs', OngController.list)

router.post('/ongs', OngValidator.create, OngController.create)

// Profile Controller

router.get('/profile', requireLogin, ProfileController.list)

// Incident Controller

router.get('/incidents', IncidentValidator.list, IncidentController.list)

router.post('/incidents', requireLogin, IncidentValidator.create, IncidentController.create)

router.delete('/incidents/:id', requireLogin, IncidentValidator.delete, IncidentController.delete)

// User Controller

router.post('/users/', UserValidator.create, UserController.create)

// Ong User Controller

router.get('/users/:user_id/ongs/', UserOngValidator.list, UserOngController.list)

// Ong User Controller

router.get('/ongs/:ong_id/users/', OngUserValidator.list, OngUserController.list)

router.post('/ongs/:ong_id/users/', OngUserValidator.create, OngUserController.create)

router.delete('/ongs/:ong_id/users/:user_id/', OngUserValidator.delete, OngUserController.delete)


module.exports = router