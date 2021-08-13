const {
    Resident
} = require("../models/index")

class ResidentController {
    static homepage(req, res) {
        res.send("masuk root")
    }

    static getOne(req, res) {
        res.send("getOne " + req.params.nik)
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

    static update(req, res) {
        res.send("update success " + req.params.nik)
    }

    static delete(req, res) {
        res.send("delete success " + req.params.nik)
    }
}

module.exports = ResidentController