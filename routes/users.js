var mysql = require('mysql');
var nodemailer = require('nodemailer');
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arkan14811',
    database: 'bootcamp_node',

});




connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


exports.index = function (req, res) {


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


        // console.log(dataJadwal[3].tgl_daftar_mulai);



        if ((today >= dataJadwal[0].tgl_daftar_mulai) && (today <= dataJadwal[0].tgl_daftar_selesai)) {
            let pendaftaranBuka = new Date(dataJadwal[0].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[0].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[0].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[0].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 1;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk batch 1");

        } else if ((today >= dataJadwal[1].tgl_daftar_mulai) && (today <= dataJadwal[1].tgl_daftar_selesai)) {

            let pendaftaranBuka = new Date(dataJadwal[1].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[1].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[1].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[1].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 2;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk batch 2");


        } else if ((today >= dataJadwal[2].tgl_daftar_mulai) && (today <= dataJadwal[2].tgl_daftar_selesai)) {




            let pendaftaranBuka = new Date(dataJadwal[2].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[2].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[2].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[2].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 3;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk minggu 4");

        } else if ((today >= dataJadwal[3].tgl_daftar_mulai) && (today <= dataJadwal[3].tgl_daftar_selesai)) {

            let pendaftaranBuka = new Date(dataJadwal[3].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[3].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[3].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[3].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 4;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk minggu 4");

        }

        var query = connection.query("select COUNT(*) AS tiketCount FROM pembeli", function (err, countKuota) {

            let counting = 15 - countKuota[0].tiketCount;

            let htmlCountAvailable = `<label class="judul3 size" for="">Status Kuota Batch ${idBatch} Tersisa ${counting} Peserta <i style="padding-left:8px; padding-top:5px;" class="fa fa-user-circle-o" aria-hidden="true"></i>`;

            let htmlCountFull = `<label class="judul3 size" for="">Status Batch ${idBatch} Kuota Penuh <i style="padding-left:8px; padding-top:10px;" class="fa fa-user-circle-o" aria-hidden="true"></i>`;



            let isFull = counting > 0 ? htmlCountAvailable : htmlCountFull;
            let isFullLokasi = counting > 0 ? counting : 'Penuh';
            let isFullDisable = counting > 0 ? false : true;



            res.render('index', {
                idBatch: idBatch,
                batchDimulai: batchDimulai,
                batchSelesai: batchSelesai,
                pendaftaranOpen: pendaftaranOpen,
                pendaftaranClose: pendaftaranClose,
                countKuota: isFull,
                isDisable: isFullDisable,
                isFullLokasi
            });
        });
    })
}

exports.daftar = function (req, res) {

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



        if ((today >= dataJadwal[0].tgl_daftar_mulai) &&
            (today <= dataJadwal[0].tgl_daftar_selesai)) {
            let pendaftaranBuka = new Date(dataJadwal[0].tgl_daftar_mulai)
                .toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[0].tgl_daftar_selesai)
                .toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[0].tgl_mulai)
                .toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[0].tgl_selesai)
                .toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 1;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk batch 1");

        } else if ((today >= dataJadwal[1].tgl_daftar_mulai) &&
            (today <= dataJadwal[1].tgl_daftar_selesai)) {

            let pendaftaranBuka = new Date(dataJadwal[1]
                .tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[1]
                .tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[1]
                .tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[1]
                .tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 2;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk batch 2");


        } else if ((today >= dataJadwal[2].tgl_daftar_mulai) &&
            (today <= dataJadwal[2].tgl_daftar_selesai)) {




            let pendaftaranBuka = new Date(dataJadwal[2]
                .tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[2]
                .tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[2]
                .tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[2]
                .tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 3;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk minggu 4");

        } else if ((today >= dataJadwal[3].tgl_daftar_mulai) &&
            (today <= dataJadwal[3].tgl_daftar_selesai)) {

            let pendaftaranBuka = new Date(dataJadwal[3]
                .tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let pendaftaranTutup = new Date(dataJadwal[3]
                .tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let dimulaiKs = new Date(dataJadwal[3]
                .tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
            let selesaiKs = new Date(dataJadwal[3]
                .tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

            idBatch = 4;
            batchDimulai = dimulaiKs;
            batchSelesai = selesaiKs;
            pendaftaranOpen = pendaftaranBuka;
            pendaftaranClose = pendaftaranTutup;
            console.log("masuk minggu 4");

        }

        var query = connection.query("select COUNT(*) AS tiketCount FROM pembeli", function (err, countKuota) {

            console.log(15 - countKuota[0].tiketCount);

            counting = 15 - countKuota[0].tiketCount;

            if (counting === 0) {

                res.render('user/pendaftaran-full', {
                    idBatch: idBatch,
                    batchDimulai: batchDimulai,
                    batchSelesai: batchSelesai,
                    pendaftaranOpen: pendaftaranOpen,
                    pendaftaranClose: pendaftaranClose,
                    countKuota: 15 - countKuota[0].tiketCount

                });


            } else {

                res.render('user/daftar', {
                    idBatch: idBatch,
                    batchDimulai: batchDimulai,
                    batchSelesai: batchSelesai,
                    pendaftaranOpen: pendaftaranOpen,
                    pendaftaranClose: pendaftaranClose,
                    countKuota: 15 - countKuota[0].tiketCount

                });

            }



        });


    })
};

exports.mendaftar = function (req, res, next) {

    var today = new Date();
    console.log(today);

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
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(req.body.password), 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'node.bootcamp@gmail.com',
                pass: 'arkan14811'
            }
        });

        // Or using SMTP Pool if you need to send a large amount of emails

        var mailOptions = {
            from: "node.bootcamp@gmail.com", // sender address
            to: req.body.email,
            subject: 'Konfirmasi Email Peserta Node Bootcamp',
            text: `http://127.0.0.1:3000/verification/?token=${hash}`

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
            status: "Belum Lunas",



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
            hp_pembeli: req.body.hp,





        };





        var query = connection.query("INSERT INTO pembeli_validasi set ?", insertPembeliValidasi, function (err, rows) {

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }




        });


        res.redirect('/login');




    });




}


