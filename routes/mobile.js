var mysql = require('mysql');
var nodemailer = require('nodemailer');
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

var connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'arkan14811', database: 'bootcamp_node'});

/*

API Mobile

*/

function toRp(angka) {
    var rev = parseInt(angka, 10)
        .toString()
        .split('')
        .reverse()
        .join('');
    var rev2 = '';
    for (var i = 0; i < rev.length; i++) {
        rev2 += rev[i];
        if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
            rev2 += '.';
        }
    }
    return 'Rp. ' + rev2
        .split('')
        .reverse()
        .join('') + ',00';
}

exports.loginMobile = function (req, res, next) {

    console.log(req.body);
    var query = connection.query("select * from pembeli where email_pembeli = ? ", req.body.email, function (err, data) {

        console.log(data);
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        if (data.length < 1) {

            console.log({status: 'Username Tidak ditemukan.'});

            res.json({id_pembeli: '', nm_pembeli: '', email_pembeli: '', isValid: false});

        } else {

            var bytes = CryptoJS
                .AES
                .decrypt(data[0].password, 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // console.log(decryptedData);

            if ((req.body.email === data[0].email_pembeli) && (req.body.password === decryptedData)) {

                console.log({status: 'Login berhasil.'});

                res.json({id_pembeli: data[0].id_pembeli, nm_pembeli: data[0].nm_pembeli, email_pembeli: data[0].email_pembeli, isValid: true});

            } else {

                console.log({status: 'Id / password salah.'});

                res.json({id_pembeli: '', nm_pembeli: '', email_pembeli: '', isValid: false});

            }
        }
    });
};

exports.dataUserMobile = function (req, res) {

    var query = connection.query("select * from pembeli where id_pembeli = ? ", req.params.id, function (err, pembeli) {

        if (err) {
            console.log(err);
            return next("Error Query Level 1, Pembeli ");
        }

        req.session.namaSession = pembeli[0].email_pembeli;

        console.log(pembeli[0]);

        var query2 = connection.query("select * from detil_pesan_tiket where id_pembeli = ?", pembeli[0].id_pembeli, function (err, detail) {

            if (err) {
                console.log(err);
                return next("Error Query Level 2, Detail");
            }

            let isPaid = detail[0].uang_transfer;
            console.log(isPaid);

            let hargaTiketRp = toRp(detail[0].harga_tiket);

            let status = pembeli[0].email_verification === 1
                ? ''
                : 'Anda Belum Verifikasi Email.';

            let result = {
                dataPembeli: pembeli[0],
                detailPembeli: detail[0],
                hargaTiketRp,
                status,
                isPaid
            }

            res.json({result});
        })
    });
}

exports.dataUserMobilePost = function (req, res) {

    var updateUser = {

        nm_pembeli: req.body.nama,
        email_pembeli: req.body.email,
        hp_pembeli: req.body.hp
    }

    var query = connection.query("update pembeli set ? where id_pembeli =  ?", [
        updateUser, req.params.id
    ], function (err, rows) {

        var query = connection.query("update pembeli_validasi set ? where id_pembeli =  ?", [
            updateUser, req.params.id
        ], function (err, rows) {

            let success = true;

            if (err) {
                console.log(err);
                return res.json({success: false})
            }
            console.log({success});

            res.json({success})
        });
    });

}

exports.tiketValidasi = function (req, res) {

    var query = connection.query("select * from pembeli_validasi where id_pembeli =  ?", req.params.id, function (err, validasi) {

        if (err) {

            console.log(err);
            return next("Error validasi Level 1, Pembeli ");
        }

        var query1 = connection.query("select * from pembeli where id_pembeli = ? ", req.params.id, function (err, pembeli) {

            if (err) {
                console.log(err);
                return next("Error Query Level 1, Pembeli ");
            }

            var query2 = connection.query("select * from detil_pesan_tiket where id_pembeli = ?", req.params.id, function (err, detail) {

                if (err) {
                    console.log(err);
                    return next("Error Query Level 2, Detail");
                }

                var statusKirim;
                if (validasi[0].uang_transfer_validasi) {
                    statusKirim = true;
                } else {
                    statusKirim = false;
                }

                let hargaTiketRp = toRp(detail[0].harga_tiket);

                let result = {
                    dataPembeli: pembeli[0],
                    detailPembeli: detail[0],
                    hargaTiketRp,
                    statusValidasi: statusKirim
                }
                console.log(result);

                res.json({result});

            });
        });

    });

}

exports.tiketValidasiPost = function (req, res) {

    let success = true;
    updateValidasi = {
        uang_transfer_validasi: 500000,
        pilihan_bank: req.body.pilihan_bank
    }

    var query = connection.query("update pembeli_validasi set ?  where id_pembeli =  ?", [
        updateValidasi, req.params.id
    ], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({success: false})

        }

        res.json({success})

    });
}

