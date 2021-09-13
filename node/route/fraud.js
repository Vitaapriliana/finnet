const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database
const moment = require("moment")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /fraud --> end point untuk mengakses data fraud
app.get("/", (req,res) => {
    let sql = "SELECT f.id_fraud, f.tanggal, f.shift, s.nama_shift, f.alert, f.review, f.action, f.recommendation " +
    "FROM fraud f JOIN shift s ON f.shift = s.id_shift"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                fraud: result
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

// POST: /fraud/save --> end point untuk insert data fraud
app.post("/save", (req,res) => {
    let data = {
        id_fraud: req.body.id_fraud,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        alert: req.body.alert,
        review: req.body.review,
        action: req.body.action,
        recommendation: req.body.recommendation
    }
    let message = ""

    let sql = "insert into fraud set ?"
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

// POST: /fraud/update --> end point untuk update data fraud
app.post("/update", (req,res) => {
    let data = [{
        id_fraud: req.body.id_fraud,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        alert: req.body.alert,
        review: req.body.review,
        action: req.body.action,
        recommendation: req.body.recommendation
    }, req.body.id_fraud]
    let message = ""

    let sql = "update fraud set ? where id_fraud = ?"
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

// DELETE: /fraud/:id_fraud --> end point untuk hapus data fraud
app.delete("/:id_fraud", (req,res) => {
    let data = {
        id_fraud : req.params.id_fraud
    }
    let message = ""
    let sql = "delete from fraud where ?"
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