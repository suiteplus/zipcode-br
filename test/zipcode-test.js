'use strict';

var fs = require('fs'),
    should = require('should'),
    zipcode = require('../');

describe('<Zipcode-BR>', () => {

    let output;
    before((done) => {
        let fileName = `${__dirname}/_output-files/out-zipcode.json`;

        fs.readFile(fileName, 'utf8', (err, file) => {
            if (err) {
                done(err);
            } else {
                should(file).be.ok();
                output = JSON.parse(file);
                should(output).be.Array();
                done();
            }
        });


    });

    it('test parser', (done) => {
        let opts = {
            zipBand: `${__dirname}/_input-files/DELTA_LOG_FAIXA_LOC.TXT`,
            location: `${__dirname}/_input-files/DELTA_LOG_LOCALIDADE.TXT`,
            config: 0
        };
        let test = zipcode.parse(opts);
        should(test).be.ok();
        should(test).be.Array();
        should(test).have.length(test.length);
        for (let i = 0; i < output.length; i++) {
            let item = test[i],
                outItem = output[i];
            
            should(item).have.property('LOC_CEP_FIM', outItem.LOC_CEP_FIM);
            should(item).have.property('LOC_CEP_INI', outItem.LOC_CEP_INI);
            should(item).have.property('LOC_NO', outItem.LOC_NO);
            should(item).have.property('LOC_NU', outItem.LOC_NU);
            should(item).have.property('MUN_NU', outItem.MUN_NU);

            //let zipcode = item.zipcode;
            //should(zipcode).be.eql(outItem.zipcode); // ==
            //should(zipcode).be.equal(outItem.zipcode); // ===
            //
            //should(item).have.property('zipcode').be.eql(outItem.zipcode); // ==
            //should(item).have.property('zipcode').be.equal(outItem.zipcode); // ===
        }

        done();
    });

    //after(() => {
    //
    //});
});