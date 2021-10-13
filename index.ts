import './env-config'
// @ts-ignore
import express from "express"
import cookieParser from 'cookie-parser'
// @ts-ignore
import process from "process"

import api from './api'
import * as path from "path";
import database from "./utills/database";

const PORT = process.env.SERVER_PORT || process.env.PORT || 5000

// create express app
const app = express()

// add middlewares
app.use(express.json())
app.use(express.text())
app.use(cookieParser())

// handle api request
app.use('/api', api)

// serve static files
app.use(express.static("build"))

// server react app with route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"))
})

// handle with 404 error if route is not handled
app.use("/", (req, res) => {
  res.status(404).send("not found")
})

// connect database
database.sync()
  .then(() => {
    // start server
    app.listen(PORT, () => {
      console.log("Server started on:", PORT)
    })
  })
