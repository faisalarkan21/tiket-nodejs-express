var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tiket_sbd_bener',

});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});






exports.daftar = function (req, res) {

    res.render('user/daftar');




};


exports.mendaftar = function (req, res, next) {


    var insertPembeli = {

        nm_pembeli: req.body.nama,
        hp_pembeli: req.body.hp,
        gd_pembeli: req.body.gd,
        email_pembeli: req.body.email,
        password: req.body.password



    };

    var waktu = new Date();

    console.log(waktu);

    //masukin nama, hp,gender,email, password

    var query = connection.query("INSERT INTO pembeli set ? ", insertPembeli, function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }



    });

    //masukin date
    var query = connection.query("INSERT INTO tgl_pesan set tgl_order = ?", waktu, function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }



    });
    //masukin harga, status
    var namaTiket;

    if (req.body.namaJenis == "1") {

        namaTiket = "TK01";

    } else if (req.body.namaJenis == "2") {

        namaTiket = "TK02"

    } else if (req.body.namaJenis == "3") {

        namaTiket = "TK03"

    } else {

        namaTiket = "Engga ada"

    }



    var insertDetail = {



        harga_satuan: req.body.satuan,
        jenis_tk: namaTiket,
        jml_tiket: req.body.jmlTiket,
        harga_total: req.body.totalHarga,



    };

    /*
    console.log(req.body.satuan);
    console.log(namaTiket);
    console.log(req.body.jmlTiket);
    console.log(req.body.totalHarga);

    */

    var query = connection.query("INSERT INTO detil_pesan_tiket set  ?", insertDetail, function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }




    });


    res.redirect('/login');

}



exports.login = function (req, res, next) {
    if (req.session.namaSession) {

        res.redirect("profile");

    } else {

        res.render('user/login');

    };
};