exports.login = function (req, res, next) {


    var query = connection.query("select COUNT(*) AS tiketCount FROM pembeli", function (err, countKuota) {


        let counting = 15 - countKuota[0].tiketCount;

        let htmlCountAvailable = `<label class="judul3 size" for="">Status Kuota Batch Tersisa ${counting} Peserta <i style="padding-left:8px; padding-top:5px;" class="fa fa-user-circle-o" aria-hidden="true"></i>`;

        let htmlCountFull = '<label class="judul3 size" for="">Status Kuota Penuh <i style="padding-left:8px;" class="fa fa-user-circle-o" aria-hidden="true"></i>';



        let isFull = counting > 0 ? htmlCountAvailable : htmlCountFull;
        let isFullDisable = counting > 0 ? false : true;

        if (req.session.namaSession) {

            res.redirect("profile");

        } else {

            res.render('user/login', {
                isDisable: isFullDisable


            });

        };
    });



};




exports.membuktikan = function (req, res, next) {



    var query = connection.query("select * from pembeli where email_pembeli = ? ", req.body.email, function (err, data) {



        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }



        if (data.length < 1) {

            res.render('user/login', {
                error: "has-error is-empty",
                data: "Password anda salah"
            });

        } else {

            var bytes = CryptoJS.AES.decrypt(data[0].password, 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData);

            if ((req.body.email === data[0].email_pembeli) && (req.body.password === decryptedData)) {

                console.log(data[0]);
                req.session.namaSession = data[0].email_pembeli;
                req.session.nomor_pembeli = data[0].id_pembeli;
                req.session.namaPembeli = data[0].nm_pembeli;
                res.redirect('profile');


            } else {

                res.render('user/login', {
                    error: "has-error is-empty",
                    data: "Password anda salah"
                });

            }

        }



        // //disini
        // if (!data) {

        //     console.log("kaga sama");
        //     res.render('user/login',{error: "has-error is-empty", data:"<label class='control-label' id='error' >Data anda tidak ada didalam database</label>"});


        // } else if (data.admin == false) {

        //     req.session.namaSession = data.email_pembeli;
        //     req.session.admin = data.admin;
        //     console.log(req.session);
        //     res.send("profile");


        // } else if (data.admin == true) {

        //     console.log("disini admin");
        //     req.session.namaSession = data.name;
        //     req.session.admin = data.admin;

        //     //test
        //     console.log(req.session);

        //     res.redirect('admin/dashboard');

        // }

    });
    // console.log(akun);
};



