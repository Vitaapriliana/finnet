const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database
//inisialisasi library moment untuk menyimpan format date-time
const moment = require("moment")


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /incident --> end point untuk mengakses data incident
app.get("/", (req,res) => {
    let sql = // ini masih error
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                incident: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /incident --> end point untuk pencarian data incident
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from incident where tanggal like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                alpro: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /incident/save --> end point untuk insert data incident
app.post("/save", (req,res) => {
    let data = {
        id_incident: req.body.id_incident,
        source: req.body.source,
        segmen: req.body.segmen,
        incident_description: req.body.incident_description,
        status: req.body.status,
        start: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        close: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        summary_incident: req.body.summary_incident,
        action: req.body.action
    }
    let message = ""

    let sql = "insert into incident set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row inserted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /incident/update --> end point untuk update data incident
app.post("/update", (req,res) => {
    let data = [{
        id_incident: req.body.id_incident,
        source: req.body.source,
        segmen: req.body.segmen,
        incident_description: req.body.incident_description,
        status: req.body.status,
        start: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        close: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        summary_incident: req.body.summary_incident,
        action: req.body.action
    }, req.body.id_incident]
    let message = ""

    let sql = "update incident set ? where id_incident = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /incident/:id_incident --> end point untuk hapus data incident
app.delete("/:id_incident", (req,res) => {
    let data = {
        id_incident : req.params.id_incident
    }
    let message = ""
    let sql = "delete from incident where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

module.exports = app