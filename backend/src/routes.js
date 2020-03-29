const express = require('express');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const router = express.Router();

router.post('/sessions', SessionController.create)

router.get('/ongs', OngController.list)

router.post('/ongs', OngController.create)

router.get('/profile', ProfileController.list)

router.get('/incidents', IncidentController.list)
router.post('/incidents', IncidentController.create)
router.delete('/incidents/:id', IncidentController.delete)

module.exports = router