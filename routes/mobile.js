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


/*

API Mobile 

*/

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

            res.json({
                id_pembeli: '',
                nm_pembeli: '',
                email_pembeli: '',
                isValid: false,
                statusAuth
            });

        } else {

            var bytes = CryptoJS.AES.decrypt(data[0].password, 'aa38bf3e39f6f9d51c84b02d583eb7ca57e5a1b4ed22b54380c77b9e45f4671a');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // console.log(decryptedData);

            if ((req.body.email === data[0].email_pembeli) && (req.body.password === decryptedData)) {
               
                console.log({status: 'Login berhasil.'});

                res.json({
                    id_pembeli: data[0].id_pembeli,
                    nm_pembeli: data[0].nm_pembeli,
                    email_pembeli: data[0].email_pembeli,
                    isValid: true
                });

            } else {

                console.log({status: 'Id / password salah.'});

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