exports.membuktikan = function (req, res, next) {



    var query = connection.query("select * from pembeli where email_pembeli = ? ", req.body.email, function (err, data) {



        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }


        // console.log(data);


        if (data.length < 1) {

            res.render('user/login', {
                error: "has-error is-empty",
                data: "<label class='control-label' id='error' >Data tidak ada didalam database</label>"
            });

        } else if ((req.body.email === data[0].email_pembeli) && (req.body.password === data[0].password)) {

            req.session.namaSession = data[0].email_pembeli;
            req.session.nomor_pembeli = data[0].id_pembeli;
            req.session.namaPembeli = data[0].nm_pembeli;
            res.redirect('profile');


        } else {

            res.render('user/login', {
                error: "has-error is-empty",
                data: "<label class='control-label' id='error' >Password anda salah</label>"
            });

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



        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        res.render("user/halamanUser/profile", {
            nama: req.session.namaSession,
            namaPembeli: data[0].nm_pembeli
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

                var arrayKosong = [];

                var arrayPengisi = {

                    prefix: 'TK',
                    id_pembeli: null,
                    harga_satuan: null,
                    uang_transfer: null,
                    jenis_tk: null,
                    jml_tiket: null,
                    harga_total: null,
                    status: null

                }

                for (var z = 1; z < detail[0].jml_tiket; z++) {

                    arrayKosong.push(arrayPengisi);

                }


                var query = connection.query("select * from pembeli_sekunder where email_utama = ? ", req.session.namaSession, function (err, pembeliSekunder) {

                    if (err) {
                        console.log(err);
                        return next("Error Query pembeliSekunder ! ");
                    }


                    /// last time 20:29


                    var pembeliSekunderJson = JSON.stringify(pembeliSekunder);
                    console.log(pembeliSekunderJson);


                    //khusus tiket  // gagal
                    var tiketKeterangan;

                    if (detail[0].jenis_tk == "TK01") {

                        tiketKeterangan = "TK01 - TIKET PREMIUM";

                    } else if (detail[0].jenis_tk == "TK02") {

                        tiketKeterangan = "TK02 - TIKET GOLD";

                    } else {

                        tiketKeterangan = "TK03 - TIKET SILVER";

                    }


                    // test array kosong nya ada apa kaga!
                    // console.log(arrayKosong);

                    res.render("user/halamanUser/validasiUser", {
                        nama: req.session.namaSession,
                        emailUtama: pembeli[0],
                        tiket: tiketKeterangan,
                        generate_tiket: arrayKosong,
                        pembeli_sekunder: pembeliSekunderJson
                    });



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

    var namaTiket;

    if (req.body.namaJenis == "1") {

        namaTiket = "TK01";

    } else if (req.body.namaJenis == "2") {

        namaTiket = "TK02"

    } else if (req.body.namaJenis == "3") {

        namaTiket = "TK03"

    } else {

        namaTiket = "Engga ada"

    }



    // console.log("hasil : ");
    // console.log(id);


    var updatePembeliUtama1 = {

        nm_pembeli: req.body.namaUtama,
        hp_pembeli: req.body.hpUtama,
        email_pembeli: req.body.emailUtama


    };


    var insertPembeliSekunder2 = {

        email_utama: req.body.emailUtama,
        nm_pembeli: req.body.nama2,
        hp_pembeli: req.body.hp2,
        email_sekunder: req.body.email2,
        jenis_tk: req.body.jk_utama


    };


    var insertPembeliSekunder3 = {

        email_utama: req.body.emailUtama,
        nm_pembeli: req.body.nama3,
        hp_pembeli: req.body.hp3,
        email_sekunder: req.body.email3,
        jenis_tk: req.body.jk_utama


    };

    var insertPembeliSekunder4 = {

        email_utama: req.body.emailUtama,
        nm_pembeli: req.body.nama4,
        hp_pembeli: req.body.hp4,
        email_sekunder: req.body.email4,
        jenis_tk: req.body.jk_utama


    };
    var insertPembeliSekunder5 = {

        email_utama: req.body.emailUtama,
        nm_pembeli: req.body.nama5,
        hp_pembeli: req.body.hp5,
        email_sekunder: req.body.email5,
        jenis_tk: req.body.jk_utama


    };



    // Masuk Pembeli Utama
    // console.log(updatePembeliUtama);

    var query = connection.query("update pembeli set ? where id_pembeli =  ?", [updatePembeliUtama1, req.session.nomor_pembeli], function (err, rows) {

        if (err) {
            console.log(err);
            return next("Mysql error, check your query");
        }

        console.log("update Bisa !! Utama");

        // req.session.namaSession = rows[0].email_pembeli;



    });



    var query = connection.query("select * from pembeli_sekunder where email_utama = ? ", req.session.namaSession, function (err, pembeliSekunder, call) {

        if (err) {
            console.log(err);
            return next("Error Query pembeliSekunder ! ");
        }


        console.log("disini console id");
        console.log();

        // Pembeli Sekunder

        // console.log("Debug Jam 11 Malam");
        // console.log("nilai Ada : ");
        // console.log(insertPembeliSekunder2);

        // console.log("Nilai kaga ada : ");
        // console.log(insertPembeliSekunder5);

        // persimpangan ,, update dan insert !

        /*  kunci nya pakek try klo abis select pembeliSekunder
            hasilnya undefined masuk ke block catch broh!
            undefined maksudnya engga ada itu record 
            klo recordnya ada masuk blok update!
            dan engga udefinied
        
                                */
        try {

            console.log("Kena Blok update! ");

            // STUCK DISINI! 22:05 SABTU 12 Nov
            // Parameter kedatabase Nya JANGAN EMAIL cari yang lain!!

            //dev 
            if (insertPembeliSekunder2.nm_pembeli != undefined) {

                var query = connection.query("update pembeli_sekunder set ? where id =  ?", [insertPembeliSekunder2, pembeliSekunder[0].id], function (err, rows) {

                    if (err) {
                        console.log(err);
                        return next("Mysql error, check your query");
                    }

                    console.log("Update sekunder 2");

                    // req.session.namaSession = rows[0].email_pembeli;
                });

                // akhir update sek 2

                if (insertPembeliSekunder3.nm_pembeli != undefined) {


                    var query = connection.query("update pembeli_sekunder set ? where id =  ?", [insertPembeliSekunder3, pembeliSekunder[1].id], function (err, rows) {

                        if (err) {
                            console.log(err);
                            return next("Mysql error, check your query");
                        }

                        console.log("Update sekunder 3");

                        // req.session.namaSession = rows[0].email_pembeli;
                    });
                    // akhir update sek 3

                    if (insertPembeliSekunder4.nm_pembeli != undefined) {

                        var query = connection.query("update pembeli_sekunder set ? where id =  ?", [insertPembeliSekunder4, pembeliSekunder[2].id], function (err, rows) {

                            if (err) {
                                console.log(err);
                                return next("Mysql error, check your query");
                            }

                            console.log("Update sekunder 4");

                            // req.session.namaSession = rows[0].email_pembeli;
                        });
                        // akhir update sek 4

                        if (insertPembeliSekunder5.nm_pembeli != undefined) {

                            var query = connection.query("update pembeli_sekunder set ? where id =  ?", [insertPembeliSekunder5, pembeliSekunder[3].id], function (err, rows) {

                                if (err) {
                                    console.log(err);
                                    return next("Mysql error, check your query");
                                }

                                console.log("Update sekunder 5");

                                // req.session.namaSession = rows[0].email_pembeli;
                            });
                            // akhir update sek 5


                        } else {

                            console.log("pembeli sekunder full 4 + 1  emaail utama = 5");

                        }



                    } else {

                        console.log("pembeli sekunder cuma 3");
                    }

                } else {

                    console.log("Pembeli sekunder cuma 2");

                }



            } else {

                console.log("Pembeli sekunder cuma 1");

            }




            // end dev





        } catch (err) {

            console.log(err);
            console.log("Kena Insert !");
            //last disiiiiiiiiiiniiii
            if (insertPembeliSekunder2.nm_pembeli != undefined) {

                var query = connection.query("INSERT INTO pembeli_sekunder set ? ", insertPembeliSekunder2, function (err, rows) {

                    if (err) {
                        console.log(err);
                        return next("Error Di sekunder Level 1 ");
                    }



                });

                // bates query level 1

                if (insertPembeliSekunder3.nm_pembeli != undefined) {


                    var query = connection.query("INSERT INTO pembeli_sekunder set ? ", insertPembeliSekunder3, function (err, rows) {

                        if (err) {
                            console.log(err);
                            return next("Error Di sekunder Level 2 ");
                        }



                    });
                    // bates query level 2

                    if (insertPembeliSekunder4.nm_pembeli != undefined) {

                        var query = connection.query("INSERT INTO pembeli_sekunder set ? ", insertPembeliSekunder4, function (err, rows) {

                            if (err) {
                                console.log(err);
                                return next("Error Di sekunder Level 3 ");
                            }



                        });
                        // bates query level 3

                        if (insertPembeliSekunder5.nm_pembeli != undefined) {

                            var query = connection.query("INSERT INTO pembeli_sekunder set ? ", insertPembeliSekunder4, function (err, rows) {

                                if (err) {
                                    console.log(err);
                                    return next("Error Di sekunder Level 4 Alias Akhir ");
                                }



                            });


                        } else {

                            console.log("pembeli sekunder full 4 + 1  emaail utama = 5");

                        }



                    } else {

                        console.log("pembeli sekunder cuma 3");
                    }

                } else {

                    console.log("Pembeli sekunder cuma 2");

                }



            } else {

                console.log("Pembeli sekunder cuma 1");

            }



        }

        //    console.log(pembeliSekunder);


    });











    res.redirect("/user/data");





}


exports.ketentuan = function (req, res) {


    res.render('user/halamanUser/ketentuan');



};



exports.tiket = function (req, res) {


    var query = connection.query("select * from pembeli where id_pembeli = ? ", req.session.nomor_pembeli, function (err, pembeli) {

        if (err) {
            console.log(err);
            return next("Error Query Level 1, Pembeli ");
        }


        var query2 = connection.query("select * from detil_pesan_tiket where id_pembeli = ?", pembeli[0].id_pembeli, function (err, detail) {


            if (err) {
                console.log(err);
                return next("Error Query Level 2, Detail");
            }

            var tiketKeterangan;

            if (detail[0].jenis_tk == "TK01") {

                tiketKeterangan = "TK01 - TIKET PREMIUM";

            } else if (detail[0].jenis_tk == "TK02") {

                tiketKeterangan = "TK02 - TIKET GOLD";

            } else {

                tiketKeterangan = "TK03 - TIKET SILVER";

            }


            res.render("user/halamanUser/validasitiket", {
                nama: req.session.namaSession,
                emailUtama: pembeli[0],
                tiket: tiketKeterangan
            });

        });
    });


}




exports.keluar = function (req, res) {


    req.session.destroy();


    res.redirect('/');


};


exports.cobaGet = function (req, res) {


    res.render("dev");


}



// dev

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

            res.render('user/admin/login-admin', {
                error: "has-error is-empty",
                data: "<label class='control-label' id='error' >Data tidak ada didalam database</label>"
            });

        } else if ((req.body.email === data[0].email_admin) && (req.body.password === data[0].pass_admin)) {

            req.session.admin = true;
            req.session.namaSession = data[0].email_admin;
            req.session.nomor_pembeli = data[0].id_admin;
            req.session.namaAdmin = data[0].nm_admin;
            res.redirect('dashboard');


        } else {

            res.render('user/admin/login-admin', {
                error: "has-error is-empty",
                data: "<label class='control-label' id='error' >Password anda salah</label>"
            });

        }



    });
}


exports.adminDashboard = function (req,res){


    res.render('user/admin/dashboard' , {email : req.session.namaSession, nama : req.session.namaAdmin});


};