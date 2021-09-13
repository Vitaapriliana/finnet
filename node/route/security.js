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

// GET: /security--> end point untuk mengakses data security
app.get("/", (req,res) => {
    let sql = "SELECT k.id_security, k.tanggal, k.shift, s.nama_shift, k.waf, k.chde, k.reviewer, k.action, k.recommendation " +
              "FROM security k JOIN shift s ON k.shift = s.id_shift"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                security: result
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

// POST: /security --> end point untuk pencarian data security
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from security where tanggal like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                security: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /security/save --> end point untuk insert data security
app.post("/save", (req,res) => {
    let data = {
        id_security: req.body.id_security,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        waf: req.body.waf,
        chde: req.body.chde,
        reviewer: req.body.reviewer,
        action: req.body.cpu,
        recommendation: req.body.recommendation
    }
    let message = ""

    let sql = "insert into security set ?"
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

// POST: /security/update --> end point untuk update data security
app.post("/update", (req,res) => {
    let data = [{
        id_security: req.body.id_security,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        waf: req.body.waf,
        chde: req.body.chde,
        reviewer: req.body.reviewer,
        action: req.body.cpu,
        recommendation: req.body.recommendation
    }, req.body.id_security]
    let message = ""

    let sql = "update security set ? where id_security = ?"
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

// DELETE: /security/:id_security --> end point untuk hapus data security
app.delete("/:id_security", (req,res) => {
    let data = {
        id_security : req.params.id_security
    }
    let message = ""
    let sql = "delete from security where ?"
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