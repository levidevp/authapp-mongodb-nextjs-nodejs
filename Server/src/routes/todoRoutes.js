const express = require("express")
const routes = express.Router()
const {GETtodo,ADDtodo,DELETEtodo,UPDATEtodo,} = require("../controller/todoController.js")

routes.get('/GETtodo', GETtodo)
routes.post('/ADDtodo',ADDtodo)
routes.delete('/DELETEtodo',DELETEtodo)
routes.put('/UPDATEtodo', UPDATEtodo)


module.exports = routes