// bagian validasi

exports.profile = function (req, res) {


    var query = connection.query("select * from pembeli where email_pembeli = ? ", req.session.namaSession, function (err, data) {

        let status = data[0].email_verification === 1 ? '' : 'Anda Belum Verifikasi Email.';


        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        res.render("user/halamanUser/profile", {
            nama: req.session.namaSession,
            namaPembeli: data[0].nm_pembeli,
            status: status
        });

    });
}

exports.validasi = function (req, res) {

    //case looooopp hati2 


    // console.log("hereeeeeeee broh");

    // console.log(req.session.nomor_pembeli);



    var query = connection.query("select * from pembeli where id_pembeli = ? ", req.session.nomor_pembeli, function (err, pembeli) {

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


            let status = pembeli[0].email_verification === 1 ? '' : 'Anda Belum Verifikasi Email.';

            res.render("user/halamanUser/validasiUser", {
                nama: req.session.namaSession,
                emailUtama: pembeli[0],
                detailPembeli: detail[0],
                status,
                isPaid



            });



        })
        //akhir query lapis dua

    });
    // akhir query lapis satu



    // var query = connection.query("select * from pembeli_sekunder where email_utama = ? ", req.session.namaSession, function (err, pembeliSekunder) {

    //     if (err) {
    //         console.log(err);
    //         return next("Error Query Level 1, Pembeli ");
    //     }


    //     console.log(pembeliSekunder);

    //  });
    // akhir dari select sekunder


}




exports.validasiPost = function (req, res) {


    var updateUser = {

        nm_pembeli: req.body.nama,
        email_pembeli: req.body.email,
        hp_pembeli: req.body.hp




    }


    // Masuk Pembeli Utama
    // console.log(updatePembeliUtama);

    var query = connection.query("update pembeli set ? where id_pembeli =  ?", [updateUser, req.session.nomor_pembeli], function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log("update Bisa !! Utama");

        // req.session.namaSession = rows[0].email_pembeli;



    });



    res.redirect("/user/data");

}


exports.week = function (req, res) {


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
                    let pendaftaranBuka = new Date(dataJadwal[0].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[0].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[0].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[0].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 1;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk batch 1");

                } else if ((today >= dataJadwal[1].tgl_daftar_mulai) && (today <= dataJadwal[1].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[1].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[1].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[1].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[1].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 2;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk batch 2");


                } else if ((today >= dataJadwal[2].tgl_daftar_mulai) && (today <= dataJadwal[2].tgl_daftar_selesai)) {




                    let pendaftaranBuka = new Date(dataJadwal[2].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[2].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[2].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[2].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 3;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk minggu 4");

                } else if ((today >= dataJadwal[3].tgl_daftar_mulai) && (today <= dataJadwal[3].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[3].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[3].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[3].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[3].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 4;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk minggu 4");

                }






                // var stringDate = jadwal[0].tgl_mulai.toString();

                // var stringDate2 = jadwal[0].tgl_selesai.toString();

                // const ReBegin = stringDate.slice(3, 15);
                // const ReEnd = stringDate2.slice(3, 15);



                res.render('user/admin/jadwal_ks', {
                    email: req.session.namaSession,
                    nama: req.session.namaAdmin,
                    materi: kursus[0].materi_kursus,
                    minggu: kursus[0].id_kursus,
                    trainer: trainer,
                    idBatch: idBatch,
                    ReBegin: batchDimulai,
                    ReEnd: batchSelesai
                    // ReBegin: ReBegin,
                    // ReEnd: ReEnd
                });
            });
        });
    });
}


