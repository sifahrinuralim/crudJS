const router = require('express').Router()
const residentController = require("../controllers/residentController")

router.get('/', residentController.homepage)

router.get('/getOne/:nik', residentController.getOne)

router.get('/getAll', residentController.getAll)

router.post('/register', residentController.register)

router.put('/update/:nik', residentController.update)

router.delete('/delete/:nik', residentController.delete)

module.exports = router