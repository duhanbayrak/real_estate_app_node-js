const express = require('express'),
    router = express.Router(),
    Ilan = require("../models/ilanModel"),
    AboutText = require("../models/aboutTextModel"),
    Contact = require("../models/contactModel"),
    User = require("../models/userModel"),
    Message = require("../models/messageModel"),
    Agent = require("../models/agentModel"),
    nodemailer = require('nodemailer'),
    fs = require("fs"),
    path = require("path"),
    fileUpload = require("express-fileupload")



//------------------------------ ADMIN ------------------------------

router.get('/admin', isLoggedIn, function (req, res) {
    res.render('admin/adminPanel')
});

//------------------------------ İLAN EKLE ------------------------------

router.get('/ilanEkle', function (req, res) {
    res.render('admin/ilanEkle')
});
router.post('/ilanEkle', function (req, res) {

    let ilan_images = req.files.image;

    ilan_images.forEach(element => {
        element.mv(path.resolve(__dirname, '../public/images/ilan_images', element.name))
    });
    var image = []
    ilan_images.forEach(e => {
        image.push('images/ilan_images/' + e.name);
    })

    const newIlan = new Ilan({
        ...req.body,

        image: image
    });

    ilan_images.forEach(element => {
        console.log(image)

    });

    newIlan.save()
        .then((result) => {
            res.redirect("/ilanEkle")
        }).catch((err) => {
            console.log(err);
        });

});

//------------------------------ İLAN YÖNETİM ------------------------------

router.get('/ilan-yonetim', function (req, res) {
    Ilan.find()
        .then((result) => {
            res.render('admin/ilanYonetim', { ilan: result })
        }).catch((err) => {
            console.log(err);
        });
});

router.delete("/files/:id", (req, res) => {

    const id = req.params.id;
    Ilan.findByIdAndDelete(id)
        .then((result) => {

            if (result.image.length = !0) {
                result.image.forEach(element => {
                    const pathToFile = `public/${element}`
                    fs.unlink(pathToFile, function (err) {
                        if (err) {
                            throw err
                        }
                    })
                })
                res.redirect("/admin")
            }

        }).catch((err) => {
            console.log(err);
        });

})
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    Ilan.findById(id)
        .then((result) => {
            res.render('admin/editIlan', { ilan: result })

        }).catch((err) => {
            console.log(err);
        });
})

router.post("/edit/:id", (req, res) => {
    let ilan_images = req.files.image;

    ilan_images.forEach(element => {
        element.mv(path.resolve(__dirname, '../public/images/ilan_images', element.name))
    });
    var image = []
    ilan_images.forEach(e => {
        image.push('images/ilan_images/' + e.name);
    })

    const id = req.params.id;
    Ilan.findByIdAndUpdate(id, {

        ...req.body,
        image: image
    })
        .then((result) => {
            res.redirect('/admin')
            result.image.forEach(element => {
                const pathToFile = `./public/${element}`
                fs.unlink(pathToFile, function (err) {
                    if (err) {
                        throw err
                    }
                })
            })

        }).catch((err) => {
            console.log(err);
        });
})

//------------------------------ MESAJLAR ------------------------------

router.get('/messages', function (req, res) {
    Message.find().sort({ date: -1 })
        .then((result) => {
            res.render('admin/messages', { messages: result })
        }).catch((err) => {
            console.log(err);
        });
});