exports.weekUser = function (req, res) {

    console.log('week user')
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
                    let pendaftaranBuka = new Date(dataJadwal[0].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[0].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[0].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[0].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 1;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk batch 1");

                } else if ((today >= dataJadwal[1].tgl_daftar_mulai) && (today <= dataJadwal[1].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[1].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[1].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[1].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[1].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 2;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk batch 2");


                } else if ((today >= dataJadwal[2].tgl_daftar_mulai) && (today <= dataJadwal[2].tgl_daftar_selesai)) {




                    let pendaftaranBuka = new Date(dataJadwal[2].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[2].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[2].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[2].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 3;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk minggu 4");

                } else if ((today >= dataJadwal[3].tgl_daftar_mulai) && (today <= dataJadwal[3].tgl_daftar_selesai)) {

                    let pendaftaranBuka = new Date(dataJadwal[3].tgl_daftar_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let pendaftaranTutup = new Date(dataJadwal[3].tgl_daftar_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let dimulaiKs = new Date(dataJadwal[3].tgl_mulai).toLocaleDateString().slice(0, 10).replace('T', ' ');
                    let selesaiKs = new Date(dataJadwal[3].tgl_selesai).toLocaleDateString().slice(0, 10).replace('T', ' ');

                    idBatch = 4;
                    batchDimulai = dimulaiKs;
                    batchSelesai = selesaiKs;
                    pendaftaranOpen = pendaftaranBuka;
                    pendaftaranClose = pendaftaranTutup;
                    console.log("masuk minggu 4");

                }


                var query = connection.query("select * from pembeli where id_pembeli = ? ", req.session.nomor_pembeli, function (err, pembeli) {


                    let status = pembeli[0].email_verification === 1 ? '' : 'Anda Belum Verifikasi Email.';

                    // var stringDate = jadwal[0].tgl_mulai.toString();

                    // var stringDate2 = jadwal[0].tgl_selesai.toString();

                    // const ReBegin = stringDate.slice(3, 15);
                    // const ReEnd = stringDate2.slice(3, 15);



                    res.render('user/halamanUser/jadwal_ks', {
                        nama: req.session.namaSession,
                        namaPembeli: req.session.namaPembeli,
                        materi: kursus[0].materi_kursus,
                        minggu: kursus[0].id_kursus,
                        trainer: trainer,
                        idBatch: idBatch,
                        ReBegin: batchDimulai,
                        ReEnd: batchSelesai,
                        status: status
                        // ReEnd: ReEnd
                    });
                });
            });
        });
    });
}

exports.ketentuan = function (req, res) {

    var query = connection.query("select * from pembeli where id_pembeli = ? ", req.session.nomor_pembeli, function (err, pembeli) {

        let status = pembeli[0].email_verification === 1 ? '' : 'Anda Belum Verifikasi Email.';

        res.render('user/halamanUser/ketentuan', {
            nama: req.session.namaSession,
            namaPembeli: req.session.namaPembeli,
            status
        });

    });

};


exports.addTrainer = function (req, res) {



    res.render('user/admin/add_trainer', {
        email: req.session.namaSession,
        nama: req.session.namaAdmin
    });


}


exports.addTrainerPost = function (req, res) {
    var insertTrainer = {
        trainer_name: req.body.nama,
        trainer_email: req.body.email,
        trainer_hp: req.body.no_hp,
        trainer_gd: req.body.gd
    };
    var query = connection.query("INSERT INTO trainer set ?", insertTrainer, function (err, rows) {
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }
        res.redirect('/admin/dashboard/list_trainer');
    });
}


exports.list_trainer = function (req, res) {


    var query = connection.query("select * from trainer", function (err, listTrainer) {


        res.render('user/admin/list_trainer', {
            email: req.session.namaSession,
            nama: req.session.namaAdmin,
            listTrainer: listTrainer
        });

    });




};





exports.tiket = function (req, res) {


    var query = connection.query("select * from pembeli_validasi where id_pembeli =  ?", req.session.nomor_pembeli, function (err, validasi) {

        if (err) {

            console.log(err);
            return next("Error validasi Level 1, Pembeli ");
        }

        var query1 = connection.query("select * from pembeli where id_pembeli = ? ", req.session.nomor_pembeli, function (err, pembeli) {

            if (err) {
                console.log(err);
                return next("Error Query Level 1, Pembeli ");
            }


            var query2 = connection.query("select * from detil_pesan_tiket where id_pembeli = ?", pembeli[0].id_pembeli, function (err, detail) {


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



                let status = pembeli[0].email_verification === 1 ? '' : 'Anda Belum Verifikasi Email.';


                res.render("user/halamanUser/validasitiket", {
                    nama: req.session.namaSession,
                    emailUtama: pembeli[0],
                    detailTiket: detail[0],
                    validasiTable: validasi[0],
                    statusValidasi: statusKirim,
                    status
                });

            });
        });

    });


}




