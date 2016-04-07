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
        case 1:
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
                                jsonZipCode.push(arrayZipBand[i]);
                            }
                        }
                        if (jsonZipCode === undefined) {
                            throw 'Was not possible to find Zipcode for the id'  + parts[0];
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
        default:
            throw 'Sorry but your config is invalid or you are trying to use options 1, that is not implemented yet';
    }

    return arrayParsedZipcodeBr;

};