var fs = require('fs');
var arrayZipBand = [];
var arrayParsedZipcodeBr= [];
exports.parse = function(opts) {

  if (opts.zipBand.constructor != Array) {
    opts.zipBand = [opts.zipBand];
  }
  if (opts.location.constructor != Array) {
    opts.location = [opts.location];
  }

  if (opts.config === 0) {
    opts.zipBand.forEach(function(file) {
    fs.readFile(file, 'utf8', function(err, logData, callback) {


        if (err) throw err;

        var text = logData.toString();
        decodeURIComponent(text);

        var lines = text.split('\n');

        lines.forEach(function(line) {
          var parts = line.split('@');

          if (parts[1] != undefined) {
            var obJson = {
              LOC_CEP_INI: parts[1],
              LOC_CEP_FIM: parts[2]

            }
            arrayZipBand.push(obJson);
          }

        });


       });
    });
      opts.location.forEach(function(file) {
      fs.readFile(file, 'utf8', function(err, logData, callback) {


        if (err) throw err;

        var text = logData.toString();
        decodeURIComponent(text);

        var lines = text.split('\n');

        lines.forEach(function(line) {
          var parts = line.split('@');

          if (parts[1] != undefined) {
            for (var i = 0; i < arrayZipBand.length; i++) {
              var obJson = {
                LOC_NU: parts[0],
                UFE_SG: parts[1],
                LOC_NO: parts[2],
                MUN_NU: parts[8],
                LOC_CEP_INI: arrayZipBand[i].LOC_CEP_INI,
                LOC_CEP_FIM: arrayZipBand[i].LOC_CEP_FIM
              }
              arrayParsedZipcodeBr.push(obJson);

            }
          }


        });
      });
    });
    
    return arrayParsedZipcodeBr;

  };
}