exports.keluar = function (req, res) {


    req.session = null;


    res.redirect('/');


};


exports.cobaGet = function (req, res) {


    var nama = req.body.nama;

    res.send("nama lau sadasdasdd " + nama);


}



// Admin

exports.adminLogin = function (req, res) {


    res.render('user/admin/login-admin');


}

exports.adminValidasi = function (req, res) {

    var query = connection.query('select * from admin where email_admin = ?  ', req.body.email, function (err, data) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        if (data.length < 1) {

            res.render('user/login', {
                error: "has-error is-empty",
                data: "Password anda salah"
            });

        } else {

            var bytes = CryptoJS.AES.decrypt(data[0].pass_admin, 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData);

            if ((req.body.email === data[0].email_admin) && (req.body.password === decryptedData)) {

                req.session.admin = true;
                req.session.namaSession = data[0].email_admin;
                req.session.nomor_pembeli = data[0].id_admin;
                req.session.namaAdmin = data[0].nm_admin;
                res.redirect('dashboard');


            } else {

                res.render('user/login', {
                    error: "has-error is-empty",
                    data: "Password anda salah"
                });

            }

        }

    });
}

//,pembeli_sekunder where email_pembeli = ? 
exports.adminDashboard = function (req, res) {

    var query = connection.query("select COUNT(*) AS tiketCount FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli", function (err, jumlahTiketTerjual) {

        // console.log(jumlahTiketTerjual[0].hitung);

        var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli ", function (err, pembeliWaiting) {

            var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE detil_pesan_tiket.uang_transfer = 500000 ", function (err, Lunas) {


                var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE detil_pesan_tiket.uang_transfer = 0 ", function (err, pembeliBelumLunas) {


                    var query = connection.query("SELECT SUM(detil_pesan_tiket.uang_transfer) AS totaltf FROM detil_pesan_tiket ", function (err, totalPendapatan) {

                        var query = connection.query("SELECT SUM(detil_pesan_tiket.harga_tiket) AS totalTiket FROM detil_pesan_tiket ", function (err, totalEstimasiPembeli) {


                            var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE pembeli_validasi.uang_transfer_validasi = 500000 ", function (err, validasiTiket) {


                                var query = connection.query("SELECT  * FROM  periode WHERE  tgl_daftar_mulai >= '2017-08-09' AND tgl_selesai  <= '2017-10-14'", function (err, jadwal) {


                                    var totalTiketTersedia = 15 - jumlahTiketTerjual[0].tiketCount;
                                    var sisaBelumdibayar = totalEstimasiPembeli[0].totalTiket - totalPendapatan[0].totaltf
                                    // var waitingTiket = 0;
                                    // waitingTiket =    pembeliWaiting[0].waitingCount;

                                    console.log(pembeliWaiting.length);


                                    function toRp(angka) {
                                        var rev = parseInt(angka, 10).toString().split('').reverse().join('');
                                        var rev2 = '';
                                        for (var i = 0; i < rev.length; i++) {
                                            rev2 += rev[i];
                                            if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
                                                rev2 += '.';
                                            }
                                        }
                                        return 'Rp. ' + rev2.split('').reverse().join('') + ',00';
                                    }





                                    res.render('user/admin/dashboard', {
                                        email: req.session.namaSession,
                                        nama: req.session.namaAdmin,
                                        jumlahTiketSold: jumlahTiketTerjual[0].tiketCount,
                                        jumlahTiketReady: totalTiketTersedia,
                                        waitingTiket: pembeliWaiting.length,
                                        tiketLunas: Lunas.length,
                                        tiketBelumLunas: pembeliBelumLunas.length,
                                        totalPendapatan: toRp(totalPendapatan[0].totaltf),
                                        totalEstimasiTIket: toRp(sisaBelumdibayar),
                                        jumlahKotakValidasi: validasiTiket.length,
                                        totalEstimasiPendapatan: toRp(jumlahTiketTerjual[0].tiketCount * 500000)

                                    });
                                });

                            });
                        });
                    });
                });

            });

        });


    })







};

