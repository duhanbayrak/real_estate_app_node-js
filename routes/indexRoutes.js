const express = require('express'),
    router = express.Router(),
    Ilan = require("../models/ilanModel"),
    AboutText = require("../models/aboutTextModel"),
    Contact = require("../models/contactModel"),
    Agent = require("../models/agentModel")

router.get('/', function (req, res) {

    Ilan.find({}, '', function (errorOne, dataOne) {
        if (errorOne)
            throw new Error(errorOne);
        Contact.findById("61520c29ca5990040f5e530d", function (errorTwo, dataTwo) {
            if (errorTwo)
                throw new Error(errorTwo);
            res.render("index", {
                ilan: dataOne,
                contact: dataTwo
            });

        });
    });

});
router.post('/ilanGetir', function (req, res) {
    const ilanNo = req.body.ilanNo,
        kategori = req.body.kategori,
        emlakTuru = req.body.emlakTuru,
        il = req.body.il,
        ilce = req.body.ilce,
        oda_sayisi = req.body.oda_sayisi;

    Ilan.find({
        $or: [

            { ilan_no: { "$in": [ilanNo] } },
            { durum: { "$in": [kategori] } },
            { il: { "$in": [il] } },
            { ilce: { "$in": [ilce] } },
            { oda_sayisi: { "$in": [oda_sayisi] } }

        ]
    }, function (errorOne, dataOne) {
        if (dataOne == "") {
            res.send("<h1 style='color:green; text-align:center;margin-top:25%;'>Aradığınız kriterlere uygun ilan bulunamadı!!!</h1> <h2 style='text-align:center;'><a style='text-decoration:none; color:blue; ' href='/'>Anasayfaya dön</a></h2>");
        }
        if (errorOne)
            throw new Error(errorOne);
        Contact.findById("61520c29ca5990040f5e530d", function (errorTwo, dataTwo) {
            if (errorTwo)
                throw new Error(errorTwo);
            res.render("searchAds", {
                ilan: dataOne,
                contact: dataTwo
            });

        });
    });

});

router.get('/about', function (req, res) {
    AboutText.findById("6150d928533fd7212d016af4", '', function (errorOne, dataOne) {
        if (errorOne)
            throw new Error(errorOne);
        Contact.findById("61520c29ca5990040f5e530d", function (errorTwo, dataTwo) {
            if (errorTwo)
                throw new Error(errorTwo);
            res.render("about", {
                aboutText: dataOne,
                contact: dataTwo
            });

        });
    });

});
router.get('/contact', function (req, res) {
    Contact.findById("61520c29ca5990040f5e530d")
        .then((result) => {
            res.render("contact", { contact: result })
        }).catch((err) => {
            console.log(err)
        });

});
router.get('/allAds', function (req, res) {

    Ilan.find({}, '', function (errorOne, dataOne) {
        if (errorOne)
            throw new Error(errorOne);
        Contact.findById("61520c29ca5990040f5e530d", function (errorTwo, dataTwo) {
            if (errorTwo)
                throw new Error(errorTwo);
            res.render("allAds", {
                ilan: dataOne,
                contact: dataTwo
            });

        });
    });
});
router.get("/adsDetail/:id", (req, res) => {
    const id = req.params.id;
    Ilan.findById(id, '', function (errorOne, dataOne) {
        if (errorOne)
            throw new Error(errorOne);
        Contact.findById("61520c29ca5990040f5e530d", function (errorTwo, dataTwo) {
            if (errorTwo)
                throw new Error(errorTwo);
            res.render("adsDetail", {
                ilan: dataOne,
                contact: dataTwo
            });

        });
    });
});
router.get("/team", (req, res) => {

    Agent.find(function (errorOne, dataOne) {
        if (errorOne)
            throw new Error(errorOne);
        Contact.findById("61520c29ca5990040f5e530d", function (errorTwo, dataTwo) {
            if (errorTwo)
                throw new Error(errorTwo);
            res.render("ekip", {
                agents: dataOne,
                contact: dataTwo
            });

        });
    });
});












module.exports = router;