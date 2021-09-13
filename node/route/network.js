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

// GET: /network --> end point untuk mengakses data network
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

// POST: /network --> end point untuk pencarian data network
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from network where tanggal like '%"+find+"%'"
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

// POST: /network/save --> end point untuk insert data network
app.post("/save", (req,res) => {
    let data = {
        id_network: req.body.id_network,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        jam: req.body.jam,
        interkoneksi: req.body.interkoneksi,
        nama: req.body.nama,
        utilitas: req.body.utilitas,
        cpu: req.body.cpu,
        memory: req.body.memory
    }
    let message = ""

    let sql = "insert into network set ?"
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

// POST: /network/update --> end point untuk update data network
app.post("/update", (req,res) => {
    let data = [{
        id_network: req.body.id_network,
        tanggal: moment().format('YYYY-MM-DD HH:mm:ss'), // get current time
        shift: req.body.shift,
        jam: req.body.jam,
        interkoneksi: req.body.interkoneksi,
        nama: req.body.nama,
        utilitas: req.body.utilitas,
        cpu: req.body.cpu,
        memory: req.body.memory
    }, req.body.id_incident]
    let message = ""

    let sql = "update network set ? where id_network = ?"
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

// DELETE: /network/:id_network--> end point untuk hapus data network
app.delete("/:id_network", (req,res) => {
    let data = {
        id_network : req.params.id_network
    }
    let message = ""
    let sql = "delete from network where ?"
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