exports.semuaUser = function (req, res) {

    var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli limit 60", function (err, pembeliSemua) {

        console.log(pembeliSemua);




        res.render('user/admin/semua-user', {
            email: req.session.namaSession,
            nama: req.session.namaAdmin,
            dataSemua: pembeliSemua,
            // validasi: pembeliValidasi 

        });





    })





};




exports.userLunas = function (req, res) {

    var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE detil_pesan_tiket.uang_transfer = 500000 limit 60", function (err, Lunas) {

        res.render('user/admin/user-lunas', {
            email: req.session.namaSession,
            nama: req.session.namaAdmin,
            userLunas: Lunas
        });
    });

}


exports.userBelumLunas = function (req, res) {

    var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE detil_pesan_tiket.uang_transfer = 0 limit 60", function (err, pembeliBelumLunas) {

        res.render('user/admin/user-belum-lunas', {
            email: req.session.namaSession,
            nama: req.session.namaAdmin,
            BelumLunas: pembeliBelumLunas
        });
    });

}

exports.waitingList = function (req, res) {

    var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli limit 60, 18446744073709551615", function (err, pembeliWaiting) {

        // console.log(pembeliWaiting < 1);

        var pembeliFilterAda, pembeliFilterNull;

        if (pembeliWaiting.length < 1) {

            pembeliFilterNull = "List Kosong Sampai saat ini kouta tiket masih dapat dipenuhi";

        } else {

            pembeliFilterAda = pembeliWaiting;

        }


        console.log(pembeliFilterAda);
        console.log(pembeliFilterNull);

        // if (pembeliSemua > )

        res.render('user/admin/user-waiting', {
            email: req.session.namaSession,
            nama: req.session.namaAdmin,
            pembeliFilterAda: pembeliFilterAda,
            filterNUll: pembeliFilterNull
        });
    });

}


/*

    Tempat /User

*/




exports.userDetail = function (req, res) {

    console.log(req.params.id);
    var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE pembeli.id_pembeli = ?", req.params.id, function (err, userDetail) {






        res.render("user/admin/user-detail", {
            userDetail: userDetail[0],
            email: req.session.namaSession,
            nama: req.session.namaAdmin




        });
        // console.log(user_gold);





    });
}


exports.userDetailPost = function (req, res) {



    function convertToAngka(rupiah) {
        return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10);
    }


    console.log('disni id ' + req.params.id);
    updateDetail = {


        uang_transfer: convertToAngka(req.body.uangtf)
    }

    console.log(updateDetail);


    var query = connection.query("update detil_pesan_tiket set ?  where id_pembeli =  ?", [updateDetail, req.params.id], function (err, data) {
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }
        console.log("Data Masuk");
    });

    res.redirect('/admin/dashboard/semua-user');


}






exports.tiketPost = function (req, res) {


    updateValidasi = {


        uang_transfer_validasi: 500000,
        pilihan_bank: req.body.namaBank
    }

    var query = connection.query("update pembeli_validasi set ?  where id_pembeli =  ?", [updateValidasi, req.session.nomor_pembeli], function (err, data) {
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }
        console.log("Data Masuk");
    });
    res.redirect('/user/validasi');
}


//admin kotak validasi 
exports.kotakValidasi = function (req, res) {

    var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE pembeli_validasi.uang_transfer_validasi = 500000 limit 60", function (err, validasi) {

        res.render('user/admin/kotak_validasi', {
            email: req.session.namaSession,
            nama: req.session.namaAdmin,
            userValidasi: validasi
        });
    });

}





exports.detailValidasi = function (req, res) {

    var id = req.params.id;

    var query = connection.query("select * from pembeli_validasi where id_pembeli=?", id, function (err, validasi) {

        if (err) {
            console.log(err);
        }

        var query2 = connection.query("select * from detil_pesan_tiket where id_pembeli=?", id, function (err, detail) {

            if (err) {
                console.log(err);

            }

            res.render("user/admin/detail_validasi", {
                userValidasi: validasi[0],
                detail_tiket: detail[0],
                email: req.session.namaSession,
                nama: req.session.namaAdmin
            });


        });
    });

}