exports.jadwalKs = function (req, res) {

    var query = connection.query("select * from kursus where id_kursus=?", req.params.id, function (err, kursus) {

        if (err) {
            console.log(err);
        }
        var query = connection.query("select * from trainer where id_kursus=?", req.params.id, function (err, trainer) {

            if (err) {
                console.log(err);
            }

            var query = connection.query("select * from periode", function (err, dataJadwal) {

                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                var today = new Date();

                var idBatch;
                var pendaftaranOpen;
                var pendaftaranClose;
                var batchDimulai;
                var batchSelesai;

                if ((today >= dataJadwal[0].tgl_daftar_mulai) && (today <= dataJadwal[0].tgl_daftar_selesai)) {
                    let pendaftaranBuka = new Date(dataJadwal[0].tgl_daftar_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[0].tgl_daftar_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[0].tgl_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[0].tgl_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');

                    idBatch = 1;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk batch 1");

                } else if ((today >= dataJadwal[1].tgl_daftar_mulai) && (today <= dataJadwal[1].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[1].tgl_daftar_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[1].tgl_daftar_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[1].tgl_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[1].tgl_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');

                    idBatch = 2;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk batch 2");

                } else if ((today >= dataJadwal[2].tgl_daftar_mulai) && (today <= dataJadwal[2].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[2].tgl_daftar_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[2].tgl_daftar_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[2].tgl_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[2].tgl_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');

                    idBatch = 3;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk minggu 4");

                } else if ((today >= dataJadwal[3].tgl_daftar_mulai) && (today <= dataJadwal[3].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[3].tgl_daftar_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[3].tgl_daftar_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[3].tgl_mulai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[3].tgl_selesai)
                        .toLocaleDateString()
                        .slice(0, 10)
                        .replace('T', ' ');

                    idBatch = 4;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk minggu 4");

                }

                let result = {
                    materi: kursus[0].materi_kursus,
                    minggu: kursus[0].id_kursus,
                    ListTrainer: trainer,
                    idBatch: idBatch,
                    ksBegin: batchDimulai,
                    ksEnd: batchSelesai
                }

                console.log({result: result});

                res.json({result});
            });
        });
    });
}

exports.mendaftarMobile = function (req, res, next) {
    let success = false;
    var today = new Date();
    console.log(req.body);

    var query = connection.query("select * from periode", function (err, dataJadwal) {

        console.log(dataJadwal[1].tgl_daftar_selesai);
        console.log((today >= dataJadwal[1].tgl_daftar_mulai) && (today <= dataJadwal[1].tgl_daftar_selesai));

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        var idBatch;

        if ((today >= dataJadwal[0].tgl_daftar_mulai) && (today <= dataJadwal[0].tgl_daftar_selesai)) {

            idBatch = 1;
            console.log("masuk minggu 1");

        } else if ((today >= dataJadwal[1].tgl_daftar_mulai) && (today <= dataJadwal[1].tgl_daftar_selesai)) {

            idBatch = 2;
            console.log("masuk minggu 2");

        } else if ((today >= dataJadwal[2].tgl_daftar_mulai) && (today <= dataJadwal[2].tgl_daftar_selesai)) {

            idBatch = 3;
            console.log("masuk minggu 3");

        } else if ((today >= dataJadwal[2].tgl_daftar_mulai) && (today <= dataJadwal[3].tgl_daftar_selesai)) {

            idBatch = 4;
            console.log("masuk minggu 4");

        }

        var hash = SHA256(req.body.email);
        var ciphertext = CryptoJS
            .AES
            .encrypt(JSON.stringify(req.body.password), 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'node.bootcamp@gmail.com',
                pass: 'arkan14811'
            }
        });

        // Or using SMTP Pool if you need to send a large amount of emails


        // let host = "127.0.0.1";
	    let host = "142.44.163.129";

        var mailOptions = {
            from: "node.bootcamp@gmail.com", // sender address
            to: req.body.email,
            subject: 'Konfirmasi Email Peserta Node Bootcamp',
            text: `http://${host}:3000/verification/?token=${hash}`

        };

        console.log(mailOptions.text);

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                request.flash('success', 'Votre message à bien été envoyé.');
                response.redirect('/contacter-printwithlove');
            }
        });

        var insertPembeli = {

            nm_pembeli: req.body.nama,
            id_batch: idBatch,
            email_pembeli: req.body.email,
            password: ciphertext,
            hp_pembeli: req.body.hp,
            gd_pembeli: req.body.gd,
            motivasi_pembeli: req.body.motivasi,
            token_verification: hash

        };

        //masukin nama, hp,gender,email, password

        var query = connection.query("INSERT INTO pembeli set ? ", insertPembeli, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

        });

        var waktu = new Date();

        console.log(waktu);

        //masukin date
        var query = connection.query("INSERT INTO tgl_pesan set tgl_order = ?", waktu, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

        });

        var insertDetail = {

            harga_tiket: 500000,
            uang_transfer: 0,
            pilihan_bank: req.body.bank,
            status: "Belum Lunas"
        };

        /*
                console.log(req.body.satuan);
                console.log(namaTiket);
                console.log(req.body.jmlTiket);
                console.log(req.body.totalHarga);

                */

        var query = connection.query("INSERT INTO detil_pesan_tiket set ?", insertDetail, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

        });

        var insertPembeliValidasi = {

            nm_pembeli: req.body.nama,
            email_pembeli: req.body.email,
            hp_pembeli: req.body.hp
        };

        var query = connection.query("INSERT INTO pembeli_validasi set ?", insertPembeliValidasi, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }

            success = true;

            res.json({success})

        });

    });

    

   




}
