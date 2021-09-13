//inisialisasi library
const express = require("express")
const app = express()

//import fungsi authorization auth
const auth = require("./auth")

//import route user
const user = require("./route/user")
app.use("/", user)

//import route jadwal
const jadwal = require("./route/jadwal")
app.use("/jadwal", jadwal)

//import route alpro
const alpro = require("./route/alpro")
app.use("/alpro", alpro)

//import route database
const database = require("./route/database")
app.use("/database", database)

//import route fraud
const fraud = require("./route/fraud")
app.use("/fraud", fraud)

//import route incident
const incident = require("./route/incident")
app.use("/incident", incident)

//import route network
const network = require("./route/network")
app.use("/network", network)

//import route security
const security = require("./route/security")
app.use("/security", security)

//membuat web server dengan port 2000
app.listen(2000, () => {
    console.log("server run on port 2000")
})

