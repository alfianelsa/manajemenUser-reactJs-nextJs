const express = require('express')
const app = express()
const cors = require('cors')
const Controller = require('./controller/controller')
const { authentication } = require('./middleware/auth')
const port = 3001


app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(express.json())

app.post('/login', Controller.login)
app.use(authentication)
app.get('/readEmployee', Controller.readEmployee)
app.get('/readEmployee/:id', Controller.readById)
app.post('/add', Controller.addEmployee)
app.put('/edit/:id', Controller.editEmployee)
app.delete('/delete/:id', Controller.deleteEmployee)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})