router.delete("/deleteMessage/:id", (req, res) => {

    const id = req.params.id;
    Message.findByIdAndDelete(id)
        .then((result) => {
            res.redirect("/messages")

        }).catch((err) => {
            console.log(err);
        });

});
router.post("/send", (req, res) => {
    const newMessage = new Message(req.body)
    newMessage.save()
        .then((result) => {
            res.redirect("/contact")
        }).catch((err) => {
            console.log(err);
        })

});
router.get('/answerMessage/:id', function (req, res) {
    const id = req.params.id
    Message.findById(id)
        .then((result) => {
            res.render('admin/answerMessage', { messages: result })
        }).catch((err) => {
            console.log(err);
        });
});
router.post('/answerMessage/:id', function (req, res) {
    const id = req.params.id;
    const answer = req.body.answer;
    Message.findById(id)
        .then((result) => {
            console.log(result.email)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'duhanbayrak6@gmail.com',
                    pass: 'ljydzklfelwtrtnl'
                }
            });

            var mailOptions = {
                from: 'duhanbayrak6@gmail.com',
                to: `${result.email}`,
                subject: 'Real Estate Message',
                text: `${answer}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.redirect("/admin")
                }
            });

        }).catch((err) => {
            console.log(err);
        });

});

//------------------------------ SAYFALAR ------------------------------

router.get("/sayfalar", isLoggedIn, (req, res) => {

    res.render("admin/sayfalar")

});

router.get("/aboutText", isLoggedIn, (req, res) => {
    AboutText.findById("6150d928533fd7212d016af4")
        .then((result) => {
            res.render("admin/aboutText", { aboutText: result })
        }).catch((err) => {
            console.log(err)
        });

});
router.post("/aboutText", (req, res) => {
    AboutText.findOneAndUpdate({ _id: "6150d928533fd7212d016af4" }, { aboutText: req.body.aboutText })
        .then((result) => {
            res.redirect("/admin")
        }).catch((err) => {
            console.log(err)
        });
});

router.get("/iletisimBilgileri", isLoggedIn, (req, res) => {
    Contact.findById("61520c29ca5990040f5e530d")
        .then((result) => {
            res.render("admin/iletisimBilgileri", { contact: result })
        }).catch((err) => {
            console.log(err)
        });

});

//------------------------------ KULLANICILAR ------------------------------

router.get("/kullanicilar", isLoggedIn, (req, res) => {

    User.find()
        .then((result) => {
            res.render("admin/kullanicilar", { kullanici: result })
        }).catch((err) => {
            console.log(err)
        });

});
router.delete("/deleteUser/:id", (req, res) => {

    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then((result) => {
            res.redirect("/admin")

        }).catch((err) => {
            console.log(err);
        });

})
router.get("/temsilciler", isLoggedIn, (req, res) => {

    Agent.find()
        .then((result) => {
            res.render("admin/temsilciler", { agents: result })
        }).catch((err) => {
            console.log(err)
        });
});
router.get("/addAgent", isLoggedIn, (req, res) => {

    res.render("admin/addAgent")

});

router.post("/addAgent", (req, res) => {

    let agentImage = req.files.agentImage;
    console.log(agentImage)
    agentImage.mv(path.resolve(__dirname, '../public/images/agent_images', agentImage.name))

    const newAgent = new Agent({
        ...req.body,
        agentImage: `images/agent_images/${agentImage.name}`
    })

    newAgent.save()
        .then((result) => {
            res.redirect("/temsilciler")
        }).catch((err) => {
            console.log(err);
        });

});

router.get("/editAgent/:id", isLoggedIn, (req, res) => {
    const id = req.params.id
    Agent.findById(id)
        .then((result) => {
            res.render("admin/editAgent", { agents: result })
        }).catch((err) => {
            console.log(err)
        });

});
router.post("/editAgent/:id", (req, res) => {

    const id = req.params.id
    let agentImage = req.files.agentImage;
    
    console.log(agentImage)
    agentImage.mv(path.resolve(__dirname, '../public/images/agent_images', agentImage.name))


    Agent.findByIdAndUpdate(id, {
        ...req.body,
        agentImage: `images/agent_images/${agentImage.name}`
    })
        .then((result) => {
            if (req.files.agentImage = ! "") {
                const pathToFile = `./public/${result.agentImage}`
                fs.unlink(pathToFile, function (err) {
                    if (err) {
                        throw err
                    }
                })
            }

            res.redirect("/temsilciler")
        }).catch((err) => {
            console.log(err);
        });

});

//---------- GİRİŞ KONTROL ----------

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}










module.exports = router;