exports.sendEmail = function (req, res) {

    var id = req.params.id;

    var query = connection.query("select * from pembeli_validasi where id_pembeli=?", id, function (err, validasi) {

        if (err) {
            console.log(err);
        }

        var query2 = connection.query("select * from detil_pesan_tiket where id_pembeli=?", id, function (err, detail) {

            if (err) {
                console.log(err);

            }

            function toRp(angka) {
                var rev = parseInt(angka, 10).toString().split('').reverse().join('');
                var rev2 = '';
                for (var i = 0; i < rev.length; i++) {
                    rev2 += rev[i];
                    if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
                        rev2 += '.';
                    }
                }
                return 'Rp. ' + rev2.split('').reverse().join('') + ',00';
            }

            res.render("user/admin/send-email", {
                userValidasi: validasi[0],
                detail_tiket: detail[0],
                email: req.session.namaSession,
                nama: req.session.namaAdmin,
                uangRp: toRp(detail[0].uang_transfer)
            });


        });
    });

}


exports.sendEmailAct = function (req, res) {


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'node.bootcamp@gmail.com',
            pass: 'arkan14811'
        }
    });

    // Or using SMTP Pool if you need to send a large amount of emails

    var mailOptions = {
        from: "node.bootcamp@gmail.com", // sender address
        to: req.body.emailTujuan,
        subject: req.body.subjek,
        html: req.body.contents

    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            request.flash('success', 'Votre message à bien été envoyé.');
            response.redirect('/contacter-printwithlove');
        }
    });

    res.end('{"success" : "Updated Successfully", "status" : 200}');


}

exports.deletePeserta = function (req, res) {


    var query4 = connection.query("delete from pembeli where id_pembeli=?", req.params.id, function (err, validasi) {

        if (err) {
            console.log(err);
        }

    });



    res.redirect('admin/dashboard/semua-user');


}

exports.trainerDetail = function (req, res) {




    console.log(req.params.id);
    var query = connection.query("select * FROM trainer WHERE trainer_id = ?", req.params.id, function (err, trainerDetail) {


        var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 1, function (err, getKs1) {
            console.log(getKs1[0].total);
            var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 2, function (err, getKs2) {

                var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 3, function (err, getKs3) {

                    var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 4, function (err, getKs4) {

                        let trainerJadwal = trainerDetail[0].id_kursus == null ? "Belum Ditentukan" : "Minggu Ke - " + trainerDetail[0].id_kursus;

                        console.log(trainerJadwal);
                        res.render("user/admin/trainer_detail", {
                            trainerDetail: trainerDetail[0],
                            email: req.session.namaSession,
                            nama: req.session.namaAdmin,
                            trainerJadwal: trainerJadwal,
                            getKs2: 3 - getKs2[0].total,
                            getKs1: 3 - getKs1[0].total,
                            getKs3: 3 - getKs3[0].total,
                            getKs4: 3 - getKs4[0].total

                        });
                    });
                });
            });

        });
    });
}

exports.trainerDetailFull = function (req, res) {


    console.log('error kena');
    console.log(req.query);

    var query = connection.query("select * FROM trainer WHERE trainer_id = ?", req.query.idTrainerError, function (err, trainerDetail) {


        var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 1, function (err, getKs1) {
            console.log(getKs1[0].total);
            var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 2, function (err, getKs2) {

                var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 3, function (err, getKs3) {

                    var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", 4, function (err, getKs4) {

                        let trainerJadwal = trainerDetail[0].id_kursus == null ? "Belum Ditentukan" : "Minggu Ke - " + trainerDetail[0].id_kursus;

                        console.log(trainerJadwal);
                        res.render("user/admin/trainer_detail", {
                            trainerDetail: trainerDetail[0],
                            email: req.session.namaSession,
                            nama: req.session.namaAdmin,
                            trainerJadwal: trainerJadwal,
                            getKs2: 3 - getKs2[0].total,
                            getKs1: 3 - getKs1[0].total,
                            getKs3: 3 - getKs3[0].total,
                            getKs4: 3 - getKs4[0].total,
                            messageError: req.query.messageError


                        });
                    });
                });
            });

        });
    });


}

