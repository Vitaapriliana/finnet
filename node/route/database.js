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

// GET: /database --> end point untuk mengakses data database
app.get("/", (req,res) => {
    let sql = // ini masih error 
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                database: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

app.get("/shift", (req,res) => {
    let sql = "SELECT * from shift"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                shift: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})


// POST: /database/save --> end point untuk insert data database
app.post("/save", (req,res) => {
    let data = {
        id_database: req.body.id_database,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        jam: req.body.jam,
        dbms: req.body.dbms,
        hostname: req.body.hostname,
        aktivitas: req.body.aktivitas,
        status: req.body.status,
        detail: req.body.detail,
        action: req.body.action
    }
    let message = ""

    let sql = "insert into database set ?"
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

// POST: /database/update --> end point untuk update data database
app.post("/update", (req,res) => {
    let data = [{
        id_database: req.body.id_database,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        jam: req.body.jam,
        dbms: req.body.dbms,
        hostname: req.body.hostname,
        aktivitas: req.body.aktivitas,
        status: req.body.status,
        detail: req.body.detail,
        action: req.body.action
    }, req.body.id_database]
    let message = ""

    let sql = "update database set ? where id_database = ?"
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

// DELETE: /database/:id_database --> end point untuk hapus data database
app.delete("/:id_database", (req,res) => {
    let data = {
        id_database : req.params.id_database
    }
    let message = ""
    let sql = "delete from database where ?"
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
