const mongoose = require("mongoose");

const ilanSchema = new mongoose.Schema({
    fiyat:          { type: String, require: true },
    ilan_baslik:    { type: String, require: true },
    ilan_aciklama:  { type: String, require: true },
    il:             { type: String, require: true },
    ilce:           { type: String, require: true },
    ilan_no:        { type: String, require: true },
    ilan_tarihi:    { type: Date, default: Date.now },
    alan_brut:      { type: Number, require: true },
    alan_net:       { type: Number, require: true },
    oda_sayisi:     { type: String, require: true },
    bina_yasi:      { type: Number, require: true },
    bulundugu_kat:  { type: Number, require: true },
    kat_sayisi:     { type: Number, require: true },
    isitma:         { type: String, require: true },
    banyo_sayisi:   { type: Number, require: true },
    balkon:         { type: String, require: true },
    esyali:         { type: String, require: true },
    durum:          { type: String, require: true },
    emlak_turu:     { type: String, require: true },
    image:          { type: Array, require: true },


});

module.exports = mongoose.model("IlanModel", ilanSchema);