exports.trainerDetailUpdate = function (req, res) {


    var updateJadwal = {

        trainer_name: req.body.nama,
        trainer_email: req.body.email,
        trainer_hp: req.body.no_hp,
        id_kursus: req.body.setJadwal




    }



    var query = connection.query("select count(*) as total FROM trainer WHERE id_kursus = ?", req.body.setJadwal, function (err, getCountKs) {


        if (getCountKs[0].total === 3) {

            res.redirect('/admin/dashboard/trainer/?idTrainerError=' + req.params.id + '&messageError=<label style="font-size:14px; margin-bottom:10px;  margin-top:10px; color:red !important;">Jadwal minggu ke - ' + req.body.setJadwal + ' sudah terisi penuh.</label>');

        } else {


            var query = connection.query("update trainer set ? where trainer_id =  ?", [updateJadwal, req.params.id], function (err, rows) {

                if (err) {
                    console.log(err);
                    return next("Mysql error, check your query");
                }


                res.redirect("/admin/dashboard/list_trainer");
                // req.session.namaSession = rows[0].email_pembeli;


            });


        }



    });




}




exports.trainerDetailDelete = function (req, res) {

    console.log(req.params);
    console.log("Kena");

    var query = connection.query("delete from trainer where trainer_id=?", req.params.id, function (err, validasi) {

        if (err) {
            console.log(err);
        }

    });



    res.redirect('admin/dashboard/list_trainer');


}


exports.rincianBootcamp = function (req, res) {


    res.render('user/admin/rincian_bootcamp', {
        email: req.session.namaSession,
        nama: req.session.namaAdmin,
    });


}


exports.verification = function (req, res) {

    console.log('kena');
    var updateVerification = {
        email_verification: 1,
        token_verification: ""
    }
    var query = connection.query("select * from pembeli where token_verification = ? ", req.query.token, function (err, data) {
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }
        var query = connection.query("update pembeli set ? where token_verification =  ?", [updateVerification, req.query.token], function (err, rows) {

            console.log(data);

            if (err) {
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(rows);
            req.session.namaSession = data[0].email_pembeli;
            req.session.nomor_pembeli = data[0].id_pembeli;
            req.session.namaPembeli = data[0].nm_pembeli;
            console.log(req.session.nomor_pembeli);
            console.log(data[0].id_pembeli);
            res.render("user/halamanUser/profile", {
                nama: req.session.namaSession,
                namaPembeli: req.session.namaPembeli
            });
        });
    })
}






/*

API Mobile 

*/


exports.loginMobile = function (req, res, next) {


    console.log(req.body)

    // not yet implemented

    var query = connection.query("select * from pembeli where email_pembeli = ? ", req.body.email, function (err, data) {
        
        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        if (data.length < 1) {

            res.json({
                id_pembeli: '',
                nm_pembeli: '',
                email_pembeli: '',
                isValid: false
            });

        } else {

            var bytes = CryptoJS.AES.decrypt(data[0].password, 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData);

            if ((req.body.email === data[0].email_pembeli) && (req.body.password === decryptedData)) {

                res.json({
                    id_pembeli: data[0].id_pembeli,
                    nm_pembeli: data[0].nm_pembeli,
                    email_pembeli: data[0].email_pembeli,
                    isValid: true
                });

            } else {

                res.json({
                    id_pembeli: '',
                    nm_pembeli: '',
                    email_pembeli: '',
                    isValid: false
                });

            }
        }
    });
};



exports.testing = function (req, res, next) {
   
let callback =  'Haiii ' + req.query.nama;
    console.log(req.query);
   res.json(callback);


    
};

exports.userDetailTest = function (req, res) {
    
        console.log(req.params.id);
        var query = connection.query("select * FROM pembeli INNER JOIN detil_pesan_tiket on pembeli.id_pembeli=detil_pesan_tiket.id_pembeli INNER JOIN pembeli_validasi on detil_pesan_tiket.id_pembeli=pembeli_validasi.id_pembeli WHERE pembeli.id_pembeli = ?", req.params.id, function (err, userDetail) {
    
    
    
    
    
    
            res.json({
                userDetail: userDetail[0],
                
    
    
    
    
            });
            // console.log(user_gold);
    
    
    
    
    
        });
    }


// nexmo.message.sendSms(
//   "Node Bootcamp 2017", req.body.no_hp, 'COba',
//     (err, responseData) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.dir(responseData);
//       }
//     }
//  );