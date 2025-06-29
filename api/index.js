const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const router = require("./routes/index.js")


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.use('/', router)

module.exports = app