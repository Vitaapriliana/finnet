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

// GET: /alpro --> end point untuk mengakses data alpro
app.get("/", (req,res) => {
    let sql = // ini masih error
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                alpro: result
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

app.get("/jam", (req,res) => {
    let sql = "SELECT * from jam"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                jam: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

app.get("/ipaddress_alpro", (req,res) => {
    let sql = "SELECT * from ipaddress_alpro"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                ipaddress_alpro: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

app.get("/hostname_alpro", (req,res) => {
    let sql = "SELECT * from hostname_alpro"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                hostname_alpro: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /alpro --> end point untuk pencarian data alpro
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from alpro where tanggal like '%"+find+"%'"
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

// POST: /alpro/save --> end point untuk insert data alpro
app.post("/save", (req,res) => {
    let data = {
        id_alpro: req.body.id_alpro,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        jam: req.body.jam,
        ipaddress_alpro: req.body.ipaddress_alpro,
        hostname_alpro: req.body.hostname_alpro,
        cpu: req.body.cpu,
        disk: req.body.disk,
        memory: req.body.memory
    }
    let message = ""

    let sql = "insert into alpro set ?"
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

// POST: /alpro/update --> end point untuk update data alpro
app.post("/update", (req,res) => {
    let data = [{
        id_alpro: req.body.id_alpro,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        jam: req.body.jam,
        ipaddress_alpro: req.body.ipaddress_alpro,
        hostname_alpro: req.body.hostname_alpro,
        cpu: req.body.cpu,
        disk: req.body.disk,
        memory: req.body.memory
    }, req.body.id_alpro]
    let message = ""

    let sql = "update alpro set ? where id_alpro = ?"
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

// DELETE: /alpro/:id_alpro --> end point untuk hapus data alpro
app.delete("/:id_alpro", (req,res) => {
    let data = {
        id_alpro : req.params.id_alpro
    }
    let message = ""
    let sql = "delete from alpro where ?"
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
