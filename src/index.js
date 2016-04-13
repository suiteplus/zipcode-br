'use strict';

var fs = require('fs');
var arrayZipBand = [];
var jsonZipCode = [];
var arrayParsedZipcodeBr = [];

exports.parse = function (opts) {

    if (opts.zipBand.constructor != Array) {
        opts.zipBand = [opts.zipBand];
    }
    if (opts.location.constructor != Array) {
        opts.location = [opts.location];
    }

    switch (opts.config) {
        case 0:
            opts.zipBand.forEach(function (file) {

                let logData = fs.readFileSync(file, 'utf8');

                let text = logData.toString();
                decodeURIComponent(text);

                let lines = text.split('\n');

                lines.forEach(function (line) {
                    let parts = line.split('@');

                    if (parts[1] != undefined) {
                        let obJson = {
                            LOC_NU: parts[0],
                            LOC_CEP_INI: parts[1],
                            LOC_CEP_FIM: parts[2]

                        };
                        arrayZipBand.push(obJson);
                    }

                });


            });

            opts.location.forEach(function (file) {
                let logData = fs.readFileSync(file, 'utf8');


                let text = logData.toString();
                decodeURIComponent(text);

                let lines = text.split('\n');

                lines.forEach(function (line) {
                    let parts = line.split('@');

                    if (parts[1] != undefined) {

                        for (let i = 0; i < arrayZipBand.length; i++) {
                            if (parts[0] == arrayZipBand[i].LOC_NU) {
                                let aux = arrayZipBand[i];
                                jsonZipCode.push(aux);
                            }
                        }
                        if (jsonZipCode.length == 0) {
                            let obJson = {
                                LOC_NU: '',
                                LOC_CEP_INI: parts[3],
                                LOC_CEP_FIM: parts[3]

                            };
                            jsonZipCode.push(obJson);
                        }




                        for (let i = 0; i < jsonZipCode.length; i++) {
                            let obJson = {
                                LOC_NU: parts[0],
                                UFE_SG: parts[1],
                                LOC_NO: parts[2],
                                MUN_NU: parts[8],
                                LOC_CEP_INI: jsonZipCode[i].LOC_CEP_INI,
                                LOC_CEP_FIM: jsonZipCode[i].LOC_CEP_FIM
                            };

                            arrayParsedZipcodeBr.push(obJson);
                        }
                        jsonZipCode = [];

                    }


                });

            });
            break;
        case 1:

            opts.zipBand.forEach(function (file) {

                let logData = fs.readFileSync(file, 'utf8');

                let text = logData.toString();
                decodeURIComponent(text);

                let lines = text.split('\n');

                lines.forEach(function (line) {
                    let loc_nu = line.substring(13, 21);
                    let loc_cep_ini = line.substring(95, 103);
                    let loc_cep_fim = line.substring(104, 112);
                    let isNum = /^\d+$/.test(loc_nu);
                    if (loc_nu != undefined && isNum != false) {
                        let obJson = {
                            LOC_NU: loc_nu,
                            LOC_CEP_INI: loc_cep_ini,
                            LOC_CEP_FIM: loc_cep_fim

                        };
                        arrayZipBand.push(obJson);
                    }

                });


            });

            opts.location.forEach(function (file) {
                let logData = fs.readFileSync(file, 'utf8');


                let text = logData.toString();
                decodeURIComponent(text);

                let lines = text.split('\n');

                lines.forEach(function (line) {
                    let loc_nu = line.substring(11, 19);
                    let ufe_sg = line.substring(3, 5);
                    let loc_no = line.substring(19,91);
                    loc_no = loc_no.trim();
                    let mun_nu = line.substring(154, 161);
                    let isNum = /^\d+$/.test(loc_nu);
                    let uniqueZipcode = line.substring(91, 99);
                    if (loc_nu != undefined && isNum != false) {

                        for (let i = 0; i < arrayZipBand.length; i++) {
                            if (loc_nu == arrayZipBand[i].LOC_NU) {
                                let aux = arrayZipBand[i];
                                jsonZipCode.push(aux);
                            }
                        }
                        if (jsonZipCode.length == 0) {

                            let obJson = {
                                LOC_NU: '',
                                LOC_CEP_INI: uniqueZipcode,
                                LOC_CEP_FIM: uniqueZipcode

                            };
                            jsonZipCode.push(obJson);
                        }

                        for (let i = 0; i < jsonZipCode.length; i++) {

                            let obJson = {
                                LOC_NU: loc_nu,
                                UFE_SG: ufe_sg,
                                LOC_NO: loc_no,
                                MUN_NU: mun_nu,
                                LOC_CEP_INI: jsonZipCode[i].LOC_CEP_INI,
                                LOC_CEP_FIM: jsonZipCode[i].LOC_CEP_FIM
                            };

                            arrayParsedZipcodeBr.push(obJson);
                        }
                        jsonZipCode = [];

                    }


                });

            });
            break;
        default:
            throw 'Sorry but your config is invalid';

    }

    return arrayParsedZipcodeBr;

};