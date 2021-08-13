const {
    Resident
} = require("../models/index")

class ResidentController {
    static homepage(req, res) {
        let obj = {nama: "Budi",umur: 16,kelas: 10}
        res.render('index.ejs', obj)
    }

    static getOne(req, res) {
        // res.send("getOne " + req.params.nik)

        if (!req.params.nik) {
            res.status(422).json({
                message: "errpr"
            })
        } else {
            Resident.findOne({where: {nik: req.params.nik}})
            .then((data => {
                res.status(200).json({
                    message: "getOne berhasil",
                    data: data
                })
            }))
            .catch((err) => {
                res.status(500).json({
                    message: "error",
                    log: err
                })
            })
        }
    }

    static getAll(req, res, next) {
        Resident.findAll()
            .then((data) => {
                res.status(200).json({
                    message: "get all success",
                    data: data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Internal Server Error",
                    log: err
                })
            })
    }

    static register(req, res, next) {
        const {
            name,
            nik,
            status,
            gender,
            birthdate
        } = req.body
        console.log(req.body);

        if (!name || !nik || !status || !gender || !birthdate) {
            res.status(422).json({
                message: "error data could not be processed"
            })
        } else {
            Resident.create({
                    name,
                    nik,
                    status,
                    gender,
                    birthdate
                })
                .then((data) => {
                    res.status(201).json({
                        message: "register success",
                        data: data
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Internal Server Error",
                        log: err
                    })
                })
        }
    }

    // Update belum ditambahkan code tebraru
    static update(req, res) {
        const {name,nik,status,gender,birthdate} = req.body
        const targetNik = req.params.nik

        if (!name || !nik || !status || !gender || !birthdate || !targetNik) {
            res.status(422).json({
                message: "error data could not be processed"
            })
        } else {
            Resident.update({name, nik, status, gender, birthdate}, {where: {nik: targetNik}})
            .then((data) => {
                res.status(200).json({
                    message: "update success",
                    data: data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Internal Server Error",
                    log: err
                })
            })
        }
    }

    static delete(req, res) {
        if (!req.params.nik) {
            res.status(422).json({
                message: "error data could not be processed"
            })
        } else {
            Resident.destroy({where: {nik: req.params.nik}})
            .then((data => {
                res.status(200).json({
                    message: "delete berhasil",
                    data: data
                })
            }))
            .catch((err) => {
                res.status(500).json({
                    message: "Internal server error",
                    log:err
                })
            })
        }
    }
}

module.exports = ResidentController