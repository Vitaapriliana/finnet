const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /jadwal --> end point untuk mengakses data jadwal
app.get("/jadwal", (req,res) => {
    let sql = "select * from jadwal"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                jadwal: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })

    
})


// POST: /jadwal/save --> end point untuk insert data jadwal
app.post("/jadwal/save", (req,res) => {
    let data = {
        id_tanggal: req.body.id_tanggal,
        nama_pegawai: req.body.nama_pegawai
    }
    let message = ""

    let sql = "insert into jadwal set ?"
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

// POST: /jadwal/update --> end point untuk update data jadwal
app.post("/jadwal/update", (req,res) => {
    let data = [{
        id_tanggal: req.body.id_tanggal,
        nama_pegawai: req.body.nama_pegawai
    }, req.body.id_tanggal]
    let message = ""

    let sql = "update jadwal set ? where id_tanggal = ?"
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

// DELETE: /jadwal/:id_tanggal --> end point untuk hapus data jadwal
app.delete("/jadwal/:id_tanggal", (req,res) => {
    let data = {
        id_tanggal : req.params.id_tanggal
    }
    let message = ""
    let sql = "delete from jadwal where ?"
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