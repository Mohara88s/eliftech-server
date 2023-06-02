const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const shopsRouter = require('./routes/api/shops')
const ordersRouter = require('./routes/api/orders')


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cll-server API',
      version: '1.0.0',
      description: 'Express cll-server API'
    },
    // servers: [{ url: 'http://localhost:3000' }]
  },
  // apis: ['./routes/api/*.js']
  apis: ['./docs/api/*.js']
}
const specs = swaggerJsDoc(options)

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use('/api/shops', shopsRouter)
app.use('/api/orders', ordersRouter)
app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).send('<p>Not found. You can go to <a href="/api/api-docs"> API docs </a></p>')
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
